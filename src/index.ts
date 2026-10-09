import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

async function init() {
const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json()); // Middleware to parse JSON bodies

//Create  Graphql Servet
const gqlServer = new ApolloServer({
  typeDefs: `
    type Query {
      hello: String
      say(name: String): String
    }
  `,
  resolvers: {
    Query: {
      hello: () => `Hey there, I am graphql server`,
      say: (_, { name }) => `Hey ${name}, How are you?`,
    },
  },
});
//start the gql server
await gqlServer.start();

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running!" });
});

//we have to open a root route for the graphql server so that it can to the client
//it gives responses in json format so we gonna use body parser
app.use('/graphql', expressMiddleware(gqlServer));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
}
init();