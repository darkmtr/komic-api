import userResolver from './userResolver';
import authResolver from './authResolver';
import clanResolver from './clanResolver';

export default {
  Query: {
    info: () => 'Hi',
  },
  Mutation: {
    ...userResolver.Mutation,
    ...authResolver.Mutation,
    ...clanResolver.Mutation,
  },
};
