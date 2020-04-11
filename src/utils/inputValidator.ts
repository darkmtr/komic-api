import { validate } from 'email-validator';

// eslint-disable-next-line no-unused-vars
import { ICreateAccountArgs } from '../graphql/resolvers/userResolver';
import { ICreateClanArgs } from '../graphql/resolvers/clanResolver';

interface Error {
  msg: string;
  field: string;
}

interface ErrorObject {
  username?: Error;
  password?: Error;
  url?: Error;
  email?: Error;
}

export function validateInput(args: ICreateAccountArgs) {
  const errors: ErrorObject = {};

  const { email, password, url, username } = args.userDetails;

  if (!validate(email) || !email)
    errors.email = { msg: 'Invalid Email.', field: 'email' };
  if (!password || password.length < 6)
    errors.password = {
      msg: 'Password Should be atleast 6 characters long.',
      field: 'password',
    };
  if (!url) errors.url = { msg: 'No URL Provided.', field: 'url' };
  if (!username)
    errors.username = { msg: 'No Username Provided.', field: 'username' };

  return errors;
}

export function validateCreateClanInput(args: ICreateClanArgs) {
  const errors: Array<Error> = [];

  const { clanSlug, name } = args;

  if (!name.length)
    errors.push({ msg: 'No Clan Name Provided', field: 'name' });
  if (!clanSlug.length)
    errors.push({ msg: 'No clanSlug Provided', field: 'clanSlug' });

  return errors;
}
