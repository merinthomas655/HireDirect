import { gql } from '@apollo/client';

export const GET_SERVICES = gql`
  query GetServices {
    services {
      _id
      service_name
      description
      pricing
      category {
        _id
        category_name
      }
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService($id: ID!, $service_name: String!, $description: String!, $pricing: Float!, $category_id: ID) {
    updateService(id: $id, service_name: $service_name, description: $description, pricing: $pricing, category: $category_id) {
      _id
      service_name
      description
      pricing
      category {
        _id
      }
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id) {
      _id
    }
  }
`;
