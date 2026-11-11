# Roadmap de KilometrajeYa

> Que ningún conductor se olvide del cambio de aceite, del SOAT ni de la inspección técnica.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Odómetro por vehículo con alertas de aceite, llantas, SOAT e inspección técnica.
- **Usuario:** Taxista, conductor de plataforma o dueño de 1 a 5 autos que quiere gastar menos en reparaciones y evitar multas.
- **Duración estimada:** ~16 días de trabajo efectivo (~4 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Vehículos y odómetro | Vehículos y lecturas de odómetro. | 3 | 1 |
| 3 | Servicios de mantenimiento | Servicios de mantenimiento. | 4 | 2 |
| 4 | Documentos y vencimientos | Documentos y vencimientos. | 3 | 3 |
| 5 | Alertas y reportes de costo | Alertas y reportes de costo. | 4 | 4 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Vehículos y odómetro

**Demo:** Rechaza lecturas decrecientes y conserva el historial.

### Hito 3 — Servicios de mantenimiento

**Demo:** El cálculo de estado cubre solo-km, solo-fecha y ambos.

### Hito 4 — Documentos y vencimientos

**Demo:** Los semáforos coinciden con las reglas de vencimiento.

### Hito 5 — Alertas y reportes de costo

**Demo:** Las alertas se programan, se cancelan y se muestran en el teléfono real.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Vehículos y odómetro

- **Objetivo:** Vehículos y lecturas de odómetro.
- **Historias cubiertas:** HU-01 Registrar vehículos y lecturas de odómetro
- **Depende de:** fase 1.
- **Duración:** 3 días.
- **Criterio de salida:**
  - Rechaza lecturas decrecientes y conserva el historial.

### Fase 3 — Servicios de mantenimiento

- **Objetivo:** Servicios de mantenimiento.
- **Historias cubiertas:** HU-02 Registrar servicios de mantenimiento; HU-03 Ver el próximo servicio
- **Depende de:** fase 2.
- **Duración:** 4 días.
- **Criterio de salida:**
  - El cálculo de estado cubre solo-km, solo-fecha y ambos.

### Fase 4 — Documentos y vencimientos

- **Objetivo:** Documentos y vencimientos.
- **Historias cubiertas:** HU-04 Controlar vencimientos de documentos
- **Depende de:** fase 3.
- **Duración:** 3 días.
- **Criterio de salida:**
  - Los semáforos coinciden con las reglas de vencimiento.

### Fase 5 — Alertas y reportes de costo

- **Objetivo:** Alertas y reportes de costo.
- **Historias cubiertas:** HU-05 Recibir alertas; HU-06 Costo total de mantenimiento
- **Depende de:** fase 4.
- **Duración:** 4 días.
- **Criterio de salida:**
  - Las alertas se programan, se cancelan y se muestran en el teléfono real.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Vehículos y odómetro
- [ ] **Fase 3:** Servicios de mantenimiento
- [ ] **Fase 4:** Documentos y vencimientos
- [ ] **Fase 5:** Alertas y reportes de costo

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Registrar vehículos y lecturas de odómetro | 2 | Vehículos y odómetro |
| HU-02 Registrar servicios de mantenimiento | 3 | Servicios de mantenimiento |
| HU-03 Ver el próximo servicio | 3 | Servicios de mantenimiento |
| HU-04 Controlar vencimientos de documentos | 4 | Documentos y vencimientos |
| HU-05 Recibir alertas | 5 | Alertas y reportes de costo |
| HU-06 Costo total de mantenimiento | 5 | Alertas y reportes de costo |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 35 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 10 | 100 % |
| Reglas cubiertas | RN con prueba / 6 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
