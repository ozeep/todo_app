import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	groups: {
		type: Types.ObjectId,
		ref: "Groups",
	},
});

export default model("Users", UserSchema);
