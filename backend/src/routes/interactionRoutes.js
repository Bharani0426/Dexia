const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');

// Création interaction
router.post('/interactions', interactionController.addInteraction);

// Interactions utilisateur
router.get('/interactions/user/:userId', interactionController.getUserInteractions);
router.get('/interactions/user/:userId/last', interactionController.getUserLastInteractions);

// Interactions film
router.get('/interactions/movie/:movieId', interactionController.getMovieInteractions);

// Vérifi si table existe
router.get('/interactions/health', interactionController.health);

module.exports = router;