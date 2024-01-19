const express = require('express')
const https = require('https')
const path = require('path')
const axios = require('axios')
require('dotenv').config(path.join(__dirname, '.env'))
const app = express()

app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mainPage.html'))
})

// app.get('/', (req, res) => {
//   var location = 'Astana'
//   API_KEY = process.env.API_KEY_WEATHER;
//   const urlGeoCoding = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`
//   const urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=${location}&units=metric`
//   const urlMap = `https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid=${API_KEY}`
  
//   response.on("data", function(data) {
//     const weatherData = JSON.parse(data)
//     const temp = weatherData.main.temp
//     const weatherDescription = weatherData.weather[0].description
//     const icon = weatherData.weather[0].icon

//     const imgURL = `https://openweathermap.org/img/wn/${icon}.png`
//     res.write(`<h1> Temperature is ${temp} </h1>`)
//     res.write(`<h1> Wheather is currently ${weatherDescription} </h1>`)
//     res.write(`<img src=${imgURL} alt='weather icon'>`)
//     res.send()
//   })
// })

app.get('/weatherApi', (req, res) => {
  var location = 'Astana'
  API_KEY = process.env.API_KEY_WEATHER;
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=${location}&units=metric`

  axios.get(urlWeather)
    .then(response => {
      const weatherInfo = response.data
      res.json(weatherInfo)
    })
})

app.get('/coordinateAPI/', (req, res) => {
  var location = req.query.location
  API_KEY = process.env.API_KEY_WEATHER;
  const urlGeoCoding = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`

  axios.get(urlGeoCoding)
    .then(response => {
      const coordinates = response.data
      const lat = coordinates[0].lat
      const lon = coordinates[0].lon
      
      res.json({'lat' : lat, 'lon' : lon})
    })
})


app.get('/mapAPI/', async (req, res) => {
  try {
    var location = req.query.location;
    API_KEY = process.env.API_KEY_WEATHER;

    function lonToTile(lon, z) {
      return Math.floor((lon + 180) / 360 * Math.pow(2, z));
    }

    function latToTile(lat, z) {
      return Math.floor(
        (1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) /
          2 *
          Math.pow(2, z)
      );
    }

    const coordinates = await axios.get(`http://localhost:3000/coordinateAPI/?location=${location}`);
    var zoom = 6;
    var x_tile = Math.floor(latToTile(coordinates.data.lat, zoom));
    var y_tile = Math.floor(lonToTile(coordinates.data.lon, zoom));

    const urlMap = `https://tile.openweathermap.org/map/temp_new/${zoom}/${x_tile}/${y_tile}.png?appid=${API_KEY}`;
    const response = await axios.get(urlMap, { responseType: 'arraybuffer' });

    // Set the content type to image/png
    res.setHeader('Content-Type', 'image/png');
    res.end(response.data, 'binary');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Local server is running on http://localhost:${PORT}/`)
})