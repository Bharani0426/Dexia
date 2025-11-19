const db = require('../models/movies');

exports.getMoviesByGenre = (req, res) => {
    const genreId = req.params.genreId;
    db.getMoviesByGenre(genreId, (movies) => {
        res.json(movies);
    });
};

exports.getMovieById = (req, res) => {
    const movieId = req.params.id;
    db.getMovieById(movieId, (movie) => {
        if (!movie) return res.status(404).json({ error: 'Film non trouvé' });
        res.json(movie);
    });
};

exports.searchMovies = (req, res) => {
    const keyword = req.query.q;
    db.findMoviesByKeyword(keyword, (movies) => {
        res.json(movies);
    });
};

exports.getTopRatedMovies = (req, res) => {
    const limit = req.query.limit || 10;
    db.getTopRatedMovies(limit, (movies) => {
        res.json(movies);
    });
};