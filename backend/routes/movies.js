var express = require('express');
var router = express.Router();
var passport = require('passport');

const { connectToDB, ObjectId } = require('../utils/db');

router.get('/', async (req, res) => {
    const db = await connectToDB();
    try {
        const movies = await db.collection('movies').find().toArray();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies.' });
    } finally {
        db.client.close();
    }
});


router.get('/:id', async (req, res) => {
    const db = await connectToDB();
    try {
        const movieId = new ObjectId(req.params.id); // Validate ObjectId
        const movie = await db.collection('movies').findOne({ _id: movieId });
        if (!movie) return res.status(404).json({ error: 'Movie not found.' });
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ error: 'Invalid movie ID.' });
    } finally {
        db.client.close();
    }
});


module.exports = router;

