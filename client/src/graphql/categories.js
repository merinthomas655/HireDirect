import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      _id
      category_name
      description
      created_at
      updated_at
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($category_name: String!, $description: String) {
    createCategory(category_name: $category_name, description: $description) {
      _id
      category_name
      description
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $category_name: String!, $description: String) {
    updateCategory(id: $id, category_name: $category_name, description: $description) {
      _id
      category_name
      description
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      _id
    }
  }
`;
