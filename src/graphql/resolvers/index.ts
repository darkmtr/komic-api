import userResolver from './userResolver';

export default {
  Query: {
    info: () => 'Hi',
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};
