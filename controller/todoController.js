const todoService = require('../service/todoService');

exports.create = (req, res) => {
  const userId = req.user.id;
  const { title, status, description } = req.body;
  const result = todoService.create({ userId, title, status, description });
  if (result.error) return res.status(400).json(result);
  res.status(201).json(result);
};

exports.list = (req, res) => {
  const userId = req.user.id;
  res.json(todoService.listByUser(userId));
};

exports.get = (req, res) => {
  const userId = req.user.id;
  const id = parseInt(req.params.id, 10);
  const todo = todoService.getById(userId, id);
  if (!todo) return res.status(404).json({ error: 'Não encontrado' });
  res.json(todo);
};

exports.update = (req, res) => {
  const userId = req.user.id;
  const id = parseInt(req.params.id, 10);
  const result = todoService.update(userId, id, req.body);
  if (result.error) return res.status(404).json(result);
  res.json(result);
};

exports.remove = (req, res) => {
  const userId = req.user.id;
  const id = parseInt(req.params.id, 10);
  const result = todoService.remove(userId, id);
  if (result.error) return res.status(404).json(result);
  res.json(result);
};
