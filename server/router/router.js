const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const connection = require('../db/connection.js');
const User = require('../model/userSchema.js');
const aboutPageMiddleware = require("../middleware/aboutPageMiddleware.js")

router.use(cookieParser());

router.get('/', (req, res) => {
    res.send(`Hello World! From Router.js`);
})

// User Registration Authentication
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, confirmPassword } = req.body;
    if (!name || !email || !phone || !work || !password || !confirmPassword) {
        return res.status(422).json({ error: "Kindly Enter the Valid Credentials" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist)
            return res.status(422).json({ error: "Email Already Exists" });
        else if (password != confirmPassword)
            return res.status(422).json({ error: "Email Already Exists" });
        else {
            const user = new User({ name, email, phone, work, password, confirmPassword });
            await user.save();
            res.status(201).json({ message: "User Registered Successfully" });
        }
    }
    catch (error) {
        console.log(error)
    };
})

// User Login Authentication
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "invalid Credentials" });
        }
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const matchPassword = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            res.cookie("jwttoken", token, {
                expires: new Date(Date.now() + 2592000000),
                httpOnly: true
            });

            if (matchPassword)
                res.status(200).json({ message: "Login Successfully" });
            else
                res.status(400).json({ error: "Invalid Credentials" });
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    }
    catch (error) {
        console.log(error);
    }
})

//About Us Page
router.get('/about', aboutPageMiddleware, (req, res) => {
    res.send(req.rootUser);
})

//Get User Data for Contact us & Home Page
router.get('/getUserData', aboutPageMiddleware, (req, res) => {
    res.send(req.rootUser);
})

// Contact
router.post('/contact', aboutPageMiddleware, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message)
            return res.status(422).json({ Error: "Kindly Fill the Contact Form" });
        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {

            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "User Contact Successfully" });

        }
    }
    catch (error) {
        console.log(error)
    };
})

// Logout 
router.get('/logout', aboutPageMiddleware, (req, res) => {
    console.log('Hello Logout')
    res.clearCookie('jwttoken', { path: "/" })
    res.status(200).send('User Logout');
})


module.exports = router;