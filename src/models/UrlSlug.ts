// eslint-disable-next-line no-unused-vars
import { model, Schema, Document, Types } from 'mongoose';

export interface IURLSlug extends Document {
  url: string;
}

const urlSlugSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const urlSlugModel = model<IURLSlug>('USlug', urlSlugSchema);

export default urlSlugModel;
