const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// Genres
router.get('/genres', moviesController.getAllGenres); // liste tous les genres
router.get('/genres/name/:name', moviesController.getGenreIdByName); // id par nom

// Films par genre
router.get('/genres/:genreId/movies', moviesController.getMoviesByGenre);

// Film détail
router.get('/movies/:id', moviesController.getMovieById);

// Genres d'un film
router.get('/movies/:id/genres', moviesController.getMovieGenreById);
router.get('/movies/:id/genres/ids', moviesController.getMovieGenreIdById);

// Recherche
router.get('/movies/search', moviesController.searchMovies);

// Top rated
router.get('/movies/top', moviesController.getTopRatedMovies);

module.exports = router;