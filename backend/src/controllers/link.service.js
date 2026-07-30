const { ValidationError } = require('../utils/errors');
const {createShortUrl} = require('../services/link.service');
const baseUrl = process.env.BASE_URL;

const shortenController = async (req, res) => {
    try {
      const { url } = req.body || {};
  
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }
  
      const userId = req.user?.userId ?? null;
  
      const link = await createShortUrl(url, userId);
  
      return res.status(201).json({
        shortUrl: `${baseUrl}${link.shortCode}`,
        longUrl: link.longUrl,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };
  module.exports = { shortenController };