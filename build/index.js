"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express5_1 = require("@as-integrations/express5");
async function init() {
    const app = (0, express_1.default)();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express_1.default.json()); // Middleware to parse JSON bodies
    //Create  Graphql Servet
    const gqlServer = new server_1.ApolloServer({
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
    app.use('/graphql', (0, express5_1.expressMiddleware)(gqlServer));
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}
init();
//# sourceMappingURL=index.js.map