const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID!
    username: String!
    email: String!
    password_hash: String!
    phone_number: String!
    address: String
    role: String!
    created_at: String
    updated_at: String
  }

  type Query {
    # Queries for Users
    users: [User]
    user(_id: ID!): User

  }
`;

module.exports = typeDefs;