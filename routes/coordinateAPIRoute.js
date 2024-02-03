const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios')
require('dotenv').config(path.join(__dirname,'..','.env'))


router.get('/', (req, res) => {
    var location = req.query.location !== undefined ? req.query.location : 'Astana';
    API_KEY = process.env.API_KEY_WEATHER;
    const urlGeoCoding = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.API_KEY_WEATHER}`

    axios.get(urlGeoCoding)
    .then(response => {
        const coordinates = response.data
        const lat = coordinates[0].lat
        const lon = coordinates[0].lon

        res.json({'lat' : lat, 'lon' : lon})
    })
});

module.exports = router;