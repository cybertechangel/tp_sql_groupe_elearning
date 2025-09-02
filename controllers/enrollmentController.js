import * as Enrollment from '../models/Enrollment.js';

export const enrollUser = async (req, res) => {
    const { userId, courseId } = req.body;
    try {
        const result = await Enrollment.createEnrollment(userId, courseId);
        res.status(201).json({
            message: 'Inscription réussie !',
            enrollmentId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de l'inscription",
            error: error.message
        });
    }
};

export const getEnrollmentsCount = async (req, res) => {
    try {
        const rows = await Enrollment.getEnrollmentsCountByCourse();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des inscriptions",
            error: error.message
        });
    }
};

export const getCompletionRate = async (req, res) => {
    try {
        const rows = await Enrollment.getCompletionRateByCourse();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des taux d'achèvement",
            error: error.message
        });
    }
};

export const completeEnrollment = async (req, res) => {
    const { id } = req.params;
    try {
        await Enrollment.completeEnrollment(id);
        const enrollment = await Enrollment.getEnrollmentById(id);
        res.status(200).json({
            message: "Inscription terminée avec succès",
            enrollment
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la finalisation de l'inscription",
            error: error.message
        });
    }
};