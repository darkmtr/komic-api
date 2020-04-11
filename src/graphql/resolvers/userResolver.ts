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
import { verifyUserToken } from '../../utils/authenticateUser';
import { IVerfiyUser } from '../../utils/authenticateUser';

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
  Query: {
    checkUserSlugAvailability: async (_, args) => {
      const url = args.url;

      const uslug = await urlSlugModel.findOne({ url });
      if (uslug) return { code: 200, message: ' User Slug Not Available' };

      return { code: 200, message: 'User Slug Available' };
    },
  },
  Mutation: {
    createAccount: async (_, args: ICreateAccountArgs) => {
      const errors = validateInput(args);

      if (Object.keys(errors).length > 0) {
        throw new UserInputError('Error', {
          errors,
        });
      }

      const { email, password, url, username } = args.userDetails;

      let user = await UserModel.findOne({ email });
      if (user)
        throw new UserInputError('User with email already exists', {
          errors: {
            email: {
              msg: 'User with email already exists',
              field: 'email',
            },
          },
        });
      user = await UserModel.findOne({ username });
      if (user)
        throw new UserInputError('Username is taken', {
          errors: {
            username: {
              msg: 'Username is already taken',
              field: 'username',
            },
          },
        });

      let slug = await urlSlugModel.findOne({ url });
      if (slug)
        throw new UserInputError('URL is not available', {
          errors: {
            email: {
              msg: 'Url is not available',
              field: 'url',
            },
          },
        });

      try {
        user = new UserModel();
        user.username = username;
        user.email = email;
        user.password = await hash(password, parseInt(process.env.SALT));

        slug = new urlSlugModel();
        slug.url = url;

        await slug.save();
        user.urlSlug = slug._id;
        user.avatar = `https://api.adorable.io/avatars/250/${username}@adorable.png`;
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

        // sendMail({ token, email });

        return {
          code: 200,
          message: 'Success',
        };
      } catch (err) {
        console.log(err);
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
    deleteAccount: async (_, __, context) => {
      const decodedUser: IVerfiyUser = verifyUserToken(context);

      const { id } = decodedUser;
      const user = await UserModel.findById(id);

      if (!user) throw new UserInputError('User not found');

      const profile = await profileModel.findOne({ user: user._id });

      const slug = await urlSlugModel.findById(user.urlSlug);

      await profile.remove();
      await slug.remove();
      await user.remove();

      return {
        code: 200,
        message: 'Success',
      };
    },
  },
};
