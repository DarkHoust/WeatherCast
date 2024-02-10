const express = require('express');
const path = require('path');
const session = require('express-session')
const connectMongoDB = require('./config/database');
const mainRoute = require('./routes/mainRoute');
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const timeRoute = require('./routes/timeRoute');
const weatherRoute = require('./routes/weatherRoute');
const coordinateRoute = require('./routes/coordinateRoute');
const dataRoute = require('./routes/dataControlRoute')
require('dotenv').config();
const app = express();

//MongoDB Connection
connectMongoDB();

//Middleware configuration
app.use(session({ secret: 'darkhost', resave: false, saveUninitialized: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'public' ,'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', mainRoute);
app.use('/', authRoute);
app.use('/', adminRoute);
app.use('/timeAPI', timeRoute)
app.use('/weatherAPI', weatherRoute);
app.use('/coordinateAPI', coordinateRoute);
app.use('/dataAPI', dataRoute);

app.all("*", async (req,res) => {
  res.status(500).sendFile(path.join(__dirname, 'public', 'views', '404.html'));
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Local server is running on http://localhost:${PORT}/`);
});
