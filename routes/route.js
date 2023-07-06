import express from "express";
const router = express.Router();
import studentController from "../controllers/StudentController.js";

router.get("/", studentController.getStudents);
router.get("/:id", studentController.getAStudent);
router.post("/", studentController.createStudent);
router.delete("/:id", studentController.deleteStudent);
router.put("/:id", studentController.updateStudent);

export default router;
