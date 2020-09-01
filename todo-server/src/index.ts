import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import Groups from "./routes/Groups";
import Tasks from "./routes/Tasks";
import Subtasks from "./routes/Subtasks";

mongoose.connect("mongodb://localhost/todo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const jsonParser = bodyParser.json();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(jsonParser);

app.use("/api/groups", Groups);
app.use("/api/tasks", Tasks);
app.use("/api/subtasks", Subtasks);

app.listen(3005, () => {
  console.log("Server started!");
});
