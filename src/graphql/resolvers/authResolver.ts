import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { AuthenticationError } from 'apollo-server';

import User, { IUser } from '../../models/UserModel';
import { IAuthPayload } from '../../utils/authPayload';
import profileModel from '../../models/profileModel';
import urlSlugModel from '../../models/UrlSlug';
import { IProfileDoc } from '../../models/profileModel';

interface ILoginArgs {
  username: string;
  password: string;
}

interface ILoginReturn {
  token: string;
  profile: IProfileDoc;
}

const generateAuthToken = (id: string) => {
  const payload: IAuthPayload = {
    user: {
      id,
    },
  };
  return sign(payload, process.env.JWT_AUTH_SECRET, { expiresIn: '3d' });
};

export default {
  Mutation: {
    login: async (_, args: ILoginArgs): Promise<ILoginReturn> => {
      const { username, password } = args;

      const user = await User.findOne({ username });

      if (!user) throw new AuthenticationError('Invalid Username or password');

      const isMatch: Promise<boolean> = compare(password, user.password);

      if (!isMatch)
        throw new AuthenticationError('Invalid Username or password');

      const token = generateAuthToken(user._id);
      const profile = await profileModel
        .findOne({ user: user._id })
        .populate('user');
      const urlSlug = await urlSlugModel.findById(profile.user.urlSlug);
      (profile.user.urlSlug as any) = urlSlug;
      return {
        token,
        profile,
      };
    },
  },
};
