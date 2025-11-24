const interactionModel = require('../models/interaction');

// Créer une interaction (view | like | dislike | favorite)
exports.addInteraction = (req, res) => {
	const { userId, movieId, actionType } = req.body;
	if (!userId || !movieId || !actionType) {
		return res.status(400).json({ error: 'Champs requis: userId, movieId, actionType' });
	}
	interactionModel.addInteraction(userId, movieId, actionType, (created) => {
		if (!created) return res.status(500).json({ error: 'Création échouée' });
		res.status(201).json(created);
	});
};

// Interactions d'un utilisateur (option limit via query)
exports.getUserInteractions = (req, res) => {
	const userId = req.params.userId;
	const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
	interactionModel.getInteractionsByUser(userId, (rows) => {
		res.json(rows);
	}, limit);
};

// Dernières interactions
exports.getUserLastInteractions = (req, res) => {
	const userId = req.params.userId;
	const limit = req.query.limit ? parseInt(req.query.limit, 10) : 5;
	interactionModel.getUserLastInteractions(userId, limit, (rows) => {
		res.json(rows);
	});
};

// Interactions pour un film
exports.getMovieInteractions = (req, res) => {
	const movieId = req.params.movieId;
	interactionModel.getInteractionsByMovie(movieId, (rows) => {
		res.json(rows);
	});
};

// Endpoint de santé pour vérifier la table
exports.health = (req, res) => {
	interactionModel.ensureInteractionTable((ok) => {
		res.json({ ready: ok });
	});
};
