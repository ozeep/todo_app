import { Schema, model, Types } from "mongoose";

const TaskSchema = new Schema({
  name: String,
  groupId: String,
  description: String,
  subtasks: [
    {
      type: Types.ObjectId,
      ref: "Subtasks",
    },
  ],
  gallery: [
    {
      type: Types.ObjectId,
      ref: "Gallery",
    },
  ],
});

export default model("Tasks", TaskSchema);
