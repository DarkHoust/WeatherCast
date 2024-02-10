const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const axios = require('axios');
const path = require('path');

// Define route handler for the main page
router.get('/', requireAuth, async (req, res) => {
    try {
        const userInfo = req.session.user;

        const userLocationResponse = await axios.get(`https://ipinfo.io/json?token=${process.env.IP_INFO_TOKEN}`);
        const userCurrentLocationData = userLocationResponse.data;
        let userCurrentLocation = userCurrentLocationData.city;

        if (!userCurrentLocation) {
            console.error('Unable to retrieve user location from IP information.');
            userCurrentLocation = 'Astana';
        }

        const location = req.query.location !== undefined ? req.query.location : (userCurrentLocation || 'Astana');

        const response = await axios.get(`https://weathercast.cyclic.app/dataAPI/?location=${location}`);
        const responseData = response.data;
        const currentTimeResponse = await axios.get(`https://weathercast.cyclic.app/timeAPI?location=${location}`);
        const currentTimeData = currentTimeResponse.data;

        res.render(path.join(__dirname, '..', 'public', 'views', 'mainPage.ejs'), { responseData, userInfo, currentTimeData });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/submitLocation', async(req, res) => {
    try {
        const newLocation = req.body.locationToSearch;
        res.redirect(`/?location=${newLocation}`);
    } catch (error) {
        console.error('Error processing form submission:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
