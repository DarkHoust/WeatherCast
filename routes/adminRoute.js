const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const User = require('../config/userSchema');
const path = require('path');

router.get('/admin', isAdmin, async (req, res) => {
        try {
            const users = await User.find({});
            res.render(path.join(__dirname, '..' ,'public', 'views', 'adminPage.ejs'), { users });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });
    
router.post('/users', async (req, res) => {
    try {
        const { usernameAdd, passwordAdd, mailAdd } = req.body;
        const newUser = new User({ username: usernameAdd, password: passwordAdd, mail: mailAdd });
        await newUser.save();
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
    
router.post('/editUser', async (req, res) => {
    try {
        const { userId, usernameEdit, passwordEdit, mailEdit } = req.body;
        const currentDate = new Date();
        await User.findByIdAndUpdate(userId, {
            username: usernameEdit,
            password: passwordEdit,
            mail: mailEdit,
            updatedAt: currentDate
        });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

    
router.post('/deleteUser', async (req, res) => {
    try {
        const { userId } = req.body;
        await User.findByIdAndDelete(userId);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
    
router.post('/adminControll', async (req, res) => {
    try {
        if (!req.session.user || !req.session.user.isAdmin) {
            return res.redirect('/');
        }
    
        const { userId } = req.body;
        
        const user = await User.findById(userId);
        
        if (!user) {
            return res.redirect('/');
        }
        
        // Toggle the isAdmin status
        user.isAdmin = !user.isAdmin;
        await user.save();
        
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;