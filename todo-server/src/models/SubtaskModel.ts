import { Schema, model, Types } from "mongoose";

const SubtaskSchema = new Schema({
	name: String,
	compleated: {
		type: Boolean,
		default: false,
	},
	task: {
		type: Types.ObjectId,
		ref: "Tasks",
	},
});

export default model("Subtasks", SubtaskSchema);
