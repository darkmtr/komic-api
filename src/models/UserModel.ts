// eslint-disable-next-line no-unused-vars
import { model, Schema, Document, Types } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  email: string;
  confirmed: boolean;
  createdAt: Date;
  avatar: string;
  urlSlug: {
    id: Types.ObjectId;
    url: string;
    createdAt: string;
  };
}

interface IUserDoc extends Document, IUser {}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
  avatar: {
    type: String,
  },
  urlSlug: {
    required: true,
    type: Types.ObjectId,
    ref: 'USlug',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model<IUserDoc>('User', userSchema);

export default UserModel;
