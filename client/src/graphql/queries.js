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
