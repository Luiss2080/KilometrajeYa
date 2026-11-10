# Plan de desarrollo — KilometrajeYa

Guía para construir el MVP fase por fase. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por fase** con las tareas de abajo como checklist.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Cierre de fase:** lint, tipos y tests en verde, probar en el teléfono, actualizar [ROADMAP.md](ROADMAP.md) y el [CHANGELOG](../CHANGELOG.md), y fusionar a `main`.

### Definición de «terminado» (vale para toda fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos y mensajes de error en español.
- [ ] Los datos persisten al reiniciar la app.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.

**Tareas**

- [ ] `npm install` y `npx expo start` abren la app en Expo Go.
- [ ] Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque.
- [ ] Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] Confirmar que el CI de GitHub Actions pasa en verde.

**Cierre:** la app abre, navega entre secciones vacías y no da errores.

---

## Fase 2 — Vehículos y odómetro

**Estimación:** 4 días.

**Objetivo:** vehículos con kilometraje actual y lecturas de odómetro.

**Tareas**

- [ ] Consultas de `vehiculos` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: vehículos con kilometraje actual y lecturas de odómetro.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Vehículos con kilometraje actual y lecturas de odómetro: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 3 — Servicios de mantenimiento

**Estimación:** 4 días.

**Objetivo:** servicios realizados (aceite, llantas, frenos) con costo; próximo servicio por kilometraje o por fecha.

**Tareas**

- [ ] Consultas de `lecturas` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Consultas de `servicios` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: servicios realizados (aceite, llantas, frenos) con costo.
- [ ] Pantalla(s) y formulario(s) para: próximo servicio por kilometraje o por fecha.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Servicios realizados (aceite, llantas, frenos) con costo: funciona sin internet y persiste al reiniciar.
- [ ] Próximo servicio por kilometraje o por fecha: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 4 — Documentos y vencimientos

**Estimación:** 3 días.

**Objetivo:** vencimientos de SOAT, inspección técnica y otros documentos.

**Tareas**

- [ ] Consultas de `documentos` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: vencimientos de SOAT, inspección técnica y otros documentos.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Vencimientos de SOAT, inspección técnica y otros documentos: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 5 — Alertas y reportes de costo

**Estimación:** 3 días.

**Objetivo:** alertas locales antes de cada vencimiento; costo total de mantenimiento por vehículo.

**Tareas**

- [ ] Pantalla(s) y formulario(s) para: alertas locales antes de cada vencimiento.
- [ ] Pantalla(s) y formulario(s) para: costo total de mantenimiento por vehículo.
- [ ] Programar las alertas locales antes de cada vencimiento y por kilometraje.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Alertas locales antes de cada vencimiento: funciona sin internet y persiste al reiniciar.
- [ ] Costo total de mantenimiento por vehículo: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio.
- [ ] Publicar el release con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.
