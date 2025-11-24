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

exports.getAllGenres = (req, res) => {
    db.getAllGenres((genres) => {
        res.json(genres);
    });
};

exports.getGenreIdByName = (req, res) => {
    const name = req.params.name;
    db.getGenreIdByName(name, (id) => {
        if (id === null) return res.status(404).json({ error: 'Genre non trouvé' });
        res.json({ id });
    });
};

exports.getMovieGenreById = (req, res) => {
    const movieId = req.params.id;
    db.getMovieGenreById(movieId, (genres) => {
        res.json(genres);
    });
};

exports.getMovieGenreIdById = (req, res) => {
    const movieId = req.params.id;
    db.getMovieGenreIdById(movieId, (genreIds) => {
        res.json(genreIds);
    });
};