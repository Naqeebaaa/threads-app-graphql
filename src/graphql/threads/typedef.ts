export const typedefs = `#graphql
  type Thread {
    id: ID!
    content: String!
    authorId: String!
    author: User!
    createdAt: String!
    updatedAt: String!
  }
`;