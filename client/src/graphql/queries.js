import { gql } from '@apollo/client';

<<<<<<< HEAD
export const GET_SERVICES = gql`
  query GetServices {
    services {
      _id
      service_name
      description
      provider {
=======
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
>>>>>>> a369fb80bbb1b9702c25be3aac8b71c10a01eb1b
        _id
        user {
          username
        }
<<<<<<< HEAD
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
=======
        rating
        comment
      }
>>>>>>> a369fb80bbb1b9702c25be3aac8b71c10a01eb1b
    }
  }
`;
