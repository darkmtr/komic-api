import userResolver from './userResolver';
import authResolver from './authResolver';

export default {
  Query: {
    info: () => 'Hi',
  },
  Mutation: {
    ...userResolver.Mutation,
    ...authResolver.Mutation,
  },
};
