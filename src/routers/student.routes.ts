import { Router } from "express";
import { getStudents, getStudentById, addStudent, updateStudent, deleteStudent } from "../controllers/student.controller";

const router = Router();

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
