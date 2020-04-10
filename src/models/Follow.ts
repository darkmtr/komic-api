import { model, Types, Document, Schema } from 'mongoose';
import { IUser } from './UserModel';
import { IClan } from './Clan';

interface IFollowDoc extends Document {
  user: IUser;
  clan: IClan;
}

const followSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
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

const Follow = model<IFollowDoc>('Follow', followSchema);

export default Follow;
