const { get } = require('node:http');
const { registerUser, loginUser, getUser } = require('../services/users');
const { ValidationError } = require('../utils/errors');
const { AuthenticationError } = require('../utils/errors');

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        await registerUser(email, password, name);
        return res.status(201).json({ success: 'Registration successful!' });
    } catch (error) {
        console.error('Error in registration:', error.message);
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const { token, user: safeUser } = await loginUser(email, password);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            expires: new Date(Date.now() + 60 * 60 * 1000)
        });        return res.status(200).json({ user: safeUser });        
    }catch(error){
        console.error('Error in login:', error.message);
        if (error instanceof ValidationError ) {
            return res.status(400).json({ error: error.message });
        }
        if(error instanceof AuthenticationError)
        {
            return res.status(401).json({error: error.message});
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserInfo = async (req, res) => {
    try{
        const userId = req.user.userId;
        const user = await getUser(userId);
        return res.status(200).json({ user });
    }
    catch(error)
    {
        console.error('Error in getting user info:', error.message);
        if (error instanceof AuthenticationError) {
            return res.status(401).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { register, login, getUserInfo };