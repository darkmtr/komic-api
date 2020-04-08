// eslint-disable-next-line no-unused-vars
import { model, Schema, Document, Types } from 'mongoose';

export interface IPost extends Document {}

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
