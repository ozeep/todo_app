import express, { Request, Response } from "express";

const Groups = express.Router();

Groups.get("/", (req: Request, res: Response) => {
  console.log("router works!");
  res.send("<h1>Hello world</h1>");
});

//Groups.put

//Groups.patch

////Groups.delete

export default Groups;
