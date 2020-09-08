import express, { Request, Response } from "express";
import TaskModel from "../models/TaskModel";
import SubtaskModel from "../models/SubtaskModel";
import GalleryModel from "../models/GalleryModel";

const Tasks = express.Router();

Tasks.post("/", (req: Request, res: Response) => {
	let groupId = req.body.groupId;

	TaskModel.find({ groupId })
		.populate("subtasks")
		.populate("gallery")
		.then((tasks: any) => {
			res.json(tasks);
		})
		.catch(() => {
			res.status(500).json("error");
		});
});

Tasks.put("/", (req: Request, res: Response) => {
	let task = req.body;

	new TaskModel(task)
		.save()
		.then((task) => {
			res.json(task);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

Tasks.patch("/", (req: Request, res: Response) => {
	let _id = req.body.task._id;

	TaskModel.updateOne({ _id }, { ...req.body.task })
		.then(() => {
			res.status(200).json(true);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

Tasks.delete("/", (req: Request, res: Response) => {
	let _id = req.query;
	TaskModel.findOne({ _id })
		.then((task: any) => {
			task.subtasks.forEach((_id: string) => {
				SubtaskModel.deleteOne({ _id }).then(() => {});
			});
			task.gallery.forEach((_id: string) => {
				GalleryModel.deleteOne({ _id }).then(() => {});
			});
			task.remove();
			res.status(200).json(true);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

export default Tasks;
