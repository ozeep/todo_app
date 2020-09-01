import { Schema, model } from "mongoose";

const GroupSchema = new Schema({
  name: String,
  color: {
    hue: Number,
    saturation: Number,
    light: Number,
  },
});

export default model("Groups", GroupSchema);
