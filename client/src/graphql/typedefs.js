const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type PaginatedUsers {
    users: [User]
    totalPages: Int!
    currentPage: Int!
    totalUsers: Int!
  }

  type Query {
    users(search: String, page: Int, limit: Int): PaginatedUsers
  }
`;

module.exports = typeDefs;
