import express, { Request, Response } from "express";
import GroupModel from "../models/GroupModel";

const Groups = express.Router();

Groups.get("/", (req: Request, res: Response) => {
  GroupModel.find({}).then((groups) => {
    res.json(groups);
  }).catch(()=>{
    res.status(500).json("error");
  })
});

Groups.put("/", (req: Request, res: Response) => {
  let group = req.body;
  GroupModel(group).save().then((group)=> {
    res.json(group);
  }).catch((error)=>{
    res.status(500).json(error);
  });
})

Groups.patch("/:id", (req: Request, res: Response) => {
  let _id = req.params.id;
  GroupModel.updateOne({_id}, {...req.body}).then((group) => {
    res.status(200).json(true);
  }).catch(error => {
    res.status(500).json(error);
  })
})

Groups.delete("/:id", (req: Request, res: Response) => {
  let _id = req.params.id;
  GroupModel.deleteOne({_id}).then((group) => {
    res.status(200).json(true);
  }).catch(error => {
    res.status(500).json(error);
  })
})

export default Groups;
