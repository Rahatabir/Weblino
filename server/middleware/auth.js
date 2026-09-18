const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

function requireAuth(req, res, next) {
  const token = req.cookies && req.cookies.weblino_token;
  if (!token) return res.status(401).json({ error: 'Not logged in' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
}

function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access only' });
    }
    next();
  });
}

function requireCustomer(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ error: 'Customer access only' });
    }
    next();
  });
}

module.exports = { requireAuth, requireAdmin, requireCustomer, JWT_SECRET };
