const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const location = req.query.location !== undefined ? req.query.location : 'Astana';
        const API_KEY = process.env.API_KEY_WEATHER;
        const urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=${location}&units=metric`;

        const response = await axios.get(urlWeather);
        const weatherInfo = response.data;

        res.json(weatherInfo);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
