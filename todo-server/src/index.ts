import express from "express";
import mongoose from "mongoose";
import GroupModel from "./models/GroupModel";
import bodyParser from "body-parser";
import cors from "cors";

import Groups from "./routes/Groups";
import Tasks from "./routes/Tasks";

mongoose.connect("mongodb://localhost/todo_app", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const jsonParser = bodyParser.json();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(jsonParser);

app.use("/api/groups", Groups);
app.use("/api/tasks", Tasks);

const group = new GroupModel({
  name: 'Group',
  color: {
    hue: 192,
    saturation: 20,
    light: 54
  }
});

//group.save();

app.listen(3005, () => {
  console.log("Server started!");
});
