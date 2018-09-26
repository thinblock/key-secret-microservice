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
  exchangeId: {
    type: Number,
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
  exchangeId: number;
  created_at?: Date;
  updated_at?: Date;
}