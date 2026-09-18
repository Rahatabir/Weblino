require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');
const contactRoutes = require('./routes/contact');

const app = express();
const ROOT = path.join(__dirname, '..');

app.use(express.json());
app.use(cookieParser());

// ---- API ----
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/contact', contactRoutes);

// ---- Static site + panels ----
app.use(express.static(ROOT)); // serves index.html, css, js, assets, admin/, customer/

app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

app.use((req, res) => {
  res.status(404).send('Not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Weblino server running at http://localhost:${PORT}`);
  console.log(`Admin panel:    http://localhost:${PORT}/admin/login.html`);
  console.log(`Customer panel: http://localhost:${PORT}/customer/login.html`);
});
