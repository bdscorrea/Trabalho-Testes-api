// graphql/schema/index.js
const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    username: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Todo {
    id: ID!
    title: String!
    description: String
    status: String!
  }

  type Transfer {
    id: ID!
    fromUserId: ID!
    amount: Float!
    createdAt: String
  }

  type Query {
    me: User
    users: [User!]!
    todos: [Todo!]!
    todosByUser: [Todo!]!
  }

  type Mutation {
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): AuthPayload!

    createTodo(title: String!, description: String, status: String!): Todo!
    updateTodo(id: ID!, title: String, description: String, status: String): Todo!
    deleteTodo(id: ID!): Boolean!

    # Transfers - protected by JWT
    createTransfer(toUserId: ID!, amount: Float!): Transfer!
  }
`;

module.exports = typeDefs;
