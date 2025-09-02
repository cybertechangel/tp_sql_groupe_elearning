import db from "../config/db.js";


export const getAllEnrollments = async () => {
  const [rows] = await db.promise().query('SELECT * FROM enrollments');
  return rows;
};

export const createEnrollment = async (userId, courseId) => {
  const [result] = await db.promise().query(
    'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
    [userId, courseId]
  );
  return result;
};

export const getEnrollmentById = async (id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM enrollments WHERE id = ?',
    [id]
  );
  return rows[0];
};


export const updateEnrollment = async (id, userId, courseId) => {
  const [result] = await db.promise().query(
    'UPDATE enrollments SET user_id = ?, course_id = ? WHERE id = ?',
    [userId, courseId, id]
  );
  return result;
};

export const deleteEnrollment = async (id) => {
  const [result] = await db.promise().query(
    'DELETE FROM enrollments WHERE id = ?',
    [id]
  );
  return result;
};

export const completeEnrollment = async (id) => {
  const [result] = await db.promise().query(
    'UPDATE enrollments SET completed = 1, completed_at = CURRENT_TIMESTAMP WHERE id = ?',
    [id]
  );
  return result;
};


export const setEnrollmentCompletion = async (id, completed) => {
  const [result] = await db.promise().query(
    'UPDATE enrollments SET completed = ?, completed_at = CURRENT_TIMESTAMP WHERE id = ?',
    [completed, id]
  );
  return result;
};


export const getEnrollmentsCountByCourse = async () => {
  const [rows] = await db.promise().query(`
    SELECT course_id, COUNT(user_id) AS nb_inscriptions
    FROM enrollments
    GROUP BY course_id
  `);
  return rows;
};


export const getCompletionRateByCourse = async () => {
  const [rows] = await db.promise().query(`
    SELECT course_id, ROUND(SUM(completed) * 100.0 / COUNT(*), 2) AS completion_rate
    FROM enrollments
    GROUP BY course_id
  `);
  return rows;
};