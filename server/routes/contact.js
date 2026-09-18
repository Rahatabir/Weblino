const express = require('express');
const db = require('../db/database');
const router = express.Router();

// Public: contact/project form on the homepage submits here
router.post('/', (req, res) => {
  const { name, email, phone, project_type, budget, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }
  db.prepare(`
    INSERT INTO messages (name, email, phone, project_type, budget, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(name, email, phone || null, project_type || null, budget || null, message);
  res.json({ ok: true });
});

module.exports = router;
