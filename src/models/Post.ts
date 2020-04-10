// eslint-disable-next-line no-unused-vars
import { model, Schema, Document, Types } from 'mongoose';
import { IUser } from './UserModel';

export interface IPost {
  user: IUser;
  title: string;
  description: string;
  imageUrl: string;
  upvotes: number;
  comment: Array<any>;
}

interface IPostDoc extends Document, IPost {}

const postSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: Types.ObjectId,
      ref: 'Comment',
    },
  ],
  clan: {
    type: Types.ObjectId,
    ref: 'Clan',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postModel = model<IPostDoc>('Post', postSchema);

export default postModel;
