# To-Do API

API To-Do em memória para aprendizado de testes e automação.

## Instalação

```bash
npm install
```

## Execução

```bash
node server.js
```

A API ficará disponível em `http://localhost:3003` e a documentação em `http://localhost:3003/api-docs`.

## Endpoints
- POST /register { username, password }
- POST /login { username, password } -> { token }
- GET /me (Bearer token)
- POST /todos (Bearer token) { title, status, description? }
- GET /todos (Bearer token)
- GET /todos/:id (Bearer token)
- PUT /todos/:id (Bearer token)
- DELETE /todos/:id (Bearer token)

## Regras principais
- Usuário não pode ser duplicado.
- Login exige username e password.
- Cada usuário só vê/manipula suas próprias tarefas.
- Tarefa requer pelo menos `title` e `status`.

**Observação:** O secret JWT está no código para fins didáticos. Para produção, use variáveis de ambiente/secrets.
