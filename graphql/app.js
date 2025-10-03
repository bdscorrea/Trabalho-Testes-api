// graphql/app.js
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./typeDefs');
const resolver = require('./resolvers');
const { contextFromReq } = require('./auth');


async function createApp() {
  const app = express();
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolver,
    context: ({ req }) => {
      // contexto com user extraído do header Authorization
      return contextFromReq({ req });
    },
    introspection: true,
  });

  await server.start();
app.use(
        '/graphql', 
        // ❌ REMOVER o middleware de autenticação AQUI (se ele estiver causando o erro)
        // Por exemplo: auth.authenticate, // <-- REMOVA ISTO
        expressMiddleware(server, {
            // ✅ Adicionar a lógica de autenticação AQUI, dentro do context
            context: async ({ req }) => {
                // A função auth.contextFromReq ou equivalente DEVE receber o objeto 'req'
                //const user = await auth.contextFromReq(req); 
                //return { user }; // Retorna o objeto de contexto, que terá o usuário
                  return require('./auth').contextFromReq(req); 
            }, 
        })
    );
    
    return app;
};

module.exports = createApp; 
