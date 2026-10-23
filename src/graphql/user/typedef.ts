//this is schema for the user model in graphql

export const typedefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String
    username: String
    email: String!
    profileImageURL: String
  }
`;
