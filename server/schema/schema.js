const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
    phone_number: String
    address: Address
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
    user: User # Keep this field for the user reference
    user_id: ID! # Add this field for user ID reference
    bio: String!
    location: Location!
    image: String
    ratings: Float
    services: [Service]
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
  }

  type Service {
    _id: ID!
    service_name: String!
    title: String
    description: String!
    pricing: Float!
    provider: Provider
    category: Category
    created_at: String
    updated_at: String
  }

  type Review {
    _id: ID!
    user: User
    provider: Provider!
    rating: Int!
    comment: String!
    created_at: String
  }

  type BookingService {
    service_id: Service!
    slot_id: ID
    price: Float!
  }

  type Booking {
    _id: ID!
    user_id: User!
    provider_id: Provider!
    total_price: Float!
    status: String!
    booking_services: [BookingService]
    created_at: String
    updated_at: String
  }

  type Count {
    totalUsers: Int
    totalProviders: Int
    totalServices: Int
    totalBookings: Int
  }

  type BookingCounts {
    totalBookings: Int
    upcomingBookings: Int
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
    getCounts: Count
    getBookingHistory: [Booking]
    getBookingCounts(userId: ID): BookingCounts
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

    login(email: String!, password: String!): LoginSingupResponse
    signup(username: String!, email: String!, password: String!, role: String!): LoginSingupResponse
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

  type LoginSingupResponse {
    user: User
    message: String
    success: Boolean!
  }
`;

module.exports = typeDefs;
