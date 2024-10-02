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
    user: User
    bio: String!
    location: Location!
    ratings: Float
    services:[Service]
    reviews: [Review]
    created_at: String
    updated_at: String
  }

  type Location {
    latitude: Float
    longitude: Float
    address: String
  }

  type Service {
    _id: ID!
    service_name: String!
    description: String!
    pricing: Float!
  }

  type Category {
    _id: ID!
    category_name: String!
    description: String
  }


  type Booking {
    _id: ID!
    user: User!
    provider: Provider!
    total_price: Float!
    status: String!
    booking_services: [BookingService]!
    created_at: String
    updated_at: String
  }

  type BookingService {
    service: Service!
    slot: AvailableSlot!
    price: Float!
  }

  type AvailableSlot {
    _id: ID!
    provider_id: Provider!
    date: String!
    start_time: String!
    end_time: String!
    created_at: String
    updated_at: String
  }

  type Review {
    _id: ID!
    rating: Int!
    comment: String
    user: User
  }

  type Payment {
    _id: ID!
    booking: Booking!
    amount: Float!
    payment_method: String!
    payment_status: String!
    created_at: String
  }

   type Query {
    users: [User]
  }

  type LoginSingupResponse {
    user: User
    message: String
    success: Boolean!
  }

  #This is login mutation

  type Mutation {
    login(email: String!, password: String!): LoginSingupResponse
  }

  #This is singup mutation

  type Mutation {
    signup(username: String!, email: String!, password: String!, role: String!): LoginSingupResponse
  }
`;

module.exports = typeDefs;