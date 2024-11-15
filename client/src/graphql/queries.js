import { gql } from '@apollo/client';

export const GET_PROVIDER_PROFILE = gql`
  query GetProviderProfile($id: ID!) {
    provider(id: $id) {
      _id
      user {
        username
        email
      }
      bio
      location {
        address
      }
      ratings
      services {
        _id
        service_name
        description
        pricing
      }
      reviews {
        _id
        user {
          username
        }
        rating
        comment
      }
    }
  }
`;
export const GET_BOOKING_COUNTS = gql`
  query GetBookingCounts($userId: ID) {
    getBookingCounts(userId: $userId) {
      totalBookings
      upcomingBookings
    }
  }
`;
export const FETCH_USER_PROFILE = gql`
  query FetchUserProfile($id: ID!) {
  fetchUserProfile(id: $id) {
    _id
    username
    email
    phone_number
    address {
      street
      city
      state
      zip_code
    }
    role
    created_at
    updated_at
  }
}
`;
export const MODIFY_USER_PROFILE = gql`
  mutation ModifyUserProfile(
    $id: ID!
    $username: String
    $email: String
    $phone_number: String
    $address: AddressInput
    $password: String
  ) {
    modifyUserProfile(
      id: $id
      username: $username
      email: $email
      phone_number: $phone_number
      address: $address
      password: $password
    ) {
      _id
      username
      email
      phone_number
      address {
        street
        city
        state
        zip_code
      }
    }
  }
`;
export const FETCH_USER_BOOKING_HISTORY = gql`
  query FetchUserBookingHistory($userId: ID!) {
    fetchUserBookingHistory(userId: $userId) {
      _id
      booking_services {
        service_id {
          service_name
        }
      }
      status
      created_at
    }
  }
`;