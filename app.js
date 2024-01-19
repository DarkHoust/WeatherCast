const express = require('express');
const path = require('path');
const axios = require('axios');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    const location = req.query.location || 'Astana';
    const response = await axios.get(`http://localhost:3000/dataAPI/?location=${location}`);
    const responseData = response.data;

    res.render(path.join(__dirname, 'public', 'mainPage.ejs'), { responseData });
  } catch (error) {
    console.error('Error fetching data:', error);
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Local server is running on http://localhost:${PORT}/`);
});
