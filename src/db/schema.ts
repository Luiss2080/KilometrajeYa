// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE vehiculos (id INTEGER PRIMARY KEY AUTOINCREMENT, placa TEXT NOT NULL UNIQUE, modelo TEXT, anio INTEGER, km_actual INTEGER NOT NULL DEFAULT 0);
CREATE TABLE lecturas (id INTEGER PRIMARY KEY AUTOINCREMENT, vehiculo_id INTEGER NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE, km INTEGER NOT NULL, fecha TEXT NOT NULL);
CREATE TABLE servicios (id INTEGER PRIMARY KEY AUTOINCREMENT, vehiculo_id INTEGER NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE, tipo TEXT NOT NULL, km INTEGER, fecha TEXT NOT NULL, costo REAL NOT NULL DEFAULT 0, proximo_km INTEGER, proxima_fecha TEXT);
CREATE TABLE documentos (id INTEGER PRIMARY KEY AUTOINCREMENT, vehiculo_id INTEGER NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE, tipo TEXT NOT NULL, vencimiento TEXT NOT NULL);`,
];

export const TABLAS = ['vehiculos', 'lecturas', 'servicios', 'documentos'] as const;
