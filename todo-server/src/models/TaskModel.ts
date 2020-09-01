import {Schema, model, Types} from "mongoose";


const TaskSchema = new Schema({
    name: String,
    groupId: String,
    subtasks: [{
        type: Types.ObjectId,
        ref: "Subtasks"
    }]
})

export default model("Tasks", TaskSchema);