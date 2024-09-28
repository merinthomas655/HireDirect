const { gql } = require('apollo-server-express');

const typeDefs = gql(`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    usertype: String!
  }

  type Query {
    users: [User]
  }

  type LoginResponse {
    user: User
    message: String
    success: Boolean!
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse
  }
`);

module.exports = typeDefs;
