import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import studentRoute from "./routes/route.js";

const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;

app.use(express.static(__dirname + "/client"));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + '/client/index.html');
});

//ROUTES
app.use("/students", studentRoute);

app.listen(PORT, () => {
  console.log("CONNECTED BACKEND SUCCESS", PORT);
});
