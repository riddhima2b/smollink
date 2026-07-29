const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../src/utils/errors');

const jwtSecret = process.env.JWT_SECRET;

const optionalAuth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        req.user = null;
        next();
        return;
    }

    try{
        const decode = jwt.verify(token,jwtSecret);
        req.user = decode;
        next();
        return;
    }
    catch(error){
        req.user = null;
        return;
    }
};

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token)
    {
        return res.status(401).json({error: 'Session expired. Please log in again.'});
    }

    try{
        const decode = jwt.verify(token,jwtSecret);
        req.user = decode;
        next();
        return;
    }
    catch(error){
        
        return res.status(401).json({error: 'Session expired. Please log in again.'});
        
    }
};

module.exports = { optionalAuth, requireAuth };