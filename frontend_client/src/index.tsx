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

const APIURL = "https://api.thegraph.com/subgraphs/name/przemo246/nft-padlock";

const client = new ApolloClient({
  uri: APIURL,
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
