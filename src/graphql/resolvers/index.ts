import userResolver from './userResolver';
import authResolver from './authResolver';
import clanResolver from './clanResolver';

export default {
  Query: {
    info: () => 'Hi',
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...authResolver.Mutation,
    ...clanResolver.Mutation,
  },
};
