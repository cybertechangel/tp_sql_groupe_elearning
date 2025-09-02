import {findByUserAndCourse, isUserEnrolled, create, updateById, deleteByUserAndCourse, listByCourse, listByUser, courseRatingSummary, courseRatingDistribution} from '../models/Review.js';
  
  function validateRating(r) { // Fonction pour valider la note
    const n = Number(r);
    return Number.isInteger(n) && n >= 1 && n <= 5;
}
  
export async function upsertReview(req, res) { // Fonction pour créer ou mettre à jour un avis
    try {
        const { user_id, course_id, rating, comment } = req.body;
        if (!user_id || !course_id) return res.status(400).json({ error: 'user_id et course_id sont requis' });
        if (!validateRating(rating)) return res.status(400).json({ error: 'La note doit être un entier entre 1 et 5' });
    
        const [enr] = await isUserEnrolled(user_id, course_id);
        if (!enr.length) return res.status(403).json({ error: `L'utilisateur doit être inscrit pour évaluer ce cours` });
    
        const [existingRows] = await findByUserAndCourse(user_id, course_id);
        if (!existingRows.length) {
            const created = await create({ user_id, course_id, rating, comment });
            return res.status(201).json({ message: 'Avis créé avec succès', review: created });
        } else {
            await updateById(existingRows[0].id, { rating, comment });
            return res.status(200).json({
            message: 'Avis mis à jour avec succès',
            review: { id: existingRows[0].id, user_id, course_id, rating, comment: comment ?? null },
            });
        }
    } catch (e) {
        console.error('upsertReview', e);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  
export async function getCourseReviews(req, res) { // Fonction pour obtenir tous les avis d'un cours
    try {
        const [rows] = await listByCourse(req.params.courseId);
        res.json(rows);
    } catch (e) {
        console.error('getCourseReviews', e);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  
export async function getUserReviews(req, res) { // Fonction pour récupérer tous les avis postés par un utilisateur
    try {
        const [rows] = await listByUser(req.params.userId);
        res.json(rows);
    } catch (e) {
        console.error('getUserReviews', e);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  
export async function getCourseSummary(req, res) { // Fonction pour obtenir le résumé des avis d'un cours
    try {
        const s = await courseRatingSummary(req.params.courseId);
        res.json({
            course_id: Number(req.params.courseId), 
            avg_rating: s?.avg_rating ? Number(s.avg_rating) : null, // Moyenne des notes ou null si pas d'avis
            review_count: Number(s?.review_count || 0), // Nombre total d'avis
        });
    } catch (e) {
        console.error('getCourseSummary', e);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  
export async function getCourseDistribution(req, res) { // Fonction pour obtenir la distribution des notes d'un cours
    try {
        const [dist] = await courseRatingDistribution(req.params.courseId);
        const map = new Map(dist.map(r => [Number(r.rating), Number(r.count)]));
        const filled = Array.from({ length: 5 }, (_, i) => ({ rating: i + 1, count: map.get(i + 1) || 0 }));
        res.json(filled);
    } catch (e) {
        console.error('getCourseDistribution', e);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  
export async function deleteReview(req, res) { // Fonction pour supprimer un avis
    try {
        const { user_id, course_id } = req.body;
        if (!user_id || !course_id) return res.status(400).json({ error: 'user_id et course_id sont requis' });
    
        const ok = await deleteByUserAndCourse(user_id, course_id);
        if (!ok) return res.status(404).json({ error: 'Avis introuvable' });
        res.json({ message: 'Avis supprimé avec succès' });
    } catch (e) {
        console.error('deleteReview', e);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  