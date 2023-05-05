import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import studentRoute from "./routes/route.js";

const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const publicPath = path.join(__dirname, "client");
app.use(express.static(publicPath));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

//ROUTES
app.use("/students", studentRoute);

app.listen(PORT, () => {
  console.log("CONNECTED BACKEND SUCCESS", PORT);
});
