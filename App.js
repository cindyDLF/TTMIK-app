import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";

import Constants from "expo-constants";
import { ApolloClient } from "apollo-client";
import { ApolloProvider, graphql } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import Navigation from "./navigation";

class App extends React.Component {
  state = {
    areFontsLoaded: false
  };
  async componentDidMount() {
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
    this.setState({ areFontsLoaded: true });
  }
  render() {
    return this.state.areFontsLoaded ? (
      <ApolloProvider client={this.clientGraphQL}>
        <Navigation />
      </ApolloProvider>
    ) : (
      <AppLoading />
    );
  }
}

export default App;
