import express, { Request, Response } from "express";
import GroupModel from "../models/GroupModel";

const Groups = express.Router();

Groups.post("/", (req: Request, res: Response) => {
  GroupModel.find()
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
      res.status(200).json(true);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

export default Groups;
