# Plan de desarrollo — KilometrajeYa

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Vehículos y odómetro | 3 | 5 |
| 3 | Servicios de mantenimiento | 4 | 9 |
| 4 | Documentos y vencimientos | 3 | 12 |
| 5 | Alertas y reportes de costo | 4 | 16 |

Total: **16 días** (~4 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Vehículos y odómetro

**Estimación:** 3 días. **Rama sugerida:** `fase-2-vehiculos-y-odometro`.

**Objetivo:** Vehículos y lecturas de odómetro.

**Historias que se completan:** HU-01 (Registrar vehículos y lecturas de odómetro).

**Tareas**

- [ ] **F2-T1** Consultas de vehículos y lecturas.
- [ ] **F2-T2** Validación: lectura nunca menor a la anterior.
- [ ] **F2-T3** Pantallas de lista, detalle y formulario.
- [ ] **F2-T4** Odómetro actual derivado de la última lectura.
- [ ] **F2-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — no tengo vehículos → abro la app → veo el estado vacío con «Agregar vehículo».
- [ ] HU-01 — un vehículo con 52.000 km → ingreso una lectura de 51.000 → la app rechaza el valor por ser menor a la última lectura.

**Criterio de salida:**

- [ ] Rechaza lecturas decrecientes y conserva el historial.
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Servicios de mantenimiento

**Estimación:** 4 días. **Rama sugerida:** `fase-3-servicios-de-mantenimiento`.

**Objetivo:** Servicios de mantenimiento.

**Historias que se completan:** HU-02 (Registrar servicios de mantenimiento), HU-03 (Ver el próximo servicio).

**Tareas**

- [ ] **F3-T1** Catálogo base de tipos de servicio (aceite, filtros, llantas, frenos, batería, otros).
- [ ] **F3-T2** Formulario de servicio con próximo vencimiento por km y/o fecha.
- [ ] **F3-T3** Función pura que calcula estado (ok, por vencer, vencido), con pruebas.
- [ ] **F3-T4** Actualizar odómetro al registrar un servicio con km mayor.
- [ ] **F3-T5** Historial de servicios por vehículo.
- [ ] **F3-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-02 — el formulario de servicio → elijo «Cambio de aceite», 85.000 km y 250 Bs → se guarda y el odómetro del vehículo pasa a 85.000.
- [ ] HU-02 — un servicio con costo vacío → lo guardo → se registra con costo 0 sin error.
- [ ] HU-03 — aceite cada 5.000 km hecho a 80.000 y odómetro en 84.600 → abro Inicio → aparece «por vencer» (faltan 400 km).

**Criterio de salida:**

- [ ] El cálculo de estado cubre solo-km, solo-fecha y ambos.
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — Documentos y vencimientos

**Estimación:** 3 días. **Rama sugerida:** `fase-4-documentos-y-vencimientos`.

**Objetivo:** Documentos y vencimientos.

**Historias que se completan:** HU-04 (Controlar vencimientos de documentos).

**Tareas**

- [ ] **F4-T1** Consultas de documentos y estados por fecha.
- [ ] **F4-T2** Pantalla Documentos con semáforo.
- [ ] **F4-T3** Acción «Renovar» que crea un nuevo vencimiento conservando el anterior.
- [ ] **F4-T4** Pruebas de fechas límite (hoy, mañana, hace un día).
- [ ] **F4-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-04 — un SOAT que vence en 20 días → abro Documentos → aparece «por vencer» en amarillo con los días restantes.
- [ ] HU-04 — un documento vencido → abro Documentos → aparece en rojo arriba de la lista.

**Criterio de salida:**

- [ ] Los semáforos coinciden con las reglas de vencimiento.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — Alertas y reportes de costo

**Estimación:** 4 días. **Rama sugerida:** `fase-5-alertas-y-reportes-de-costo`.

**Objetivo:** Alertas y reportes de costo.

**Historias que se completan:** HU-05 (Recibir alertas), HU-06 (Costo total de mantenimiento).

**Tareas**

- [ ] **F5-T1** Programar notificaciones locales con expo-notifications.
- [ ] **F5-T2** Reprogramar y cancelar al editar o borrar.
- [ ] **F5-T3** Pantalla Costos con total, por tipo y por km.
- [ ] **F5-T4** Exportar historial con expo-file-system y expo-sharing.
- [ ] **F5-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-05 — un documento que vence en 30 días → llega la fecha del aviso → recibo una notificación local con el nombre y vehículo.
- [ ] HU-05 — edito la fecha de un documento → guardo → la alerta anterior se cancela y se programa la nueva.
- [ ] HU-06 — un vehículo con varios servicios → abro Costos → veo total, por tipo de servicio y costo por kilómetro.

**Criterio de salida:**

- [ ] Las alertas se programan, se cancelan y se muestran en el teléfono real.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Vehículos y odómetro

- **Día 3** (día 1 de la fase): `F2-T1` Consultas de vehículos y lecturas.; `F2-T2` Validación: lectura nunca menor a la anterior.; `F2-T3` Pantallas de lista, detalle y formulario..
- **Día 4** (día 2 de la fase): `F2-T4` Odómetro actual derivado de la última lectura.; `F2-T5` Validaciones, estados vacíos y mensajes en español; `F2-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 5** (día 3 de la fase): `F2-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 3 — Servicios de mantenimiento

- **Día 6** (día 1 de la fase): `F3-T1` Catálogo base de tipos de servicio (aceite, filtros, llantas, frenos, batería, otros).; `F3-T2` Formulario de servicio con próximo vencimiento por km y/o fecha..
- **Día 7** (día 2 de la fase): `F3-T3` Función pura que calcula estado (ok, por vencer, vencido), con pruebas.; `F3-T4` Actualizar odómetro al registrar un servicio con km mayor..
- **Día 8** (día 3 de la fase): `F3-T5` Historial de servicios por vehículo.; `F3-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 9** (día 4 de la fase): `F3-T7` Pruebas automáticas y verificación manual de criterios; `F3-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 4 — Documentos y vencimientos

- **Día 10** (día 1 de la fase): `F4-T1` Consultas de documentos y estados por fecha.; `F4-T2` Pantalla Documentos con semáforo.; `F4-T3` Acción «Renovar» que crea un nuevo vencimiento conservando el anterior..
- **Día 11** (día 2 de la fase): `F4-T4` Pruebas de fechas límite (hoy, mañana, hace un día).; `F4-T5` Validaciones, estados vacíos y mensajes en español; `F4-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 12** (día 3 de la fase): `F4-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — Alertas y reportes de costo

- **Día 13** (día 1 de la fase): `F5-T1` Programar notificaciones locales con expo-notifications.; `F5-T2` Reprogramar y cancelar al editar o borrar..
- **Día 14** (día 2 de la fase): `F5-T3` Pantalla Costos con total, por tipo y por km.; `F5-T4` Exportar historial con expo-file-system y expo-sharing..
- **Día 15** (día 3 de la fase): `F5-T5` Validaciones, estados vacíos y mensajes en español; `F5-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 16** (día 4 de la fase): `F5-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
