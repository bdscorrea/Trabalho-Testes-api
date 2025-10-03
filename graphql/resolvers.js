// graphql/resolvers/index.js
const userService = require('../service/userService');
const todoService = require('../service/todoService');
const { signToken } = require('./auth');

const resolvers = {
  Query: {
    me: (_, __, context) => {
      if (!context.user) return null;
      return userService.getById(context.user);
    },
    users: () => userService.getAll ? userService.getAll() : [], // ajuste se tiver getAll
    todos: (_, __, context) => {
      return todoService.listAll ? todoService.listAll() : [];
    }
  },

    Mutation: {
      register: async (_, { username, password }) => {
        const res = userService.register({ username, password });
       if (res.error) throw new Error(res.error);
      return res; // ✅ CORRIGIDO: Retornando a variável declarada 'res'
    },


    login: async (_, { username, password }) => {
      const user = userService.authenticate({ username, password });
      if (user.error) throw new Error(user.error);
      const token = signToken({ username: user.username });
      return { token, user };
    },

    createTodo: async (_, { title, description, status }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const todo = await todoService.create({
        title, description, status
      });
      if (todo.error) throw new Error(todo.error);
      return todo;
    },

    updateTodo: async (_, { id, title, description, status }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const updated = await todoService.update({ id, title, description, status, userId: context.user.id });
      if (updated.error) throw new Error(updated.error);
      return updated;
    },

    deleteTodo: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const ok = await todoService.delete({ id });
      return !!ok;
    },
  }
};

module.exports = resolvers;
