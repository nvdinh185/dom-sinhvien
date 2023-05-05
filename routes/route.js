import express from "express";
const router = express.Router();
import studentController from "../controllers/studentController.js";

router.get("/", studentController.getStudents);
router.post("/", studentController.createStudent);
router.delete("/:id", studentController.deleteStudent);
router.put("/:id", studentController.updateStudent);

export default router;
