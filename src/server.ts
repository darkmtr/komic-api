import { ApolloServer } from 'apollo-server';
import { connect } from 'mongoose';
import { config } from 'dotenv';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

config();
console.log();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  try {
    await connect(process.env.DB_URI, { useNewUrlParser: true });
  } catch (err) {
    console.log('Failed to connect to database.');
  }
  const { url } = await server.listen();
  console.log(`Server on : ${url}`);
})();
