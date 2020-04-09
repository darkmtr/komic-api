import { model, Schema, Types, Document } from 'mongoose';
import { IUser } from './UserModel';

interface IClanSlug extends Document {
  url: string;
  createdAt: string;
}

const clanSlugSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const clanSlugModel = model<IClanSlug>('CSlug', clanSlugSchema);

interface IClanDoc extends Document {
  name: string;
  clanSlug: {
    url: string;
    createdAt: string;
  };
  owner: IUser;
  moderators: [IUser];
}

const clanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  clanSlug: {
    type: Types.ObjectId,
    ref: 'CSlug',
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
  moderators: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const clanModel = model<IClanDoc>('Clan', clanSchema);

export default clanModel;
