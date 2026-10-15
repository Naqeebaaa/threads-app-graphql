export const queries = `#graphql
  threads(limit: Int, cursor: ID): [Thread!]!
`;