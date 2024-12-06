const API_URL = 'http://localhost:5000/graphql';

export const CheckEmailID = `
mutation CheckEmailID($email: String!) {
  checkEmailID(email: $email) {
    user_id
    message
    success
  }
}
`;


export const UserLogin = `
mutation UserLogin($userId: String!, $newPassword: String!){
  forgotPassword(userId: $userId, newPassword: $newPassword) {
    message
    success
  }
}
`;

export const callGraphQL = async (query, variables = {}) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message || 'Something went wrong');
    }

    return result.data;
  } catch (error) {
    console.error('GraphQL API Error:', error);
    throw error;
  }
};
