import { Schema, model, Document } from 'mongoose';

const ExchangesSchema = new Schema({
  exchangeId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { collection: 'exchanges' });

export default model<IExchange>('exchanges', ExchangesSchema);

export interface IExchange extends Document {
  _id: Schema.Types.ObjectId;
  exchangeId: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}