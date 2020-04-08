import { ApolloServer, gql } from 'apollo-server';
import { connect } from 'mongoose';
import { config } from 'dotenv';

config();
const typeDefs = gql`
  type Query {
    info: String!
  }
`;

const resolvers = {
  Query: {
    info: () => 'Basic',
  },
};

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
