const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    phone_number: String
    address: Address
    role: String!
    created_at: String
    updated_at: String
  }

  type Address {
    street: String
    city: String
    state: String
    zip_code: String
  }

type Provider {
  _id: ID!
  user: User! # Keep this field for the user reference
  user_id: ID! # Add this field for user ID reference
  bio: String
  location: Location
  image: String
  ratings: Float
  reviews: [Review]
  created_at: String
  updated_at: String
}


  type Location {
    latitude: Float
    longitude: Float
    address: String
  }

  type Category {
    _id: ID!
    category_name: String
    description: String
    created_at: String
    updated_at: String
  }

  type Service {
    _id: ID!
    title: String!
    description: String
    provider: Provider
    category: Category
    created_at: String
    updated_at: String
  }

  type Review {
    _id: ID!
    user: User!
    provider: Provider!
    rating: Int!
    comment: String
    created_at: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    provider(id: ID!): Provider
    category(id: ID!): Category
    reviews: [Review]
    review(id: ID!): Review
    services: [Service]  
    service(id: ID!): Service  
    providers(categoryId: ID, location: String, minRating: Float): [Provider]
    categories: [Category]
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      password_hash: String!
      phone_number: String
      address: AddressInput
      role: String!
    ): User
    updateUser(
      id: ID!
      username: String
      email: String
      phone_number: String
      address: AddressInput
      role: String
    ): User
    deleteUser(id: ID!): User

    createProvider(
      user: ID!
      bio: String!
      location: LocationInput!
      image: String
      ratings: Float
    ): Provider
    updateProvider(
      id: ID!
      bio: String
      location: LocationInput
      image: String
      ratings: Float
    ): Provider
    deleteProvider(id: ID!): Provider

    createCategory(
      category_name: String!
      description: String
    ): Category
    updateCategory(
      id: ID!
      category_name: String
      description: String
    ): Category
    deleteCategory(id: ID!): Category

    createService(
      title: String!
      description: String
      provider: ID
      category: ID
    ): Service  
    updateService(
      id: ID!
      title: String
      description: String
      provider: ID
      category: ID
    ): Service  
    deleteService(id: ID!): Service  

    createReview(
      user: ID!
      provider: ID! 
      rating: Int!
      comment: String
    ): Review
    updateReview(
      id: ID!
      rating: Int
      comment: String
    ): Review
    deleteReview(id: ID!): Review
  }

  input AddressInput {
    street: String
    city: String
    state: String
    zip_code: String
  }

  input LocationInput {
    latitude: Float
    longitude: Float
    address: String
  }
`;

module.exports = typeDefs;
