const express = require('express');
const router = express.Router();
const User = require('../config/userSchema');
const path = require('path');

router.get('/auth', async (req, res) => {
    res.render(path.join(__dirname, '..', 'public', 'views', 'AuthPage.ejs'))
});

router.post('/auth', async (req, res) => {
    try {
        const { userName, userPassword } = req.body;
    
        const existingUser = await User.findOne({ username: userName, password: userPassword });
    
        if (existingUser) {
        req.session.user = {
            username: existingUser.username,
            password: existingUser.password,
            mail: existingUser.mail,
            isAdmin: existingUser.isAdmin
        };
    
        res.redirect('/');
        } else{
            res.redirect('/auth');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/registration', async (req, res) => {
    res.render(path.join(__dirname, '..', 'public', 'views', 'RegistrationPage.ejs'))
});

router.post('/registration', async (req, res) => {
    try{
        let userName = req.body.userName;
        let userMail = req.body.userMail;
        let userPassword = req.body.userPassword;
    
        let userInfo = {
            username: userName,
            mail: userMail,
            password: userPassword,
            isAdmin: false
        }
    
        let newUser = new User(userInfo);
        await newUser.save();
    
        res.redirect('/')
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
