import { gql } from '@apollo/client';

export const GET_SERVICES = gql`
  query GetServices {
    services {
      _id
      service_name
      description
      provider {
        _id
        user {
          username
        }
        location {
          address
        }
        bio
      }
      ratings
      imageUrl
      category {
        _id
        category_name
      }
    }
    categories {
      _id
      category_name
    }
  }
`;
