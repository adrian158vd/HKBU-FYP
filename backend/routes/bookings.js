const express = require('express');
const router = express.Router();
const { connectToDB, ObjectId } = require('../utils/db');


router.post('/', async (req, res) => {
    const { name, movieId, seats } = req.body;
    const db = await connectToDB();
    try {
        const booking = {
            name,
            movieId: ObjectId(movieId),
            seats,
            createdAt: new Date(),
        };
        const result = await db.collection('bookings').insertOne(booking);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create booking.' });
    } finally {
        db.client.close();
    }
});

router.get('/', async (req, res) => {
    const db = await connectToDB();
    try {
        const bookings = await db.collection('bookings').find().toArray();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch bookings.' });
    } finally {
        db.client.close();
    }
});

module.exports = router;
