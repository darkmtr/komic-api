import { validate } from 'email-validator';

// eslint-disable-next-line no-unused-vars
import { ICreateAccountArgs } from '../graphql/resolvers/userResolver';

export function validateInput(args: ICreateAccountArgs) {
  interface Error {
    msg: string;
  }

  interface Errors {
    email?: Error;
    password?: Error;
    url?: Error;
    username?: Error;
  }

  const err: Errors = {};

  const { email, password, url, username } = args.userDetails;

  if (!validate(email) || !email) err.email = { msg: 'Invalid Email' };
  if (!password || password.length < 6)
    err.password = {
      msg: 'Password must be atleast 6 characters long or No password given',
    };
  if (!url) err.url = { msg: 'No URL Given' };
  if (!username) err.username = { msg: 'Username not given' };

  return {
    err,
  };
}
