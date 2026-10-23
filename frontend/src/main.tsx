import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { App } from "./App";
import { client } from "./graphql/client";
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
        <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
);
