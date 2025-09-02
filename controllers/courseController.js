import Course from "../models/courseModel.js";

// Récupérer tous les cours
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récuperer un cours par ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Creation d'un cours
export const createCourse = async (req, res) => {
  try {
    const { title, category, price } = req.body;
    const newCourse = await Course.create({ title, category, price });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mise à jour d'un cours
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Course.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: "Course not found" });
    const updatedCourse = await Course.findByPk(id);
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// suppression d'un cours
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Course.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};