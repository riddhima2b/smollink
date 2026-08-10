const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = process.env.B_PORT;
const base_url = process.env.BASE_URL;
const linkService = require('./src/services/link.service');
const rateLimit = require('./middleware/rateLimit');
const {register, login, getUserInfo, logout } = require('./src/controllers/users');
const { shortenController } = require('./src/controllers/link.service');
const optionalAuth = require('./middleware/middleware').optionalAuth;
const requireAuth = require('./middleware/middleware').requireAuth;
const prismaclient = require('./lib/prisma');

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3001"],
  credentials: true,
}));

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
    }
);

app.post('/api/register',register);
app.post('/api/login', login);
app.get('/api/user', requireAuth, getUserInfo);
app.post('/api/shorten', optionalAuth, rateLimit, shortenController);
app.get('/:shortCode', async (req, res) => {

    const shortCode = req.params.shortCode;
    const link = await linkService.getUrl(shortCode);

    if (!link) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    return res.redirect(link.longUrl);

})

app.get('/:slug/:shortCode', async (req, res) => {
  
    const { slug, shortCode } = req.params;
    const link = await prismaclient.primsa.link.findFirst({
      where: {
        shortCode: shortCode,
        customSlug: slug,
      },
    });
    if (!link) return res.status(404).json({ error: 'Link not found' });
    return res.redirect(link.longUrl);
});
app.post('/api/logout', logout);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});