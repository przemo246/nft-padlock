import React from "react";

import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { DAppProvider } from "@usedapp/core";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./styles.css";

import { useDappConfig } from "./useDappConfig";

const container = document.getElementById("root")!;
const root = createRoot(container);

const client = new ApolloClient({
  uri: process.env.REACT_APP_SUBGRAPH_API_URL,
  cache: new InMemoryCache()
});

root.render(
  <React.StrictMode>
    <DAppProvider config={useDappConfig}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </DAppProvider>
  </React.StrictMode>
);
