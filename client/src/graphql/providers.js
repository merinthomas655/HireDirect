import { gql } from '@apollo/client';

export const GET_PROVIDERS = gql`
  query {
    providers {
      _id
      user {
        _id
        username
        email
      }
      bio
      location {
        latitude
        longitude
        address
      }
      image
      ratings
    }
  }
`;

export const UPDATE_PROVIDER = gql`
  mutation UpdateProvider($id: ID!, $bio: String, $location: LocationInput, $image: String, $ratings: Float) {
    updateProvider(id: $id, bio: $bio, location: $location, image: $image, ratings: $ratings) {
      _id
      bio
      location {
        latitude
        longitude
        address
      }
      image
      ratings
    }
  }
`;


export const DELETE_PROVIDER = gql`
  mutation DeleteProvider($id: ID!) {
    deleteProvider(id: $id) {
      _id
    }
  }
`;
