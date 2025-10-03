const { todos } = require('../model/todoModel');
let nextTodoId = 1;

function create({ userId, title, status, description }) {
  if (!title) return { error: 'Título obrigatório' };
  if (!status) return { error: 'Status obrigatório. , \n , A- ativo. I- inativo' };
  const todo = { id: nextTodoId++, userId, title, status, description: description || '' };
  todos.push(todo);
  return todo;
}

function listByUser(userId) {
  return todos.filter(t => t.userId === userId);
}

function getById(userId, id) {
  const todo = todos.find(t => t.id === id && t.userId === userId);
  return todo || null;
}

function update(userId, id, { title, status, description }) {
  const todo = todos.find(t => t.id === id && t.userId === userId);
  if (!todo) return { error: 'Não encontrado' };
  if (title !== undefined) todo.title = title;
  if (status !== undefined) todo.status = status;
  if (description !== undefined) todo.description = description;
  return todo;
}

function remove(userId, id) {
  const idx = todos.findIndex(t => t.id === id && t.userId === userId);
  if (idx === -1) return { error: 'Não encontrado' };
  const [deleted] = todos.splice(idx, 1);
  return deleted;
}

module.exports = { create, listByUser, getById, update, remove };
