import { Mongoose } from "mongoose";
import { Schema, model } from "mongoose";

const GalleryModel = new Schema({
  url: {
    type: String,
    required: true,
  },
  name: String,
});

export default model("Gallery", GalleryModel);
