const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prismaclient = require('../../lib/prisma');
const jwtSecret = process.env.JWT_SECRET;
const {ValidationError} = require('../utils/errors');
const { AuthenticationError } = require('../utils/errors');

const registerUser = async (email, password, name) => {
    if (!email || !password) {
        throw new ValidationError('All fields are required!');
    }
    if (!email.includes('@')) {
        throw new ValidationError('Invalid email format');
    }
    if (password.length < 8) {
        throw new ValidationError('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        throw new ValidationError('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        throw new ValidationError('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
        throw new ValidationError('Password must contain at least one number');
    }
    if (!/[@#$%&*_]/.test(password)) {
        throw new ValidationError('Password must contain at least one special character from [@#$%&*_]');
    }
    if (!name || name.trim().length === 0) {
        throw new ValidationError('Name is required');
    }

    const existingUser = await prismaclient.primsa.user.findUnique({
        where: { email: email },
    });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prismaclient.primsa.user.create({
        data: {
            email: email,
            password: hashedPassword,
            name: name,
        },
    });

    return newUser;
};

const loginUser = async (email, password) => {

    if(!email || !password) {
        throw new ValidationError('All fields are required');
    }

    const user = await prismaclient.primsa.user.findUnique({
        where: {email: email},
    });
    if (!user) {
        throw new AuthenticationError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new AuthenticationError('Invalid email or password');
    }

    const token = jwt.sign({userId: user.userId}, jwtSecret, {expiresIn: '1h'});
    
    const {password: _, ...userWithoutPassword} = user;
    return {user: userWithoutPassword, token};

};

module.exports = { registerUser, loginUser };
