const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/database');
const { requireCustomer } = require('../middleware/auth');

const router = express.Router();
router.use(requireCustomer);

router.get('/profile', (req, res) => {
  const user = db.prepare('SELECT id, name, email, phone, created_at FROM users WHERE id = ?').get(req.user.id);
  res.json({ user });
});

router.patch('/profile', (req, res) => {
  const { name, phone, password } = req.body;
  if (name || phone) {
    db.prepare('UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone) WHERE id = ?')
      .run(name || null, phone || null, req.user.id);
  }
  if (password) {
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
    const hash = bcrypt.hashSync(password, 10);
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hash, req.user.id);
  }
  res.json({ ok: true });
});

router.get('/projects', (req, res) => {
  const rows = db.prepare('SELECT * FROM projects WHERE customer_id = ? ORDER BY created_at DESC').all(req.user.id);
  res.json({ projects: rows });
});

module.exports = router;
