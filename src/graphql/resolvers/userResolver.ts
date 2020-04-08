// import jwt from "jsonwebtoken";
import { hash } from 'bcryptjs';
import { UserInputError, ApolloError } from 'apollo-server';
import { sign, verify } from 'jsonwebtoken';

import UserModel from '../../models/UserModel';
import urlSlugModel from '../../models/UrlSlug';
import profileModel from '../../models/profileModel';
import { validateInput } from '../../utils/inputValidator';
import { IAuthPayload } from '../../utils/authPayload';
import { sendMail } from '../../utils/email';

export interface ICreateAccountArgs {
  userDetails: {
    username: string;
    password: string;
    email: string;
    url: string;
  };
}

export interface IconfirmEmailArgs {
  token;
}

export default {
  Mutation: {
    createAccount: async (_, args: ICreateAccountArgs) => {
      const errors = validateInput(args);

      if (errors.length > 0) {
        throw new UserInputError('Error', {
          errors,
        });
      }

      try {
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

        const payload: IAuthPayload = {
          user: {
            id: user._id,
          },
        };

        const token = sign(payload, process.env.EMAIL_CONFIRM_SECRET, {
          expiresIn: '7d',
        });

        sendMail({ token, email });

        return {
          code: 200,
          message: 'Success',
        };
      } catch (err) {
        throw new ApolloError('Internal Server Error', err);
      }
    },
    confirmEmail: async (_, args: IconfirmEmailArgs) => {
      const token = args.token;

      try {
        const decoded = verify(token, process.env.EMAIL_CONFIRM_SECRET);

        const user = await UserModel.findById(
          (decoded as IAuthPayload).user.id
        );
        if (!user) throw new UserInputError('User Not Found');

        user.confirmed = true;
        await user.save();

        return {
          code: 200,
          message: 'Success',
        };
      } catch (err) {
        console.log(err);
      }
    },
  },
};
