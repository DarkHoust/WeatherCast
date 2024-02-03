const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        var location = req.query.location !== undefined ? req.query.location : 'Astana';

        const validationResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.API_KEY_WEATHER}`);
        const isValidLocation = validationResponse.data.length > 0;

        if (!isValidLocation) {
            return res.status(404).json({ error: 'City not found. Please enter a valid city name.' });
        }

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
