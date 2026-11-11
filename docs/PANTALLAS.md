# Pantallas y flujos — KilometrajeYa

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Vehículos | `app/vehiculos.tsx` | Lista / vista |
| Detalle de vehículo | `app/detalle-de-vehiculo.tsx` | Detalle |
| Formulario de servicio | `app/formulario-de-servicio.tsx` | Formulario |
| Documentos | `app/documentos.tsx` | Lista / vista |
| Costos | `app/costos.tsx` | Lista / vista |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Pendientes ordenados por urgencia (servicios y documentos)
- **Acciones:** Abrir vehículo, registrar lectura

**Bosquejo**

```
┌──────────────────────────────┐
│ KilometrajeYa                │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Vehículos                │
│  ▸ Detalle de vehículo      │
│  ▸ Documentos               │
│  ▸ Costos                   │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Pendientes ordenados por urgencia (servicios y documentos) |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Vehículos

- **Archivo:** `app/vehiculos.tsx`
- **Qué muestra:** Lista con placa, modelo y kilometraje
- **Acciones:** Crear, editar
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Vehículos                   │
├──────────────────────────────┤
│ placa · anio                 │
│ placa · anio                 │
│ placa · anio                 │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay vehiculos. Tocá «Crear» para empezar. |
| Con datos | Lista con placa, modelo y kilometraje |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Detalle de vehículo

- **Archivo:** `app/detalle-de-vehiculo.tsx`
- **Qué muestra:** Pestañas Servicios, Documentos y Costos
- **Acciones:** Registrar lectura o servicio
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-04, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Detalle de vehículo         │
├──────────────────────────────┤
│ placa                        │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay vehiculos. Tocá «Registrar lectura o servicio» para empezar. |
| Con datos | Pestañas Servicios, Documentos y Costos |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Formulario de servicio

- **Archivo:** `app/formulario-de-servicio.tsx`
- **Qué muestra:** Tipo, fecha, km, costo, próximo por km y/o fecha, nota
- **Acciones:** Guardar
- **Historias relacionadas:** HU-02, HU-03, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| vehiculo id | Selector de vehiculos | Sí | Debe existir en `vehiculos` |
| tipo | Selector / fichas | Sí | Uno de: `aceite`, `filtros`, `llantas`, `frenos`, `bateria`, `otros` |
| km | Numérico entero | No | Entero mayor o igual a 0 |
| fecha | Fecha | Sí | Fecha real en formato AAAA-MM-DD |
| costo | Numérico decimal | Sí | Mayor o igual a 0; Hasta 2 decimales |
| proximo km | Numérico entero | No | Entero mayor o igual a 0 |
| proxima fecha | Fecha | No | Fecha real en formato AAAA-MM-DD; No anterior a la fecha de inicio/aplicación si ambas existen |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de servicio      │
├──────────────────────────────┤
│ vehiculo id                  │
│ [____________________]       │
│ tipo                         │
│ [____________________]       │
│ km                           │
│ [____________________]       │
│ fecha                        │
│ [____________________]       │
│ costo                        │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay servicios. Tocá «Guardar» para empezar. |
| Con datos | Tipo, fecha, km, costo, próximo por km y/o fecha, nota |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Documentos

- **Archivo:** `app/documentos.tsx`
- **Qué muestra:** Lista con semáforo de vencimiento
- **Acciones:** Agregar, renovar
- **Historias relacionadas:** HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Documentos                  │
├──────────────────────────────┤
│ tipo · vehiculo_id           │
│ tipo · vehiculo_id           │
│ tipo · vehiculo_id           │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay documentos. Tocá «Agregar» para empezar. |
| Con datos | Lista con semáforo de vencimiento |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Costos

- **Archivo:** `app/costos.tsx`
- **Qué muestra:** Total, por tipo y costo por km
- **Acciones:** Filtrar por período, exportar
- **Historias relacionadas:** HU-02, HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Costos                      │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Total, por tipo y costo por km |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Registrar vehículos y lecturas de odómetro**

```
abro la app  →  veo el estado vacío con «Agregar vehículo»
```

**HU-02 — Registrar servicios de mantenimiento**

```
elijo «Cambio de aceite», 85.000 km y 250 Bs  →  se guarda y el odómetro del vehículo pasa a 85.000
```

**HU-03 — Ver el próximo servicio**

```
abro Inicio  →  aparece «por vencer» (faltan 400 km)
```

**HU-04 — Controlar vencimientos de documentos**

```
abro Documentos  →  aparece «por vencer» en amarillo con los días restantes
```

**HU-05 — Recibir alertas**

```
llega la fecha del aviso  →  recibo una notificación local con el nombre y vehículo
```

**HU-06 — Costo total de mantenimiento**

```
abro Costos  →  veo total, por tipo de servicio y costo por kilómetro
```
