import express from "express";
import Groups from "./routes/Groups";

const app = express();

app.use("/groups", Groups);

app.listen(3005, () => {
  console.log("Server started!");
});
