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

  type SignupResponse {
    user: User
    message: String
    success: Boolean!
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!, usertype: String!): SignupResponse
  }
`);

module.exports = typeDefs;
