import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";

//import User Context
import { UserProvider } from "./hooks/userContext";
import { ProgressionProvider } from "./hooks/progressionContext";

import Constants from "expo-constants";
import { ApolloClient } from "apollo-client";
import { ApolloProvider, graphql } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import Navigation from "./navigation";

const App = () => {
  const [areApiLoaded, setAreApiLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [progression, setProgression] = useState(null);

  useEffect(() => {
    connectApi();
  }, []);

  const connectApi = async () => {
    const { API_GRAPHQL_URL_ENDPOINT } = Constants.manifest.extra;

    // initialize our graphQL client
    this.clientGraphQL = new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              )
            );
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        new HttpLink({
          uri: API_GRAPHQL_URL_ENDPOINT,
          credentials: "same-origin"
        })
      ]),
      cache: new InMemoryCache()
    });
    setAreApiLoaded(true);
  };

  return areApiLoaded ? (
    <ApolloProvider client={this.clientGraphQL}>
      <UserProvider value={{ user, setUser }}>
        <ProgressionProvider value={{ progression, setProgression }}>
          <Navigation />
        </ProgressionProvider>
      </UserProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
};

export default App;
