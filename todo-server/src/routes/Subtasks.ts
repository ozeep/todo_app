import express, { Request, Response } from "express";
import SubtaskModel from "../models/SubtaskModel";
import TaskModel from "../models/TaskModel";

const Subtasks = express.Router();

Subtasks.post("/", (req: Request, res: Response) => {
  let taskId = req.body.taskId;

  SubtaskModel.find({ taskId })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch(() => {
      res.status(500).json("error");
    });
});

Subtasks.put("/", (req: Request, res: Response) => {
  let _id = req.body.taskId;
  
  new SubtaskModel(req.body.subtask).save().then((subtask) => {

    TaskModel.findOne({_id}).then((task: any) => {

        task.subtasks.push(subtask);
        task.save().then((task: any)=>{
            console.log(task.populate("subtask"));
        });
    }).catch((error) => {
        res.status(500).json(error);
    });
  });

  
});

Subtasks.patch("/:id", (req: Request, res: Response) => {
  let _id = req.params.id;
  SubtaskModel.updateOne({ _id }, { ...req.body })
    .then((task) => {
      res.status(200).json(true);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

Subtasks.delete("/:id", (req: Request, res: Response) => {
  let _id = req.params.id;
  SubtaskModel.deleteOne({ _id })
    .then((task) => {
      res.status(200).json(true);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

export default Subtasks;
