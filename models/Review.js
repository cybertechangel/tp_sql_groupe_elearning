import db from '../config/db.js';

// Trouve un avis par utilisateur et cours
export function findByUserAndCourse(userId, courseId) {
    return db.query(
        'SELECT * FROM reviews WHERE user_id=? AND course_id=? LIMIT 1',
        [userId, courseId]
    );
}

// Vérifie si un utilisateur est inscrit à un cours
export function isUserEnrolled(userId, courseId) {
    return db.query(
        'SELECT 1 FROM enrollments WHERE user_id=? AND course_id=? LIMIT 1',
        [userId, courseId]
    );
}

// Crée un nouvel avis
export async function create({ user_id, course_id, rating, comment }) {
    const [res] = await db.query(
        'INSERT INTO reviews (user_id, course_id, rating, comment) VALUES (?, ?, ?, ?)',
        [user_id, course_id, rating, comment ?? null]
    );
    return { id: res.insertId, user_id, course_id, rating, comment: comment ?? null };
}

// Met à jour un avis par ID
export function updateById(id, { rating, comment }) {
    return db.query('UPDATE reviews SET rating=?, comment=? WHERE id=?', [
        rating,
        comment ?? null,
        id,
    ]);
}

// Supprime un avis par utilisateur et cours
export async function deleteByUserAndCourse(userId, courseId) {
    const [res] = await db.query(
        'DELETE FROM reviews WHERE user_id=? AND course_id=?',
        [userId, courseId]
    );
    return res.affectedRows > 0;
}

// Liste des avis pour un cours
export function listByCourse(courseId) {
    return db.query(
        `SELECT r.id, r.user_id, r.course_id, r.rating, r.comment, u.name AS user_name
        FROM reviews r
        JOIN users u ON u.id = r.user_id
        WHERE r.course_id = ?
        ORDER BY r.id DESC`,
        [courseId]
    );
}

// Liste des avis par utilisateur
export function listByUser(userId) {
    return db.query(
        `SELECT r.id, r.user_id, r.course_id, r.rating, r.comment, c.title AS course_title
        FROM reviews r
        JOIN courses c ON c.id = r.course_id
        WHERE r.user_id = ?
        ORDER BY r.id DESC`,
        [userId]
    );
}

// Résumé des notes pour un cours
export async function courseRatingSummary(courseId) {
    const [rows] = await db.query(
        'SELECT AVG(rating) AS avg_rating, COUNT(*) AS review_count FROM reviews WHERE course_id=?',
        [courseId]
    );
    return rows[0];
}

// Distribution des notes pour un cours
export function courseRatingDistribution(courseId) {
    return db.query(
        'SELECT rating, COUNT(*) AS count FROM reviews WHERE course_id=? GROUP BY rating ORDER BY rating',
        [courseId]
    );
}
