import React from 'react';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

const link = new HttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default function ClientProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
