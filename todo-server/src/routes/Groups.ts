import express, { Request, Response } from "express";
import GroupModel from "../models/GroupModel";
import TaskModel from "../models/TaskModel";
import SubtaskModel from "../models/SubtaskModel";
import GalleryModel from "../models/GalleryModel";

const Groups = express.Router();

Groups.post("/", (req: Request, res: Response) => {
	let userId = req.body.userId;

	GroupModel.find({ userId })
		.then((groups) => {
			res.json(groups.reverse());
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

Groups.put("/", (req: Request, res: Response) => {
	let group = req.body;
	new GroupModel(group)
		.save()
		.then((group) => {
			res.json(group);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

Groups.patch("/", (req: Request, res: Response) => {
	let _id = req.body._id;
	console.log(req.body);
	GroupModel.updateOne({ _id }, { ...req.body })
		.then(() => {
			res.status(200).json(true);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

Groups.delete("/", (req: Request, res: Response) => {
	let _id = req.query;

	GroupModel.deleteOne({ _id })
		.then(() => {
			TaskModel.find({ groupId: _id }, (_, doc) => {
				doc.forEach((task: any) => {
					task.subtasks.forEach((_id: string) => {
						SubtaskModel.deleteOne({ _id }).then(() => {});
					});
					task.gallery.forEach((_id: string) => {
						GalleryModel.deleteOne({ _id }).then(() => {});
					});
					task.remove();
				});
				res.status(200).json(true);
			});
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

export default Groups;
