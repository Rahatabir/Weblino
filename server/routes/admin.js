const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/database');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();
router.use(requireAdmin); // every route below is admin-only

// ---- Dashboard stats ----
router.get('/stats', (req, res) => {
  const customers = db.prepare(`SELECT COUNT(*) c FROM users WHERE role='customer'`).get().c;
  const messages = db.prepare(`SELECT COUNT(*) c FROM messages`).get().c;
  const newMessages = db.prepare(`SELECT COUNT(*) c FROM messages WHERE status='new'`).get().c;
  const projects = db.prepare(`SELECT COUNT(*) c FROM projects`).get().c;
  const inProgress = db.prepare(`SELECT COUNT(*) c FROM projects WHERE status='in_progress'`).get().c;
  const completed = db.prepare(`SELECT COUNT(*) c FROM projects WHERE status='completed'`).get().c;
  res.json({ customers, messages, newMessages, projects, inProgress, completed });
});

// ---- Messages (contact form submissions) ----
router.get('/messages', (req, res) => {
  const rows = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  res.json({ messages: rows });
});

router.patch('/messages/:id', (req, res) => {
  const { status } = req.body;
  if (!['new', 'read', 'replied'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  db.prepare('UPDATE messages SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ ok: true });
});

router.delete('/messages/:id', (req, res) => {
  db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// ---- Customers (users with role customer) ----
router.get('/users', (req, res) => {
  const rows = db.prepare(
    `SELECT id, name, email, phone, created_at FROM users WHERE role = 'customer' ORDER BY created_at DESC`
  ).all();
  res.json({ users: rows });
});

router.post('/users', (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, password required' });
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  if (existing) return res.status(409).json({ error: 'Email already in use' });
  const hash = bcrypt.hashSync(password, 10);
  const info = db.prepare(
    `INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, 'customer')`
  ).run(name, email.toLowerCase(), hash, phone || null);
  res.json({ id: info.lastInsertRowid });
});

router.delete('/users/:id', (req, res) => {
  db.prepare(`DELETE FROM users WHERE id = ? AND role = 'customer'`).run(req.params.id);
  res.json({ ok: true });
});

// ---- Projects ----
router.get('/projects', (req, res) => {
  const rows = db.prepare(`
    SELECT projects.*, users.name AS customer_name, users.email AS customer_email
    FROM projects JOIN users ON users.id = projects.customer_id
    ORDER BY projects.created_at DESC
  `).all();
  res.json({ projects: rows });
});

router.post('/projects', (req, res) => {
  const { customer_id, title, description, budget, status, notes } = req.body;
  if (!customer_id || !title) return res.status(400).json({ error: 'customer_id and title are required' });
  const info = db.prepare(
    `INSERT INTO projects (customer_id, title, description, budget, status, notes) VALUES (?, ?, ?, ?, ?, ?)`
  ).run(customer_id, title, description || null, budget || null, status || 'pending', notes || null);
  res.json({ id: info.lastInsertRowid });
});

router.patch('/projects/:id', (req, res) => {
  const { title, description, budget, status, notes } = req.body;
  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  db.prepare(`
    UPDATE projects SET
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      budget = COALESCE(?, budget),
      status = COALESCE(?, status),
      notes = COALESCE(?, notes),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(title, description, budget, status, notes, req.params.id);
  res.json({ ok: true });
});

router.delete('/projects/:id', (req, res) => {
  db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
