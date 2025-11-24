const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Préférences utilisateur
router.get('/users/:userId/preferences', userController.getUserPreferences);

// Onboarding
router.get('/users/:userId/onboarding', userController.isOnboardingDone);
router.post('/users/:userId/onboarding', userController.setOnboardingDone);

module.exports = router;