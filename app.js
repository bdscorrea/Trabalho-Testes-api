const express = require('express');
const authController = require('./controller/authController');
const todoController = require('./controller/todoController');
const userController = require('./controller/userController');
const authService = require('./service/authService');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(express.json());

// auth
app.post('/register', authController.register);
app.post('/login', authController.login);

// protected routes
app.get('/me', authService.authMiddleware, userController.me);

// todos
app.post('/todos', authService.authMiddleware, todoController.create);
app.get('/todos', authService.authMiddleware, todoController.list);
app.get('/todos/:id', authService.authMiddleware, todoController.get);
app.put('/todos/:id', authService.authMiddleware, todoController.update);
app.delete('/todos/:id', authService.authMiddleware, todoController.remove);

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
