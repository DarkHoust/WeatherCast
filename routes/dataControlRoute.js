const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        var location = req.query.location !== undefined ? req.query.location : 'Astana';

        const validationResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=ee0aa0c251759f73c0e7c3d67e6b4def`);
        const isValidLocation = validationResponse.data.length > 0;

        if (!isValidLocation) {
            return res.status(404).json({ error: 'City not found. Please enter a valid city name.' });
        }

        const weatherAPIResponse = await axios.get(`https://weathercast.cyclic.app/weatherAPI/?location=${location}`);
        const weatherData = weatherAPIResponse.data;

        const coordinateAPIResponse = await axios.get(`https://weathercast.cyclic.app/coordinateAPI/?location=${location}`);
        const coordinateData = coordinateAPIResponse.data;

        const currentTimeResponse = await axios.get(`https://timeapi.io/api/Time/current/coordinate?latitude=${coordinateData.lat}&longitude=${coordinateData.lon}`);
        const currentTime = currentTimeResponse.data;
        
        const combinedData = {
            weather: weatherData,
            coordinates: coordinateData,
            time: currentTime
        };

        res.json(combinedData);
    } catch (error) {
        console.error('Error calling APIs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
