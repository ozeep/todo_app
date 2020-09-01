import express, { Request, Response } from "express";
import TaskModel from "../models/TaskModel";

const Tasks = express.Router();

Tasks.post("/", (req: Request, res: Response) => {
  let groupId = req.body.groupId;

  TaskModel.find({ groupId }).populate("subtasks")
    .then((tasks) => {
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

Tasks.patch("/:id", (req: Request, res: Response) => {
  let _id = req.params.id;
  TaskModel.updateOne({ _id }, { ...req.body })
    .then((task) => {
      res.status(200).json(true);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

Tasks.delete("/:id", (req: Request, res: Response) => {
  let _id = req.params.id;
  TaskModel.deleteOne({ _id })
    .then((task) => {
      res.status(200).json(true);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

export default Tasks;
