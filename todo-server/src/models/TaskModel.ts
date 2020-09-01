import {Schema, model} from "mongoose";


const TaskSchema = new Schema({
    name: String,
    groupId: String, 
})

export default model("Tasks", TaskSchema);