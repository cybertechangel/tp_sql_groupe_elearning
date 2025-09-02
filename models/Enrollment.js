import db  from "../config/db.js";

export const getAllEnrollments = () => db.query('SELECT * FROM enrollments');
export const createEnrollment = (userId, courseId) => db.query('INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)', [userId, courseId]);
export const getEnrollmentById = (id) => db.query('SELECT * FROM enrollments WHERE id = ?', [id]);
export const updateEnrollment = (id, userId, courseId) => db.query('UPDATE enrollments SET user_id = ?, course_id = ? WHERE id = ?', [userId, courseId, id]);
export const deleteEnrollment = (id) => db.query('DELETE FROM enrollments WHERE id = ?', [id]);


export const completeEnrollment = (id) => 
    db.query('UPDATE enrollments SET completed = 1, completed_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);


export const setEnrollmentCompletion = (id, completed) => 
    db.query('UPDATE enrollments SET completed = ?, completed_at = CURRENT_TIMESTAMP WHERE id = ?', [completed, id]);

