const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config()
const User = require('../config/userSchema');

router.get('/', async (req, res) => {
    try {
        var location = req.query.location !== undefined ? req.query.location : 'Astana';

        const validationResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.GEO_CODING_API}`);
        const isValidLocation = validationResponse.data.length > 0;

        if (!isValidLocation) {
            return res.status(404).json({ error: 'City not found. Please enter a valid city name.' });
        }

        const weatherAPIResponse = await axios.get(`http://localhost:3000/weatherAPI/?location=${location}`);
        const weatherData = weatherAPIResponse.data;

        const coordinateAPIResponse = await axios.get(`http://localhost:3000/coordinateAPI/?location=${location}`);
        const coordinateData = coordinateAPIResponse.data;

        const currentTimeResponse = await axios.get(`https://timeapi.io/api/Time/current/coordinate?latitude=${coordinateData.lat}&longitude=${coordinateData.lon}`);
        const currentTime = currentTimeResponse.data;
        
        // Save search history
        if (req.session.user) {
            const user = await User.findById(req.session.user._id);
            if (user) {
                user.searchHistory.push({ cityName: location });
                await user.save();
            }
        }

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
