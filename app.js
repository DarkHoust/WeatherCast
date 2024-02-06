const express = require('express');
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');
const session = require('express-session')
const requireAuth = require('./routes/requireAuth');
mongoose.connect('mongodb+srv://darkhost:2005sul@aitu.c93ubxo.mongodb.net/');
require('dotenv').config();
const app = express();

const User = mongoose.model("Users", {username: String, mail: String, password: String});

// const exampleUser = new User({username: 'Dark', mail: 'dark@gmail.com', password: '123'});
// exampleUser.save();

app.use(session({
  secret: 'darkhost',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'public' ,'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', requireAuth ,async (req, res) => {
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

    const response = await axios.get(`http://localhost:3000/dataAPI/?location=${location}`);
    const responseData = response.data;

    res.render(path.join(__dirname, 'public', 'views', 'mainPage.ejs'), { responseData, userInfo });
  } catch (error) {
    console.error('Error fetching user location:', error.message);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
    res.status(500).send('Internal Server Error');
  }
});

app.get('/registration', async (req, res) => {
  res.render(path.join(__dirname, 'public', 'views', 'RegistrationPage.ejs'))
})

app.get('/auth', async (req, res) => {
  res.render(path.join(__dirname, 'public', 'views', 'AuthPage.ejs'))
})

app.post('/auth', async (req, res) => {
  try {
    const { userName, userPassword } = req.body;

    const existingUser = await User.findOne({ username: userName, password: userPassword });

    if (existingUser) {
      req.session.user = {
        username: existingUser.username,
        password: existingUser.password,
        mail: existingUser.mail
      };
      res.redirect('/');
    } else {

      res.redirect('/auth');
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/registration', async (req, res) => {
  try{
    let userName = req.body.userName;
    let userMail = req.body.userMail;
    let userPassword = req.body.userPassword;

    let userInfo = {
      username: userName,
      mail: userMail,
      password: userPassword
    }

    let newUser = new User(userInfo);
    await newUser.save();

    req.session.user = userInfo;

    res.redirect('/')
  } catch (error) {
    console.log('Error:', error.message);
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

app.use('/weatherAPI', require(path.join(__dirname, 'routes', 'weatherAPIRoute.js')));
app.use('/coordinateAPI/', require(path.join(__dirname, 'routes', 'coordinateAPIRoute.js')));
app.use('/dataAPI', require(path.join(__dirname, 'routes', 'dataControlRoute.js')));

app.all("*", async (req,res) => {
  res.status(500).sendFile(path.join(__dirname, 'public', 'views', '404.html'));
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Local server is running on http://localhost:${PORT}/`);
});
