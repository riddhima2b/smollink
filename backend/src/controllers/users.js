const { registerUser } = require('../services/users');
const { ValidationError } = require('../utils/errors');
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

module.exports = { register };