const express = require('express');
const router = express.Router();
const { connectToDB, ObjectId } = require('../utils/db');

router.post('/', async (req, res) => {
    const { name, movieId, seats } = req.body;
    console.log('Incoming booking request:', req.body); // Log the incoming request

    if (!name || !movieId || seats < 1) {
        console.error('Validation Error: Invalid booking details.');
        return res.status(400).json({ error: 'Invalid booking details.' });
    }

    const db = await connectToDB();
    try {
        const booking = {
            name,
            movieId: new ObjectId(movieId), // Ensure ObjectId is used correctly
            seats,
            createdAt: new Date(),
        };

        const result = await db.collection('bookings').insertOne(booking);

        console.log('Booking created successfully:', booking); // Log the booking object
        res.status(201).json({ message: 'Booking created', bookingId: result.insertedId });
    } catch (err) {
        console.error('Database Error: Failed to create booking:', err);
        res.status(500).json({ error: 'Failed to create booking.' });
    } finally {
        db.client.close();
    }
});





router.get('/', async (req, res) => {
    const db = await connectToDB();
    try {
        // Use aggregation to replace movieId with movie name
        const bookings = await db.collection('bookings').aggregate([
            {
                $lookup: {
                    from: 'movies', // Collection name of movies
                    localField: 'movieId', // Field in bookings collection
                    foreignField: '_id', // Field in movies collection
                    as: 'movieDetails', // Resulting field
                },
            },
            {
                $unwind: '$movieDetails', // Flatten the movieDetails array
            },
            {
                $project: {
                    name: 1,
                    seats: 1,
                    createdAt: 1,
                    movieName: '$movieDetails.title', // Replace movieId with movieName
                },
            },
        ]).toArray();

        res.status(200).json(bookings);
    } catch (err) {
        console.error('Failed to fetch bookings:', err);
        res.status(500).json({ error: 'Failed to fetch bookings.' });
    } finally {
        db.client.close();
    }
});


module.exports = router;
