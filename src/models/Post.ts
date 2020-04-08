// eslint-disable-next-line no-unused-vars
import { model, Schema, Document, Types } from 'mongoose';
import { IUser } from './UserModel';

interface IPost extends Document {
  user: IUser;
  title: string;
  description: string;
  imageUrl: string;
  upvotes: number;
  comment: Array<any>;
}

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
  comment: [
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

const postModel = model<IPost>('Post', postSchema);

export default postModel;
