const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        var location = req.query.location !== undefined ? req.query.location : 'Astana';
        const weatherAPIResponse = await axios.get(`http://localhost:3000/weatherAPI/?location=${location}`);
        const coordinateAPIResponse = await axios.get(`http://localhost:3000/coordinateAPI/?location=${location}`);

        const weatherData = weatherAPIResponse.data;
        const coordinateData = coordinateAPIResponse.data;

        const combinedData = {
            weather: weatherData,
            coordinates: coordinateData
        };

        res.json(combinedData);
    } catch (error) {
        console.error('Error calling APIs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
