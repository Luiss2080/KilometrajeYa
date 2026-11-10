# Roadmap de KilometrajeYa

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que ya se puede usar y probar en el teléfono. Marcá con `[x]` cuando la fase cumpla su criterio de cierre.

| Fase | Nombre | Entregable | Estimación |
|---|---|---|---|
| 1 | Estructura base y navegación | App abre, navega y la base SQLite se crea sola | 2 días |
| 2 | Vehículos y odómetro | Vehículos con kilometraje actual y lecturas de odómetro | 4 días |
| 3 | Servicios de mantenimiento | Servicios realizados (aceite, llantas, frenos) con costo; Próximo servicio por kilometraje o por fecha | 4 días |
| 4 | Documentos y vencimientos | Vencimientos de SOAT, inspección técnica y otros documentos | 3 días |
| 5 | Alertas y reportes de costo | Alertas locales antes de cada vencimiento; Costo total de mantenimiento por vehículo | 3 días |

Estimación total del MVP: **~16 días de trabajo** (a tu ritmo, sin apuro).

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Vehículos y odómetro
- [ ] **Fase 3:** Servicios de mantenimiento
- [ ] **Fase 4:** Documentos y vencimientos
- [ ] **Fase 5:** Alertas y reportes de costo

## Después del MVP (versión 1.1 en adelante)

- [ ] Respaldo y restauración: exportar e importar el archivo de la base de datos.
- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, única vez).
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo se usa este documento

1. Trabajá una fase a la vez, en el orden indicado.
2. El detalle de tareas de cada fase está en [PLANNING.md](PLANNING.md).
3. Qué debe hacer exactamente la app está en [SPEC.md](SPEC.md).
4. Al cerrar una fase, actualizá este archivo y el [CHANGELOG](../CHANGELOG.md).
