# Plan de pruebas — KilometrajeYa

> Qué probar, cuándo y cómo. Cada historia y cada regla de negocio tiene casos concretos. Complementa a [SPEC.md](SPEC.md).

## 1. Estrategia

| Nivel | Herramienta | Qué cubre | Cuándo |
|---|---|---|---|
| Unitarias | jest-expo (`npm test`) | Lógica pura de `src/lib/` (cálculos, validaciones, formatos) | En cada commit (CI) |
| Manuales por historia | Teléfono con Expo Go | Criterios de aceptación de SPEC (casos CP-) | Al cerrar cada tarea de pantalla |
| Regresión por fase | Teléfono real | Lo ya terminado sigue andando | Al cerrar cada fase |
| Aceptación final | APK en teléfono limpio, modo avión | Criterios de lanzamiento | Antes de v1.0.0 |

Meta de cobertura: **100 % de las reglas de negocio** con prueba automática o caso manual, y **100 % de los criterios de aceptación** ejecutados al menos una vez en un teléfono real.

## 2. Pruebas unitarias por regla de negocio

Crear un archivo `src/lib/<tema>.test.ts` por tema. Una prueba por regla como mínimo; agregar los bordes de la sección 4.

| ID | Regla | Tipo de prueba | Casos mínimos |
|---|---|---|---|
| RN-01 | El kilometraje actual de un vehículo es la lectura más reciente y nunca puede ser menor a la anterior. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-02 | Un servicio puede tener próximo vencimiento por kilometraje, por fecha o por ambos; vence lo que ocurra primero. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-03 | Un servicio está «por vencer» cuando faltan menos de 500 km o menos de 15 días (configurable). | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-04 | Un documento está vencido cuando su fecha ya pasó y «por vencer» a 30 días de la fecha. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-05 | El costo por kilómetro = costo total de servicios ÷ kilómetros recorridos entre la primera y la última lectura. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-06 | Registrar un servicio con kilometraje mayor al actual actualiza el odómetro. | Unitaria o manual | Caso válido, caso inválido, límite |

## 3. Casos manuales por historia

Formato: ejecutar en el teléfono, marcar ✔ o ✘ y anotar la fecha. Si falla, abrir un issue con el ID del caso.

### HU-01 — Registrar vehículos y lecturas de odómetro (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-01-1 | no tengo vehículos | abro la app | veo el estado vacío con «Agregar vehículo» | ☐ |
| CP-01-2 | un vehículo con 52.000 km | ingreso una lectura de 51.000 | la app rechaza el valor por ser menor a la última lectura | ☐ |

Casos transversales: **CP-01-T1** modo avión · **CP-01-T2** cerrar y reabrir la app (persistencia) · **CP-01-T3** texto del sistema en tamaño grande.

### HU-02 — Registrar servicios de mantenimiento (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-02-1 | el formulario de servicio | elijo «Cambio de aceite», 85.000 km y 250 Bs | se guarda y el odómetro del vehículo pasa a 85.000 | ☐ |
| CP-02-2 | un servicio con costo vacío | lo guardo | se registra con costo 0 sin error | ☐ |

Casos transversales: **CP-02-T1** modo avión · **CP-02-T2** cerrar y reabrir la app (persistencia) · **CP-02-T3** texto del sistema en tamaño grande.

### HU-03 — Ver el próximo servicio (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-03-1 | aceite cada 5.000 km hecho a 80.000 y odómetro en 84.600 | abro Inicio | aparece «por vencer» (faltan 400 km) | ☐ |

Casos transversales: **CP-03-T1** modo avión · **CP-03-T2** cerrar y reabrir la app (persistencia) · **CP-03-T3** texto del sistema en tamaño grande.

### HU-04 — Controlar vencimientos de documentos (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-04-1 | un SOAT que vence en 20 días | abro Documentos | aparece «por vencer» en amarillo con los días restantes | ☐ |
| CP-04-2 | un documento vencido | abro Documentos | aparece en rojo arriba de la lista | ☐ |

Casos transversales: **CP-04-T1** modo avión · **CP-04-T2** cerrar y reabrir la app (persistencia) · **CP-04-T3** texto del sistema en tamaño grande.

### HU-05 — Recibir alertas (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-05-1 | un documento que vence en 30 días | llega la fecha del aviso | recibo una notificación local con el nombre y vehículo | ☐ |
| CP-05-2 | edito la fecha de un documento | guardo | la alerta anterior se cancela y se programa la nueva | ☐ |

Casos transversales: **CP-05-T1** modo avión · **CP-05-T2** cerrar y reabrir la app (persistencia) · **CP-05-T3** texto del sistema en tamaño grande.

### HU-06 — Costo total de mantenimiento (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-06-1 | un vehículo con varios servicios | abro Costos | veo total, por tipo de servicio y costo por kilómetro | ☐ |

Casos transversales: **CP-06-T1** modo avión · **CP-06-T2** cerrar y reabrir la app (persistencia) · **CP-06-T3** texto del sistema en tamaño grande.

## 4. Casos borde

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| CB-01 | Odómetro reiniciado o reemplazado: permitir «corrección de odómetro» con nota explícita. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-02 | Servicio registrado con fecha pasada: no cambia el odómetro si el km es menor. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-03 | Vehículo vendido: archivarlo sin perder historial. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-04 | Documento sin fecha de vencimiento: se guarda sin alerta. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |

## 5. Pruebas de datos y migraciones

| ID | Prueba | Esperado |
|---|---|---|
| CD-01 | Primer arranque en teléfono limpio | La base se crea con todas las tablas y `user_version` queda en 1 |
| CD-02 | Actualizar de una versión anterior con datos cargados | Las migraciones nuevas se aplican y no se pierde ningún registro |
| CD-03 | Borrar un registro padre | Los hijos se borran o se bloquea con mensaje, según el esquema |
| CD-04 | Intentar guardar con campos obligatorios vacíos | No se inserta nada y se marcan los campos |
| CD-05 | Cargar 1.000 registros de prueba | Las listas siguen fluidas (scroll sin trabas) y abren en menos de 2 s |

## 6. Regresión al cerrar cada fase

**Fase 1 — Estructura base y navegación**

- [ ] La app abre y navega sin errores

**Fase 2 — Vehículos y odómetro**

- [ ] Rechaza lecturas decrecientes y conserva el historial.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 3 — Servicios de mantenimiento**

- [ ] El cálculo de estado cubre solo-km, solo-fecha y ambos.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 4 — Documentos y vencimientos**

- [ ] Los semáforos coinciden con las reglas de vencimiento.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 5 — Alertas y reportes de costo**

- [ ] Las alertas se programan, se cancelan y se muestran en el teléfono real.
- [ ] Los criterios de las fases anteriores siguen funcionando

## 7. Matriz de dispositivos

| Dispositivo | Android | Qué se verifica |
|---|---|---|
| Gama baja (2–3 GB de RAM) | 8–10 | Fluidez de listas, tiempo de arranque |
| Gama media | 11–13 | Flujo completo y APK |
| Pantalla pequeña (5") | cualquiera | Que nada quede cortado ni oculto por el teclado |
| Texto del sistema grande | cualquiera | Que los formularios sigan siendo usables |

## 8. Lista de verificación para el lanzamiento (v1.0.0)

- [ ] Todas las historias ejecutadas en teléfono real (casos CP-)
- [ ] Todos los casos borde (CB-) ejecutados
- [ ] Pruebas de datos (CD-) ejecutadas
- [ ] APK instalado en un teléfono limpio sin Expo Go
- [ ] Probado en modo avión durante todo el flujo principal
- [ ] Rotación de pantalla no pierde datos del formulario
- [ ] Permisos solicitados solo cuando se necesitan y con explicación
- [ ] Sin errores en la consola durante un recorrido completo
- [ ] README con capturas y CHANGELOG al día

## 9. Informe de errores

```
Título: [Bug] <qué pasó>
ID de caso: CP-XX-X
Pasos: 1... 2... 3...
Esperado: ...
Obtenido: ...
Dispositivo / Android: ...
Captura o video: ...
```
