import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'salon.db'));


db.exec(`
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    duration INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    service_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (service_id) REFERENCES services(id)
  );
`);

// Seed sample data, but only if the services table is currently empty.
// Otherwise every restart would add duplicate rows.
const count = db.prepare('SELECT COUNT(*) as c FROM services').get().c;
if (count === 0) {
  const insert = db.prepare(
    'INSERT INTO services (name, price, duration) VALUES (?, ?, ?)'
  );
  insert.run('Haircut', 500, 30);
  insert.run('Hair Coloring', 2500, 120);
  insert.run('Facial', 1500, 60);
}

export default db;