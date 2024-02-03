const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios')
require('dotenv').config(path.join(__dirname,'..','.env'))

router.get('/', (req, res) => {
    var location = req.query.location !== undefined ? req.query.location : 'Astana';

    API_KEY = process.env.API_KEY_WEATHER;
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.API_KEY_WEATHER}&q=${location}&units=metric`

    axios.get(urlWeather)
    .then(response => {
        const weatherInfo = response.data
        res.json(weatherInfo)
    })
});

module.exports = router;
