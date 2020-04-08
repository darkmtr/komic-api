/* eslint-disable no-unused-vars */
import { model, Schema, Document, Types } from 'mongoose';
import { IUser } from './UserModel';

interface IProfileDoc extends Document {
  posts: Array<string>;
  user: IUser;
  createdAt: Date;
}

const profileSchema = new Schema({
  posts: [
    {
      type: Types.ObjectId,
      ref: 'Post',
    },
  ],
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const profileModel = model<IProfileDoc>('Profile', profileSchema);

export default profileModel;
