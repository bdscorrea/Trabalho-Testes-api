const userService = require('../service/userService');
const authService = require('../service/authService');

exports.register = (req, res) => {
  const { username, password } = req.body;
  const result = userService.register({ username, password });
  if (result.error) return res.status(400).json(result);
  res.status(201).json(result);
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const result = userService.authenticate({ username, password });
  if (result.error) return res.status(401).json(result);
  const token = authService.sign(result);
  res.json({ token, user: result });
};
