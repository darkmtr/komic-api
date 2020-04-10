import { gql } from 'apollo-server';

export default gql`
  type Query {
    info: String!
  }

  type Mutation {
    createAccount(userDetails: createAccountInput): Status!
    confirmEmail(token: String!): Status!
    deleteAccount: Status!
    login(username: String!, password: String!): AuthObject!
    createClan(name: String!, clanSlug: String!): Clan!
  }

  type Clan {
    id: ID!
    name: String!
    createdAt: String!
    clanSlug: URLSlug!
    moderators: [User!]!
  }

  input createAccountInput {
    username: String!
    password: String!
    url: String!
    email: String!
  }

  type URLSlug {
    id: ID!
    url: String!
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
    confirmed: Boolean!
    createdAt: String!
    urlSlug: URLSlug!
    avatar: String!
  }

  type Post {
    id: ID!
  }

  type Profile {
    id: ID!
    posts: [Post!]!
    user: User!
    createdAt: String!
  }
  type AuthObject {
    token: String!
    profile: Profile!
  }

  type Status {
    code: String!
    message: String!
  }
`;
