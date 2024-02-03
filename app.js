const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'public' ,'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    const userLocationResponse = await axios.get(`https://ipinfo.io/json?token=${process.env.IP_INFO_TOKEN}`);
    const userCurrentLocationData = userLocationResponse.data;
    let userCurrentLocation = userCurrentLocationData.city;

    if (!userCurrentLocation) {
      console.error('Unable to retrieve user location from IP information.');
      userCurrentLocation = 'Astana';
    }

    const location = req.query.location !== undefined ? req.query.location : (userCurrentLocation || 'Astana');

    const response = await axios.get(`http://localhost:3000/dataAPI/?location=${location}`);
    const responseData = response.data;

    res.render(path.join(__dirname, 'public', 'views', 'mainPage.ejs'), { responseData });
  } catch (error) {
    console.error('Error fetching user location:', error.message);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
    res.status(500).send('Internal Server Error');
  }
});

app.post('/submitLocation', async (req, res) => {
  try {
    const newLocation = req.body.locationToSearch;

    const response = await axios.get(`http://localhost:3000/dataAPI?location=${newLocation}`);
    const data = response.data;

    res.redirect(`/?location=${newLocation}`);
  } catch (error) {
    console.error('Error processing form submission:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const weatherAPIRoute = require(path.join(__dirname, 'routes', 'weatherAPIRoute.js'));
app.use('/weatherAPI', weatherAPIRoute);

const coordinateAPIRoute = require(path.join(__dirname, 'routes', 'coordinateAPIRoute.js'));
app.use('/coordinateAPI/', coordinateAPIRoute);

const dataAPIRoute = require(path.join(__dirname, 'routes', 'dataControlRoute.js'));
app.use('/dataAPI', dataAPIRoute);

app.all("*", async (req,res) => {
  res.status(500).sendFile(path.join(__dirname, 'public', 'views', '404.html'));
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Local server is running on http://localhost:${PORT}/`);
});
