import express, { Request, Response } from "express";
import GalleryModel from "../models/GalleryModel";
import TaskModel from "../models/TaskModel";
import mongoose from "mongoose";
import multer from "multer";
import settings from "../settings";
import { v2 as cloudinary } from "cloudinary";

const Gallery = express.Router();

const storage = multer.diskStorage({
	filename: function (_, file, callback) {
		callback(null, file.originalname);
	},
});

const imageFilter = function (req: any, file: any, cb: any) {
	// accept image files only
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
		return cb(new Error("Only image files are accepted!"), false);
	}
	cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

cloudinary.config({
	cloud_name: "ozeep",
	api_key: settings.CLOUDINARY_KEY,
	api_secret: settings.CLOUDINARY_SECRET,
});

Gallery.post("/", (req: Request, res: Response) => {
	let taskId = req.body.taskId;

	GalleryModel.find({ taskId })
		.then((gallery) => {
			res.json(gallery);
		})
		.catch(() => {
			res.status(500).json("error");
		});
});

Gallery.put("/", upload.single("image"), (req: Request, res: Response) => {
	let _id = req.body.taskId;

	cloudinary.uploader.upload(req.file.path, (err: any, result: any) => {
		if (err) {
			res.status(500).json(err.message);
		}

		GalleryModel.create({
			url: result.secure_url,
			name: result.original_filename,
		}).then((gallery) => {
			TaskModel.findOne({ _id })
				.then((task: any) => {
					task.gallery.unshift(gallery);
					task.save().then((task: mongoose.Document) => {
						task.populate("gallery").populate("subtasks", (_, doc: any) => {
							res.status(200).json(doc);
						});
					});
				})
				.catch((error) => {
					res.status(500).json(error);
				});
		});
	});
});

Gallery.patch("/", (req: Request, res: Response) => {
	let _id = req.body.subtask._id;

	GalleryModel.updateOne({ _id }, { ...req.body.subtask })
		.then(() => {
			res.json(true);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

Gallery.delete("/", (req: Request, res: Response) => {
	let _id = req.query;

	GalleryModel.deleteOne({ _id })
		.then((task) => {
			res.status(200).json(true);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

export default Gallery;
