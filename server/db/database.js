const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'weblino.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// ---- Schema ----
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer', -- 'admin' | 'customer'
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  budget TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- 'new' | 'read' | 'replied'
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'in_progress' | 'completed'
  budget TEXT,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
);
`);

// ---- Seed a default admin if none exists ----
const adminCount = db.prepare(`SELECT COUNT(*) AS c FROM users WHERE role = 'admin'`).get().c;
if (adminCount === 0) {
  const defaultEmail = process.env.ADMIN_EMAIL || 'admin@weblino.com';
  const defaultPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const hash = bcrypt.hashSync(defaultPassword, 10);
  db.prepare(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin')`)
    .run('Weblino Admin', defaultEmail, hash);
  console.log('----------------------------------------------------');
  console.log('Seeded default admin account:');
  console.log('  email:   ', defaultEmail);
  console.log('  password:', defaultPassword);
  console.log('CHANGE THIS PASSWORD after first login!');
  console.log('----------------------------------------------------');
}

module.exports = db;
