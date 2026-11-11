# Especificación del MVP — KilometrajeYa

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que ningún conductor se olvide del cambio de aceite, del SOAT ni de la inspección técnica.

**Problema:** El mantenimiento y los documentos del vehículo se recuerdan de memoria; un SOAT vencido o un servicio postergado sale caro y genera multas o averías.

**Cómo se resuelve hoy:** Memoria, stickers en el parabrisas y fotos de facturas.

**Usuario objetivo:** Taxista, conductor de plataforma o dueño de 1 a 5 autos que quiere gastar menos en reparaciones y evitar multas.

**Métricas de éxito del MVP:**

- Ver en una pantalla qué servicios y documentos vencen pronto.
- Registrar un servicio en menos de 20 segundos.
- Saber cuánto gasta en mantenimiento por vehículo y por kilómetro.

## 2. Alcance del MVP

### Incluido

- Vehículos con kilometraje actual y lecturas de odómetro.
- Servicios realizados (aceite, llantas, frenos) con costo.
- Próximo servicio por kilometraje o por fecha.
- Vencimientos de SOAT, inspección técnica y otros documentos.
- Alertas locales antes de cada vencimiento.
- Costo total de mantenimiento por vehículo.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** El kilometraje actual de un vehículo es la lectura más reciente y nunca puede ser menor a la anterior.
- **RN-02** Un servicio puede tener próximo vencimiento por kilometraje, por fecha o por ambos; vence lo que ocurra primero.
- **RN-03** Un servicio está «por vencer» cuando faltan menos de 500 km o menos de 15 días (configurable).
- **RN-04** Un documento está vencido cuando su fecha ya pasó y «por vencer» a 30 días de la fecha.
- **RN-05** El costo por kilómetro = costo total de servicios ÷ kilómetros recorridos entre la primera y la última lectura.
- **RN-06** Registrar un servicio con kilometraje mayor al actual actualiza el odómetro.

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Registrar vehículos y lecturas de odómetro

**Como** conductor **quiero** cargar mis vehículos y anotar el kilometraje **para** tener el dato base para los avisos.

**Fase:** 2 — Vehículos y odómetro

**Criterios de aceptación:**

1. **Dado:** no tengo vehículos. **Cuando:** abro la app. **Entonces:** veo el estado vacío con «Agregar vehículo».
2. **Dado:** un vehículo con 52.000 km. **Cuando:** ingreso una lectura de 51.000. **Entonces:** la app rechaza el valor por ser menor a la última lectura.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Registrar servicios de mantenimiento

**Como** conductor **quiero** anotar servicios con fecha, kilometraje y costo **para** tener el historial completo.

**Fase:** 3 — Servicios de mantenimiento

**Criterios de aceptación:**

1. **Dado:** el formulario de servicio. **Cuando:** elijo «Cambio de aceite», 85.000 km y 250 Bs. **Entonces:** se guarda y el odómetro del vehículo pasa a 85.000.
2. **Dado:** un servicio con costo vacío. **Cuando:** lo guardo. **Entonces:** se registra con costo 0 sin error.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Ver el próximo servicio

**Como** conductor **quiero** ver cuándo toca cada servicio por kilometraje o fecha **para** no pasarme.

**Fase:** 3 — Servicios de mantenimiento

**Criterios de aceptación:**

1. **Dado:** aceite cada 5.000 km hecho a 80.000 y odómetro en 84.600. **Cuando:** abro Inicio. **Entonces:** aparece «por vencer» (faltan 400 km).

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — Controlar vencimientos de documentos

**Como** conductor **quiero** cargar SOAT, inspección técnica y otros con su vencimiento **para** evitar multas.

**Fase:** 4 — Documentos y vencimientos

**Criterios de aceptación:**

1. **Dado:** un SOAT que vence en 20 días. **Cuando:** abro Documentos. **Entonces:** aparece «por vencer» en amarillo con los días restantes.
2. **Dado:** un documento vencido. **Cuando:** abro Documentos. **Entonces:** aparece en rojo arriba de la lista.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Recibir alertas

**Como** conductor **quiero** recibir notificaciones antes de cada vencimiento **para** actuar a tiempo.

**Fase:** 5 — Alertas y reportes de costo

**Criterios de aceptación:**

1. **Dado:** un documento que vence en 30 días. **Cuando:** llega la fecha del aviso. **Entonces:** recibo una notificación local con el nombre y vehículo.
2. **Dado:** edito la fecha de un documento. **Cuando:** guardo. **Entonces:** la alerta anterior se cancela y se programa la nueva.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-06 — Costo total de mantenimiento

**Como** conductor **quiero** ver cuánto gasto por vehículo **para** decidir si me conviene seguir con el auto.

**Fase:** 5 — Alertas y reportes de costo

**Criterios de aceptación:**

1. **Dado:** un vehículo con varios servicios. **Cuando:** abro Costos. **Entonces:** veo total, por tipo de servicio y costo por kilómetro.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Pendientes ordenados por urgencia (servicios y documentos) | Abrir vehículo, registrar lectura |
| Vehículos | Lista con placa, modelo y kilometraje | Crear, editar |
| Detalle de vehículo | Pestañas Servicios, Documentos y Costos | Registrar lectura o servicio |
| Formulario de servicio | Tipo, fecha, km, costo, próximo por km y/o fecha, nota | Guardar |
| Documentos | Lista con semáforo de vencimiento | Agregar, renovar |
| Costos | Total, por tipo y costo por km | Filtrar por período, exportar |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `vehiculos`

Cada vehículo con su kilometraje actual.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `placa` | TEXT | Obligatorio; Único |
| `modelo` | TEXT | Opcional |
| `anio` | INTEGER | Opcional |
| `km_actual` | INTEGER | Obligatorio; Por defecto 0 |

### `lecturas`

Historial de lecturas del odómetro.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `vehiculo_id` | INTEGER | Obligatorio; Referencia a vehiculos (se borra en cascada) |
| `km` | INTEGER | Obligatorio |
| `fecha` | TEXT | Obligatorio |

### `servicios`

Mantenimientos realizados con costo y próximo vencimiento.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `vehiculo_id` | INTEGER | Obligatorio; Referencia a vehiculos (se borra en cascada) |
| `tipo` | TEXT | Obligatorio |
| `km` | INTEGER | Opcional |
| `fecha` | TEXT | Obligatorio |
| `costo` | REAL | Obligatorio; Por defecto 0 |
| `proximo_km` | INTEGER | Opcional |
| `proxima_fecha` | TEXT | Opcional |

### `documentos`

SOAT, inspección técnica y otros con fecha de vencimiento.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `vehiculo_id` | INTEGER | Obligatorio; Referencia a vehiculos (se borra en cascada) |
| `tipo` | TEXT | Obligatorio |
| `vencimiento` | TEXT | Obligatorio |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Odómetro reiniciado o reemplazado: permitir «corrección de odómetro» con nota explícita.
- Servicio registrado con fecha pasada: no cambia el odómetro si el km es menor.
- Vehículo vendido: archivarlo sin perder historial.
- Documento sin fecha de vencimiento: se guarda sin alerta.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-notifications` | Recordatorios locales (programados en el teléfono, sin servidor) | Notificaciones |
| `expo-sharing` | Compartir PDF, CSV o respaldos con otras apps | — |
| `expo-file-system` | Guardar y leer archivos locales (CSV, respaldos) | — |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Alertas que no llegan por ahorro de batería | Mostrar también la lista de pendientes dentro de la app; explicar permisos en Ajustes. |
| Datos perdidos al cambiar de teléfono | Exportación del historial; respaldo en v1.1. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en KilometrajeYa |
|---|---|
| `vehiculos` | Cada vehículo con su kilometraje actual. |
| `lecturas` | Historial de lecturas del odómetro. |
| `servicios` | Mantenimientos realizados con costo y próximo vencimiento. |
| `documentos` | SOAT, inspección técnica y otros con fecha de vencimiento. |
| `servicios.tipo` | Valores: aceite, filtros, llantas, frenos, bateria, otros |
| `documentos.tipo` | Valores: soat, inspeccion_tecnica, impuesto, otro |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Registrar vehículos y lecturas de odómetro | 2 | CP-01-1, CP-01-2 |
| HU-02 Registrar servicios de mantenimiento | 3 | CP-02-1, CP-02-2 |
| HU-03 Ver el próximo servicio | 3 | CP-03-1 |
| HU-04 Controlar vencimientos de documentos | 4 | CP-04-1, CP-04-2 |
| HU-05 Recibir alertas | 5 | CP-05-1, CP-05-2 |
| HU-06 Costo total de mantenimiento | 5 | CP-06-1 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
