# Especificación del MVP — KilometrajeYa

## 1. Resumen

Odómetro por vehículo con alertas de aceite, llantas, SOAT e inspección técnica.

**Usuario objetivo:** taxistas, conductores de plataformas y dueños de autos.

**Problema que resuelve:** hoy estas tareas se llevan en cuaderno o en el chat de WhatsApp, con errores y sin historial. KilometrajeYa las ordena en una app simple que funciona sin internet.

**Propuesta de valor:** registrar en segundos, consultar al instante y compartir el resultado, sin cuentas, sin servidores y sin costo.

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
- Servidor, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago.

## 3. Historias de usuario y criterios de aceptación

### HU-01 — Vehículos con kilometraje actual y lecturas de odómetro

**Como** usuario (taxistas, conductores de plataformas y dueños de autos), **quiero** vehículos con kilometraje actual y lecturas de odómetro, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-02 — Servicios realizados (aceite, llantas, frenos) con costo

**Como** usuario (taxistas, conductores de plataformas y dueños de autos), **quiero** servicios realizados (aceite, llantas, frenos) con costo, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-03 — Próximo servicio por kilometraje o por fecha

**Como** usuario (taxistas, conductores de plataformas y dueños de autos), **quiero** próximo servicio por kilometraje o por fecha, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-04 — Vencimientos de SOAT, inspección técnica y otros documentos

**Como** usuario (taxistas, conductores de plataformas y dueños de autos), **quiero** vencimientos de SOAT, inspección técnica y otros documentos, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-05 — Alertas locales antes de cada vencimiento

**Como** usuario (taxistas, conductores de plataformas y dueños de autos), **quiero** alertas locales antes de cada vencimiento, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-06 — Costo total de mantenimiento por vehículo

**Como** usuario (taxistas, conductores de plataformas y dueños de autos), **quiero** costo total de mantenimiento por vehículo, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

## 4. Pantallas

| Pantalla | Propósito |
|---|---|
| Inicio | Resumen y accesos directos a lo más usado |
| Lista de vehiculos | Ver, buscar y abrir cada registro |
| Formulario de vehiculos | Crear y editar con validaciones |
| Lista de lecturas | Ver, buscar y abrir cada registro |
| Formulario de lecturas | Crear y editar con validaciones |
| Lista de servicios | Ver, buscar y abrir cada registro |
| Formulario de servicios | Crear y editar con validaciones |
| Lista de documentos | Ver, buscar y abrir cada registro |
| Formulario de documentos | Crear y editar con validaciones |
| Ajustes | Datos del usuario, moneda y exportación |

## 5. Modelo de datos

- **vehiculos**: id, placa, modelo, anio, km_actual
- **lecturas**: id, vehiculo_id, km, fecha
- **servicios**: id, vehiculo_id, tipo, km, fecha, costo, proximo_km, proxima_fecha
- **documentos**: id, vehiculo_id, tipo, vencimiento

El SQL completo y la política de migraciones están en [ARQUITECTURA.md](ARQUITECTURA.md).

## 6. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos y las listas responden de inmediato con cientos de registros.
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).

## 7. Riesgos y decisiones

| Riesgo | Mitigación |
|---|---|
| Perder el celular y los datos | Respaldo exportable (CSV o archivo de base) en la versión 1.1 |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| Alcance que crece | Todo lo que no esté en la sección 2 va a «Después del MVP» |

## 8. Criterios para lanzar el MVP

- [ ] Todas las historias de la sección 3 cumplen sus criterios.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk`.
- [ ] README con capturas y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado.
