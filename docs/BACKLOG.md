# Backlog de issues — KilometrajeYa

> Lista lista para pasar a GitHub Issues, con milestones, etiquetas, estimaciones y trazabilidad a las historias. Se puede crear todo de una vez con [crear-issues.sh](crear-issues.sh).

## 1. Milestones

| Milestone | Fase | Días | Tareas | Horas est. |
|---|---|---|---|---|
| Fase 1 — Estructura base y navegación | 1 | 2 | 6 | 12 |
| Fase 2 — Vehículos y odómetro | 2 | 3 | 7 | 17.5 |
| Fase 3 — Servicios de mantenimiento | 3 | 4 | 8 | 24 |
| Fase 4 — Documentos y vencimientos | 4 | 3 | 7 | 17.5 |
| Fase 5 — Alertas y reportes de costo | 5 | 4 | 7 | 24.5 |

Total: **35 tareas**, ~96 horas (16 días a 6 horas efectivas).

## 2. Etiquetas

| Etiqueta | Uso |
|---|---|
| ui | Pantallas y componentes |
| datos | Tablas, consultas y migraciones |
| lógica | Reglas de negocio y cálculos |
| pruebas | Pruebas automáticas y manuales |
| integración | Cámara, notificaciones, PDF, compartir |
| tarea | Otras tareas |
| bug | Errores |
| mejora | Ideas para v1.1+ |

## 3. Issues del MVP

### Fase 1 — Estructura base y navegación

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F1-T1` | Instalar dependencias y abrir la app en Expo Go | — | tarea | Alta | 2 |
| `F1-T2` | Verificar creación y migración de la base | — | datos | Alta | 2 |
| `F1-T3` | Definir la navegación principal | — | ui | Alta | 2 |
| `F1-T4` | Aplicar tema y componente Pantalla | — | ui | Alta | 2 |
| `F1-T5` | Pantalla de inicio con accesos | — | ui | Alta | 2 |
| `F1-T6` | Confirmar CI en verde | — | tarea | Alta | 2 |

### Fase 2 — Vehículos y odómetro

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F2-T1` | Consultas de vehículos y lecturas. | HU-01 | datos | Alta | 2.5 |
| `F2-T2` | Validación: lectura nunca menor a la anterior. | HU-01 | lógica | Alta | 2.5 |
| `F2-T3` | Pantallas de lista, detalle y formulario. | HU-01 | ui | Alta | 2.5 |
| `F2-T4` | Odómetro actual derivado de la última lectura. | HU-01 | tarea | Alta | 2.5 |
| `F2-T5` | Validaciones, estados vacíos y mensajes en español | HU-01 | lógica | Alta | 2.5 |
| `F2-T6` | Pruebas automáticas y verificación manual de criterios | HU-01 | pruebas | Alta | 2.5 |
| `F2-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-01 | pruebas | Alta | 2.5 |

### Fase 3 — Servicios de mantenimiento

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F3-T1` | Catálogo base de tipos de servicio (aceite, filtros, llantas, frenos, batería, otros). | HU-02, HU-03 | datos | Alta | 3 |
| `F3-T2` | Formulario de servicio con próximo vencimiento por km y/o fecha. | HU-02, HU-03 | ui | Alta | 3 |
| `F3-T3` | Función pura que calcula estado (ok, por vencer, vencido), con pruebas. | HU-02, HU-03 | lógica, pruebas | Alta | 3 |
| `F3-T4` | Actualizar odómetro al registrar un servicio con km mayor. | HU-02, HU-03 | tarea | Alta | 3 |
| `F3-T5` | Historial de servicios por vehículo. | HU-02, HU-03 | tarea | Alta | 3 |
| `F3-T6` | Validaciones, estados vacíos y mensajes en español | HU-02, HU-03 | lógica | Alta | 3 |
| `F3-T7` | Pruebas automáticas y verificación manual de criterios | HU-02, HU-03 | pruebas | Alta | 3 |
| `F3-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-02, HU-03 | pruebas | Alta | 3 |

### Fase 4 — Documentos y vencimientos

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F4-T1` | Consultas de documentos y estados por fecha. | HU-04 | datos | Media | 2.5 |
| `F4-T2` | Pantalla Documentos con semáforo. | HU-04 | ui | Media | 2.5 |
| `F4-T3` | Acción «Renovar» que crea un nuevo vencimiento conservando el anterior. | HU-04 | tarea | Media | 2.5 |
| `F4-T4` | Pruebas de fechas límite (hoy, mañana, hace un día). | HU-04 | pruebas | Media | 2.5 |
| `F4-T5` | Validaciones, estados vacíos y mensajes en español | HU-04 | lógica | Media | 2.5 |
| `F4-T6` | Pruebas automáticas y verificación manual de criterios | HU-04 | pruebas | Media | 2.5 |
| `F4-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-04 | pruebas | Media | 2.5 |

### Fase 5 — Alertas y reportes de costo

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F5-T1` | Programar notificaciones locales con expo-notifications. | HU-05, HU-06 | integración | Media | 3.5 |
| `F5-T2` | Reprogramar y cancelar al editar o borrar. | HU-05, HU-06 | tarea | Media | 3.5 |
| `F5-T3` | Pantalla Costos con total, por tipo y por km. | HU-05, HU-06 | ui | Media | 3.5 |
| `F5-T4` | Exportar historial con expo-file-system y expo-sharing. | HU-05, HU-06 | integración | Media | 3.5 |
| `F5-T5` | Validaciones, estados vacíos y mensajes en español | HU-05, HU-06 | lógica | Media | 3.5 |
| `F5-T6` | Pruebas automáticas y verificación manual de criterios | HU-05, HU-06 | pruebas | Media | 3.5 |
| `F5-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-05, HU-06 | pruebas | Media | 3.5 |

## 4. Orden recomendado de ataque

1. Terminá cada fase completa antes de abrir la siguiente; dentro de la fase, de arriba hacia abajo.
2. Las tareas `lógica` y `datos` van antes que las `ui` que las usan.
3. Cada issue se cierra con un commit o PR que lo mencione (`Cierra #N`).
4. Nada de abrir issues de v1.1 hasta tener el APK de la v1.0.0.

## 5. Ideas para después del MVP

| Idea | Esfuerzo | Valor |
|---|---|---|
| Modo oscuro | Bajo | Medio |
| Búsqueda y filtros avanzados | Medio | Alto |
| Estadísticas y gráficos simples en inicio | Medio | Medio |
| Respaldo y restauración de la base | Medio | Alto |
| Publicación en Google Play | Bajo | Alto |
| Sincronización opcional entre dispositivos | Alto | Depende de demanda |
