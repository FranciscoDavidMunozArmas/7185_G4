import { Schema, model, Document } from "mongoose";

interface Sequence extends Document{
  uid: string,
  sequence_value: number
}

const schema = new Schema({
  uid: {
    type: String,
    unique: true,
    require: true
  },
  sequence_value: {
    type: Number,
    default: 1
  }
});

export default model<Sequence>("sequences", schema);