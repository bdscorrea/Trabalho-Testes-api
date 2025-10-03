const bcrypt = require('bcryptjs');
const { users } = require('../model/userModel');
let nextId = 1;

function findByUsername(username) {
  return users.find(u => u.username === username);
}

function register({ username, password }) {
  if (!username || !password) return { error: 'Usuário e senha são obrigtórios.' };
  if (findByUsername(username)) return { error: 'Usuário não existe' };
  const passwordHash = bcrypt.hashSync(password, 8);
  const user = { id: nextId++, username, passwordHash };
  users.push(user);
  return { id: user.id, username: user.username };
}

function authenticate({ username, password }) {
  if (!username || !password) return { error: 'Usuário e senha são obrigtórios.' };
  const user = findByUsername(username);
  if (!user) return { error: 'Credenciais Inválidas.' };
  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return { error: 'Credenciais Inválidas.' };
  return { id: user.id, username: user.username };
}

function getById(id) {
  return users.find(u => u.id === id);
}

module.exports = { register, authenticate, getById };
