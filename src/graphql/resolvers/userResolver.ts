// import jwt from "jsonwebtoken";
import { hash } from 'bcryptjs';

import UserModel from '../../models/UserModel';
import { UserInputError } from 'apollo-server';
import urlSlugModel from '../../models/UrlSlug';
import profileModel from '../../models/profileModel';
import { validateInput } from '../../utils/inputValidator';

export interface ICreateAccountArgs {
  userDetails: {
    username: string;
    password: string;
    email: string;
    url: string;
  };
}

export default {
  Mutation: {
    createAccount: async (_, args: ICreateAccountArgs) => {
      const errors = validateInput(args);

      if (Object.keys(errors.err).length > 0) {
        console.log(errors.err);
        throw new UserInputError('Error');
      }

      const { email, password, url, username } = args.userDetails;

      let user = await UserModel.findOne({ email });
      if (user) throw new UserInputError('User with email already exists');
      user = await UserModel.findOne({ username });
      if (user) throw new UserInputError('Username is taken');

      let slug = await urlSlugModel.findOne({ url });
      if (slug) throw new UserInputError('URL is not available');

      user = new UserModel();
      user.username = username;
      user.email = email;
      user.password = await hash(password, parseInt(process.env.SALT));

      slug = new urlSlugModel();
      slug.url = url;

      await slug.save();
      user.urlSlug = slug._id;

      await user.save();

      const profile = new profileModel();
      profile.user = user._id;

      await profile.save();

      (user.urlSlug as any) = slug;
      (profile.user as any) = user;

      return {
        token: 'token',
        profile,
      };
    },
  },
};
