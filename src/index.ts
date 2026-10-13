import express from "express";
import  createApolloGraphqlServer  from "./graphql";
import { expressMiddleware } from "@as-integrations/express5";
import UserService, { type CreateUserPayload,} from "./user/user";


async function init() {
const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json()); // Middleware to parse JSON bodies



app.get("/", (req, res) => {
  res.json({ message: "Server is up and running!" });
});



//we have to open a root route for the graphql server so that it can to the client
//it gives responses in json format so we gonna use body parser
app.use('/graphql', expressMiddleware(await createApolloGraphqlServer(), { 
  context: async ({req}) => {
    //@ts-ignore
  const token = req.headers["token"];
    console.log("Token received:", Boolean(token));

   try {
    const user = UserService.decodeJWTToken(token as string);
      console.log("JWT verified successfully");
    return { user }
   } catch (error) {    // if wrong token then just return , no such user exists
  console.error("JWT error:", error);
    return {};
   }
},
})
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
}
init();