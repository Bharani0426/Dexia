const db = require('../models/user');

// Récupérer les préférences de l'utilisateur
exports.getUserPreferences = (req, res) => {
    const userId = req.params.userId;
    db.getUserPreferences(userId, (preferences) => {
        res.json(preferences);
    });
};

// Vérifier si l'onboarding est terminé
exports.isOnboardingDone = (req, res) => {
    const userId = req.params.userId;
    db.isOnboardingDone(userId, (done) => {
        res.json({ onboardingDone: done });
    });
};

// Marquer l'onboarding comme terminé ou non
exports.setOnboardingDone = (req, res) => {
    const userId = req.params.userId;
    const done = req.body.done;
    db.setOnboardingDone(userId, done, (success) => {
        if (!success) return res.status(500).json({ error: 'Impossible de mettre à jour.' });
        res.json({ success: true });
    });
};
