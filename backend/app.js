const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = process.env.B_PORT;
const base_url = process.env.BASE_URL;
const linkService = require('./src/services/link.service');
const rateLimit = require('./middleware/rateLimit');
const {register, login} = require('./src/controllers/users');

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
app.post('/api/shorten',rateLimit, async (req, res) => {

    const url1 = req.body.url;

    if (!url1) {
        return res.status(400).json({ error: 'URL is required' });
    }
    
    const link = await linkService.createShortUrl(url1);
    
    return res.status(200).json({ shortUrl: base_url + link.shortCode });

});

app.get('/:shortCode', async (req, res) => {

    const shortCode = req.params.shortCode;
    const link = await linkService.getUrl(shortCode);

    if (!link) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    return res.redirect(link.longUrl);

})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});