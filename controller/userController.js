const userService = require('../service/userService');

exports.me = (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
};
