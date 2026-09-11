const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = process.env.B_PORT;
const base_url = process.env.BASE_URL;
const linkService = require('./src/services/link.service');
const {limiter, authLimiter} = require('./middleware/rateLimit');
const {register, login, getUserInfo, logout } = require('./src/controllers/users');
const { shortenController, getCustomShortController, getUrlController, getLinksByUserController } = require('./src/controllers/link.service');
const { getLinkStatsController, getAnalyticsController } = require('./src/controllers/analytics');
const optionalAuth = require('./middleware/middleware').optionalAuth;
const requireAuth = require('./middleware/middleware').requireAuth;
const prismaclient = require('./lib/prisma');
const cookieParser = require('cookie-parser');
const { getLinkAnalytics } = require('./src/services/analytics');
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", base_url],
  credentials: true,
}));
app.set('trust proxy', 1);

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
    }
);

app.post('/api/register',authLimiter,register);
app.post('/api/login', authLimiter, login);
app.get('/api/user', requireAuth, getUserInfo);
app.post('/api/shorten', optionalAuth, limiter, shortenController);
app.get('/api/links/:id/stats', getLinkStatsController);
app.get('/api/analytics/:id', getAnalyticsController);  
app.get('/api/mylinks', requireAuth, getLinksByUserController); 
app.post('/api/logout', logout);

app.get('/:code', optionalAuth, getUrlController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});