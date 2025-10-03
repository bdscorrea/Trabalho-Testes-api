const jwt = require('jsonwebtoken');
const userService = require('./userService');

const SECRET = 'dev_secret_for_learning_purposes';

function sign(user) {
  return jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '2h' });
}

function verify(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Autenticação obrigatória.' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Token malformed' });
  const payload = verify(parts[1]);
  if (!payload) return res.status(401).json({ error: 'Token Inválido' });
  const user = userService.getById(payload.id);
  if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });
  req.user = { id: user.id, username: user.username };
  next();
}

module.exports = { sign, verify, authMiddleware };
