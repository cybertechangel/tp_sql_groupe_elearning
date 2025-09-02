import { Router } from "express";
import { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse} from "../controllers/courseController.js";

const router = Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
app.js
app.use("/api/courses", courseRoutes);