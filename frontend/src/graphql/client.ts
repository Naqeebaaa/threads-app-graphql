
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

const httpLink = new HttpLink({
  uri: "/graphql",
});

const authLink = new SetContextLink((previousContext) => ({
  headers: {
    ...previousContext.headers,
    ...(authToken ? { token: authToken } : {}),
  },
}));

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
