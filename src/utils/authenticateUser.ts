// import { Request  } from 'apollo-server';
import { verify } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export interface IVerfiyUser {
  id: string;
}

interface IDecodedToken {
  user: {
    id: string;
  };
  iat: Date;
  exp: Date;
}

export const verifyUserToken = (context): IVerfiyUser => {
  const req = context.req;
  const token = req.headers['authorization'];
  if (!token) throw new AuthenticationError('No Token Provided');

  const isValidToken: any = verify(token, process.env.JWT_AUTH_SECRET);

  if (!isValidToken) throw new AuthenticationError('Invalid Token Provided');

  const id = isValidToken.user.id;
  return {
    id,
  };
};
