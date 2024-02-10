const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        const location = req.query.location !== undefined ? req.query.location : 'Astana';

        const responseData = await axios.get(`https://weathercast.cyclic.app/dataAPI/?location=${location}`);
        const data = responseData.data;
        var currentTimeResponse = await axios.get(`https://timeapi.io/api/Time/current/coordinate?latitude=${data.weather.coord.lat}&longitude=${data.weather.coord.lon}`);
        var currentTime = currentTimeResponse.data;

        res.json(currentTime);
    } catch (error) {
        console.error('Error fetching time data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
