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
