import {Schema, model} from "mongoose";


const SubtaskSchema = new Schema({
    name: String,
    compleated: {
        type: Boolean,
        default: false
    }
})

export default model("Subtasks", SubtaskSchema);