const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const axios = require('axios');
const path = require('path');
const User = require('../config/userSchema');

router.get('/', requireAuth, async (req, res) => {
    try {
        const userInfo = req.session.user;

        const user = await User.findOne({ username: userInfo.username });
        const searchHistory = user && user.searchHistory ? user.searchHistory : [];

        let lastSearchedCity;
        if (searchHistory.length > 0) {
            lastSearchedCity = searchHistory[searchHistory.length - 1].cityName;
        } else {
            const ipInfoResponse = await axios.get(`https://ipinfo.io/?token=f5ea586269b91b`);
            const ipInfoData = ipInfoResponse.data;
            lastSearchedCity = ipInfoData.city;
        }

        const response = await axios.get(`http://localhost:3000/dataAPI/?location=${lastSearchedCity}`);
        const responseData = response.data;

        const isCityAlreadySearched = searchHistory.some(item => item.cityName === lastSearchedCity);
        const lastSearchedCityWeather = searchHistory.length > 0 ? searchHistory[searchHistory.length - 1].responseData : null;

        if (!isCityAlreadySearched) {
            const timestamp = new Date();
            searchHistory.push({ cityName: lastSearchedCity, timestamp, responseData });
            user.searchHistory = searchHistory;
            await user.save();
        }

        const currentTimeResponse = await axios.get(`http://localhost:3000/timeAPI?location=${lastSearchedCity}`);
        const currentTimeData = currentTimeResponse.data;

        res.render(path.join(__dirname, '..', 'public', 'views', 'mainPage.ejs'), { responseData, userInfo, currentTimeData, searchHistory, lastSearchedCityWeather});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/submitLocation', async (req, res) => {
    try {
        const newLocation = req.body.locationToSearch;
        const userInfo = req.session.user;

        if (!userInfo) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const user = await User.findOne({ username: userInfo.username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const response = await axios.get(`http://localhost:3000/dataAPI/?location=${newLocation}`);
        const responseData = response.data;

        user.searchHistory.push({ cityName: newLocation, timestamp: new Date(), responseData });
        
        await user.save();

        res.redirect(`/?location=${newLocation}`);
    } catch (error) {
        console.error('Error processing form submission:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
