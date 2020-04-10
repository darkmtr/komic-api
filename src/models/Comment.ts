// eslint-disable-next-line no-unused-vars
import { model, Schema, Document, Types } from 'mongoose';
import { IPost } from './Post';
import { IUser } from './UserModel';

interface IComment {
  post: IPost;
  text: string;
  upvotes: number;
  createdAt: string;
  user: IUser;
}

interface ICommentDoc extends Document, IComment {}

interface IReply {
  user: IUser;
  comment: IComment;
  text: string;
  upvotes: number;
  createdAt: string;
}

interface IReplyDoc extends Document, IReply {}

const replySchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  comment: {
    type: Types.ObjectId,
    ref: 'Comment',
  },
  text: {
    type: String,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const replyModel = model<IReplyDoc>('Reply', replySchema);

const commentSchema = new Schema({
  post: {
    type: Types.ObjectId,
    ref: 'Post',
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentModel = model<ICommentDoc>('Comment', commentSchema);

export default commentModel;
