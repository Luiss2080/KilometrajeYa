# Modelo de datos — KilometrajeYa

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `lecturas.vehiculo_id` | `vehiculos` | Al borrar el padre se borran los hijos |
| `servicios.vehiculo_id` | `vehiculos` | Al borrar el padre se borran los hijos |
| `documentos.vehiculo_id` | `vehiculos` | Al borrar el padre se borran los hijos |

```
vehiculos  ──<  lecturas, servicios, documentos
lecturas
servicios
documentos
```

## 3. Detalle por tabla

### 3.1 `vehiculos`

Cada vehículo con su kilometraje actual.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `placa` | TEXT → `string` | Texto (mayúsculas) | Obligatorio; Se guarda en mayúsculas; 5 a 10 caracteres alfanuméricos; Único en la tabla | «Placa no válida» |
| `modelo` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí modelo» |
| `anio` | INTEGER → `number \| null` | Numérico entero | Opcional; Entero mayor o igual a 0 | «Ingresá un número entero» |
| `km_actual` | INTEGER → `number` | Numérico entero | Obligatorio; Entero mayor o igual a 0; Valor inicial `0` | «Ingresá un número entero» |

**Consultas base** (en `src/db/vehiculos.ts`):

```ts
listar(): Promise<Vehiculo[]>            // SELECT * FROM vehiculos ORDER BY id DESC
obtener(id: number): Promise<Vehiculo | null>   // SELECT * FROM vehiculos WHERE id = ?
crear(datos: NuevoVehiculo): Promise<number>   // INSERT INTO vehiculos (placa, modelo, anio, km_actual) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoVehiculo): Promise<void>   // UPDATE vehiculos SET placa = ?, modelo = ?, anio = ?, km_actual = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM vehiculos WHERE id = ?
```

### 3.2 `lecturas`

Historial de lecturas del odómetro.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `vehiculo_id` | INTEGER → `number` | Selector de vehiculos | Obligatorio; Debe existir en `vehiculos` | «Elegí un registro» |
| `km` | INTEGER → `number` | Numérico entero | Obligatorio; Entero mayor o igual a 0 | «Ingresá un número entero» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_lecturas_vehiculo_id ON lecturas(vehiculo_id);
CREATE INDEX IF NOT EXISTS idx_lecturas_fecha ON lecturas(fecha);
```

**Consultas base** (en `src/db/lecturas.ts`):

```ts
listar(): Promise<Lectura[]>            // SELECT * FROM lecturas ORDER BY id DESC
obtener(id: number): Promise<Lectura | null>   // SELECT * FROM lecturas WHERE id = ?
crear(datos: NuevoLectura): Promise<number>   // INSERT INTO lecturas (vehiculo_id, km, fecha) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoLectura): Promise<void>   // UPDATE lecturas SET vehiculo_id = ?, km = ?, fecha = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM lecturas WHERE id = ?
listarPorVehiculo(vehiculo_id: number): Promise<Lectura[]>   // WHERE vehiculo_id = ?
```

### 3.3 `servicios`

Mantenimientos realizados con costo y próximo vencimiento.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `vehiculo_id` | INTEGER → `number` | Selector de vehiculos | Obligatorio; Debe existir en `vehiculos` | «Elegí un registro» |
| `tipo` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `aceite`, `filtros`, `llantas`, `frenos`, `bateria`, `otros` | «Elegí una opción» |
| `km` | INTEGER → `number \| null` | Numérico entero | Opcional; Entero mayor o igual a 0 | «Ingresá un número entero» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `costo` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales; Valor inicial `0` | «Ingresá un número válido» |
| `proximo_km` | INTEGER → `number \| null` | Numérico entero | Opcional; Entero mayor o igual a 0 | «Ingresá un número entero» |
| `proxima_fecha` | TEXT → `string \| null` | Fecha | Opcional; Fecha real en formato AAAA-MM-DD; No anterior a la fecha de inicio/aplicación si ambas existen | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_servicios_vehiculo_id ON servicios(vehiculo_id);
CREATE INDEX IF NOT EXISTS idx_servicios_fecha ON servicios(fecha);
CREATE INDEX IF NOT EXISTS idx_servicios_proxima_fecha ON servicios(proxima_fecha);
```

**Consultas base** (en `src/db/servicios.ts`):

```ts
listar(): Promise<Servicio[]>            // SELECT * FROM servicios ORDER BY id DESC
obtener(id: number): Promise<Servicio | null>   // SELECT * FROM servicios WHERE id = ?
crear(datos: NuevoServicio): Promise<number>   // INSERT INTO servicios (vehiculo_id, tipo, km, fecha, costo, proximo_km, proxima_fecha) VALUES (?, ?, ?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoServicio): Promise<void>   // UPDATE servicios SET vehiculo_id = ?, tipo = ?, km = ?, fecha = ?, costo = ?, proximo_km = ?, proxima_fecha = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM servicios WHERE id = ?
listarPorVehiculo(vehiculo_id: number): Promise<Servicio[]>   // WHERE vehiculo_id = ?
```

### 3.4 `documentos`

SOAT, inspección técnica y otros con fecha de vencimiento.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `vehiculo_id` | INTEGER → `number` | Selector de vehiculos | Obligatorio; Debe existir en `vehiculos` | «Elegí un registro» |
| `tipo` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `soat`, `inspeccion_tecnica`, `impuesto`, `otro` | «Elegí una opción» |
| `vencimiento` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí vencimiento» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_documentos_vehiculo_id ON documentos(vehiculo_id);
```

**Consultas base** (en `src/db/documentos.ts`):

```ts
listar(): Promise<Documento[]>            // SELECT * FROM documentos ORDER BY id DESC
obtener(id: number): Promise<Documento | null>   // SELECT * FROM documentos WHERE id = ?
crear(datos: NuevoDocumento): Promise<number>   // INSERT INTO documentos (vehiculo_id, tipo, vencimiento) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoDocumento): Promise<void>   // UPDATE documentos SET vehiculo_id = ?, tipo = ?, vencimiento = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM documentos WHERE id = ?
listarPorVehiculo(vehiculo_id: number): Promise<Documento[]>   // WHERE vehiculo_id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Vehiculo {
  id: number;
  placa: string;
  modelo: string | null;
  anio: number | null;
  km_actual: number;
}
export type NuevoVehiculo = Omit<Vehiculo, 'id'>;

export interface Lectura {
  id: number;
  vehiculo_id: number;
  km: number;
  fecha: string;
}
export type NuevoLectura = Omit<Lectura, 'id'>;

export interface Servicio {
  id: number;
  vehiculo_id: number;
  tipo: string;
  km: number | null;
  fecha: string;
  costo: number;
  proximo_km: number | null;
  proxima_fecha: string | null;
}
export type NuevoServicio = Omit<Servicio, 'id'>;

export interface Documento {
  id: number;
  vehiculo_id: number;
  tipo: string;
  vencimiento: string;
}
export type NuevoDocumento = Omit<Documento, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

SQLite no tiene tipo enumerado: se valida en la capa de datos y se muestra con la etiqueta de la tabla.

**`servicios.tipo`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `aceite` | Aceite |
| `filtros` | Filtros |
| `llantas` | Llantas |
| `frenos` | Frenos |
| `bateria` | Bateria |
| `otros` | Otros |

**`documentos.tipo`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `soat` | Soat |
| `inspeccion_tecnica` | Inspeccion tecnica |
| `impuesto` | Impuesto |
| `otro` | Otro |

```ts
export const SERVICIOS_TIPO = ['aceite', 'filtros', 'llantas', 'frenos', 'bateria', 'otros'] as const;
export const DOCUMENTOS_TIPO = ['soat', 'inspeccion_tecnica', 'impuesto', 'otro'] as const;
```

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

| Versión | Fase | Motivo |
|---|---|---|
| 2 | 5 | Umbrales de aviso (km y días) y días de anticipación de documentos. |

**Migración 2** (fase 5)

```sql
CREATE TABLE ajustes (clave TEXT PRIMARY KEY, valor TEXT NOT NULL);
```

## 7. Esquema inicial completo

```sql
CREATE TABLE vehiculos (id INTEGER PRIMARY KEY AUTOINCREMENT, placa TEXT NOT NULL UNIQUE, modelo TEXT, anio INTEGER, km_actual INTEGER NOT NULL DEFAULT 0);
CREATE TABLE lecturas (id INTEGER PRIMARY KEY AUTOINCREMENT, vehiculo_id INTEGER NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE, km INTEGER NOT NULL, fecha TEXT NOT NULL);
CREATE TABLE servicios (id INTEGER PRIMARY KEY AUTOINCREMENT, vehiculo_id INTEGER NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE, tipo TEXT NOT NULL, km INTEGER, fecha TEXT NOT NULL, costo REAL NOT NULL DEFAULT 0, proximo_km INTEGER, proxima_fecha TEXT);
CREATE TABLE documentos (id INTEGER PRIMARY KEY AUTOINCREMENT, vehiculo_id INTEGER NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE, tipo TEXT NOT NULL, vencimiento TEXT NOT NULL);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** El kilometraje actual de un vehículo es la lectura más reciente y nunca puede ser menor a la anterior.
- **RN-02** Un servicio puede tener próximo vencimiento por kilometraje, por fecha o por ambos; vence lo que ocurra primero.
- **RN-03** Un servicio está «por vencer» cuando faltan menos de 500 km o menos de 15 días (configurable).
- **RN-04** Un documento está vencido cuando su fecha ya pasó y «por vencer» a 30 días de la fecha.
- **RN-05** El costo por kilómetro = costo total de servicios ÷ kilómetros recorridos entre la primera y la última lectura.
- **RN-06** Registrar un servicio con kilometraje mayor al actual actualiza el odómetro.

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
