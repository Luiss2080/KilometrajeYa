<div align="center">

<img src="docs/assets/logo.svg" alt="KilometrajeYa" width="96" height="96">

# KilometrajeYa

**Odómetro por vehículo con alertas de aceite, llantas, SOAT e inspección técnica.** Pensado para taxistas, conductores de plataformas y dueños de autos, offline.

[🚀 Características](#-características) · [🧰 Stack](#-stack) · [📂 Estructura](#-estructura) · [🔧 Configuración](#-configuración) · [🧪 Pruebas](#-pruebas) · [🤝 Contribuir](#-contribuir) · [📄 Licencia](#-licencia)

</div>

---

## 🚀 Características

- Vehículos con kilometraje actual y lecturas de odómetro.
- Servicios realizados (aceite, llantas, frenos) con costo.
- Próximo servicio por kilometraje o por fecha.
- Vencimientos de SOAT, inspección técnica y otros documentos.
- Alertas locales antes de cada vencimiento.
- Costo total de mantenimiento por vehículo.

> Sin servidores, sin suscripciones y sin servicios de pago: todos los datos viven en el dispositivo (SQLite).

## 🧰 Stack

| Capa | Tecnología |
|---|---|
| App | React Native + Expo (TypeScript) |
| Datos | SQLite local (expo-sqlite) |
| Navegación | Expo Router |
| Recordatorios | Notificaciones locales (expo-notifications) |
| Compartir | Hoja de compartir del sistema (expo-sharing), WhatsApp incluido |
| Archivos | Exportación CSV al dispositivo (expo-file-system) |
| Distribución | APK / EAS Build local |

### Modelo de datos

- `vehiculos` (id, placa, modelo, anio, km_actual)
- `lecturas` (id, vehiculo_id, km, fecha)
- `servicios` (id, vehiculo_id, tipo, km, fecha, costo, proximo_km, proxima_fecha)
- `documentos` (id, vehiculo_id, tipo, vencimiento)

El detalle de cada tabla y la política de migraciones están en [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md).

## 🗺️ Roadmap

1. Estructura base y navegación
2. Vehículos y odómetro
3. Servicios de mantenimiento
4. Documentos y vencimientos
5. Alertas y reportes de costo

> Detalle fase por fase: [docs/ROADMAP.md](docs/ROADMAP.md) · [docs/SPEC.md](docs/SPEC.md) · [docs/PLANNING.md](docs/PLANNING.md)

## 📂 Estructura

```
KilometrajeYa/
├── app/            # Pantallas y rutas (Expo Router)
├── src/
│   ├── db/         # Esquema, migraciones y consultas SQLite
│   ├── components/ # Componentes reutilizables
│   └── lib/        # Utilidades (formato, CSV)
├── docs/assets/    # Logo y recursos del README
└── .github/        # Plantillas, CI y Dependabot
```

## 🔧 Configuración

**Requisitos:** Node.js 20+ y la app Expo Go (o un emulador).

```bash
git clone https://github.com/Luiss2080/KilometrajeYa.git
cd KilometrajeYa
npm install
npx expo start
```

Escaneá el QR con Expo Go para abrir la app en tu teléfono. La base local se crea sola en el primer arranque.

El repositorio está en fase inicial: la estructura, la base de datos y la documentación están listas y la app se construye siguiendo el roadmap.

## 🧪 Pruebas

```bash
npm test
npm run lint
npx tsc --noEmit
```

## 🤝 Contribuir

Leé la [guía de contribución](CONTRIBUTING.md) y el [código de conducta](CODE_OF_CONDUCT.md). Para reportar vulnerabilidades consultá la [política de seguridad](SECURITY.md); para dudas, [SUPPORT.md](SUPPORT.md).

## 📄 Licencia

Distribuido bajo licencia MIT. Consultá [LICENSE](LICENSE).

---

<div align="center">

Hecho por [Luiss2080](https://github.com/Luiss2080)

</div>
