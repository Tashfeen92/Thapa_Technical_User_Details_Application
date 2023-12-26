const jwt = require('jsonwebtoken');
const User = require('../model/userSchema.js');

const aboutPageMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwttoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // const verifyToken = jwt.decode(token);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })

        if (!rootUser)
            throw new Error("Error!");
        req.token = token;  // This makes the user object available to other parts of your application that handle the request.
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (err) {
        res.status(401).send('Unauthorized:No token provided');
        console.log(err);
    }
}

module.exports = aboutPageMiddleware