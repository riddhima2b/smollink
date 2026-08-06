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
        next();
        return;
    }
};

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token)
    {
        console.log('No token found in cookies');
        return res.status(401).json({error: 'Session expired. Please log in again.'});
    }

    try{
        const decode = jwt.verify(token,jwtSecret);
        req.user = decode;
        return next();
    }
    catch(error){
        console.error('JWT verify failed:', error.message);
        return res.status(401).json({error: 'Session expired. Please log in again.'});
        
    }
};

module.exports = { optionalAuth, requireAuth };