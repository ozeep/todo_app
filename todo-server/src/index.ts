import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import settings from "./settings";

import Groups from "./routes/Groups";
import Tasks from "./routes/Tasks";
import Subtasks from "./routes/Subtasks";
import Gallery from "./routes/Gallery";
import User from "./routes/User";

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
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));

app.use(function (_, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use("/api/groups", Groups);
app.use("/api/tasks", Tasks);
app.use("/api/subtasks", Subtasks);
app.use("/api/gallery", Gallery);
app.use("/api/user", User);

app.listen(settings.PORT, () => {
	console.log("Server started!");
});
