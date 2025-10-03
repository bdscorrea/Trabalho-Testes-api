require('dotenv').config();
const createApp = require('./app');

const PORT = process.env.PORT_GRAPHQL || 4003;

async function start() {
  const app = await createApp();
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL API rodando em http://localhost:${PORT}/graphql`);
  });
}

start();
