import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Thread } from "./threads"

async function  createApolloGraphqlServer() {
//Create  Graphql Servet
const gqlServer = new ApolloServer({
  typeDefs: `
   ${User.typedefs}
   ${Thread.typedefs}
    type Query {
     ${User.queries}
     ${Thread.queries}
    
    }
      type Mutation {
         ${User.mutations}
         ${Thread.mutations}
}
      `, //Schema
  resolvers: {
    Query: { 
      ...User.resolvers.queries,
      ...Thread.resolvers.queries,
    },  
    Mutation: {
      ...User.resolvers.mutations,
      ...Thread.resolvers.mutations,
    },
  },
});
//start the gql server
await gqlServer.start();

return gqlServer;
}
export default createApolloGraphqlServer;