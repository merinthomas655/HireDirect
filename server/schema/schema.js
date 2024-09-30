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
    _id: ID
    user: User
    bio: String
    location: Location
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

  type Service {
    _id: ID
    provider: Provider
    service_name: String
    description: String
    pricing: Float
    category: Category
    created_at: String
    updated_at: String
  }

  type Category {
    _id: ID
    category_name: String
    description: String
    created_at: String
    updated_at: String
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
    provider: Provider!
    date: String!
    start_time: String!
    end_time: String!
    created_at: String
    updated_at: String
  }

  type Review {
    _id: ID!
    user: User!
    service: Service!
    rating: Int!
    comment: String
    created_at: String
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
    user(id: ID!): User
    providers: [Provider]
    provider(id: ID!): Provider
    services(categoryId: ID, location: String, minRating: Float): [Service]
    service(id: ID!): Service
    categories: [Category]
    category(id: ID!): Category
    bookings: [Booking]
    booking(id: ID!): Booking
    availableSlots: [AvailableSlot]
    availableSlot(id: ID!): AvailableSlot
    reviews: [Review]
    review(id: ID!): Review
    payments: [Payment]
    payment(id: ID!): Payment
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
      ratings: Float
    ): Provider
    updateProvider(
      id: ID!
      bio: String
      location: LocationInput
      ratings: Float
    ): Provider
    deleteProvider(id: ID!): Provider

    createService(
      provider: ID!
      service_name: String!
      description: String!
      pricing: Float!
      category: ID!
    ): Service
    updateService(
      id: ID!
      service_name: String
      description: String
      pricing: Float
      category: ID
    ): Service
    deleteService(id: ID!): Service

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

    createBooking(
      user: ID!
      provider: ID!
      total_price: Float!
      status: String!
      booking_services: [BookingServiceInput]!
    ): Booking
    updateBooking(
      id: ID!
      total_price: Float
      status: String
    ): Booking
    deleteBooking(id: ID!): Booking

    createAvailableSlot(
      provider: ID!
      date: String!
      start_time: String!
      end_time: String!
    ): AvailableSlot
    updateAvailableSlot(
      id: ID!
      date: String
      start_time: String
      end_time: String
    ): AvailableSlot
    deleteAvailableSlot(id: ID!): AvailableSlot

    createReview(
      user: ID!
      service: ID!
      rating: Int!
      comment: String
    ): Review
    updateReview(
      id: ID!
      rating: Int
      comment: String
    ): Review
    deleteReview(id: ID!): Review

    createPayment(
      booking: ID!
      amount: Float!
      payment_method: String!
      payment_status: String!
    ): Payment
    updatePayment(
      id: ID!
      amount: Float
      payment_method: String
      payment_status: String
    ): Payment
    deletePayment(id: ID!): Payment
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

  input BookingServiceInput {
    service: ID!
    slot: ID!
    price: Float!
  }
`;

module.exports = typeDefs;
