const app = require('./app');

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
