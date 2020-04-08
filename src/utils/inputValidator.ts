import { validate } from 'email-validator';

// eslint-disable-next-line no-unused-vars
import { ICreateAccountArgs } from '../graphql/resolvers/userResolver';

export function validateInput(args: ICreateAccountArgs) {
  interface Error {
    msg: string;
    field: string;
  }

  const errors: Array<Error> = [];

  const { email, password, url, username } = args.userDetails;

  if (!validate(email) || !email)
    errors.push({ msg: 'Invalid Email.', field: 'email' });
  if (!password || password.length < 6)
    errors.push({
      msg: 'Password Should be atleast 6 characters long.',
      field: 'password',
    });
  if (!url) errors.push({ msg: 'No URL Provided.', field: 'url' });
  if (!username)
    errors.push({ msg: 'No Username Provided.', field: 'username' });

  return errors;
}
