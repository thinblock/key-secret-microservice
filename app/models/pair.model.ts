import { Schema, model, Document } from 'mongoose';

const PairsSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  },
  exchange_id: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { collection: 'pairs' });

export default model<IPair> ('pairs', PairsSchema);

export interface IPair extends Document {
  _id: Schema.Types.ObjectId;
  key: string;
  secret: string;
  exchange_id: number;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
}