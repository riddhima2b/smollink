const { ValidationError } = require('../utils/errors');
const {recordClick, getLinkStats} = require('../services/analytics');
const {createShortUrl, getUrl, getLinksByUserId, getUrlBySlugAndCode} = require('../services/link.service');
const baseUrl = process.env.BASE_URL;

const getUrlController = async (req, res) => {
  try{
    
    const { shortCode } = req.params;
    const link = await getUrl(shortCode);

    if (!link) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(link.longUrl);
    recordClick(link.id, req).catch((err) => console.error('recordClick failed:', err));
    return; 
  }
  catch(error){
    console.error(error);
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
const shortenController = async (req, res) => {
    try {
      const { url, customSlug } = req.body || {};
  
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }
  
      const userId = req.user?.userId ?? null;
  
      const link = await createShortUrl(url, userId, customSlug);
  
      return res.status(201).json({
        shortUrl: customSlug
        ?`${baseUrl}${link.customSlug}/${link.shortCode}`
        :`${baseUrl}${link.shortCode}`
      });
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };

const getCustomShortController = async(req, res) =>{
    try{
          const { slug, shortCode } = req.params;
          const link = await getUrlBySlugAndCode(slug, shortCode);
          if (!link) return res.status(404).json({ error: 'Link not found' });

          res.redirect(link.longUrl);
          recordClick(link.id, req).catch((err) => console.error('recordClick failed:', err));
          return; 
    }catch(err){
      console.error(err);
      if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Something went wrong' });
    }
}

const getLinksByUserController = async(req, res) =>{
    try{
      const {userId} = req.user;
      if(!userId){
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const links = await getLinksByUserId(userId);
      return res.status(200).json(links);
    }
    catch(err){
      console.error(err);
      if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Something went wrong' });
    }
}

const getLinkStatsController = async (req, res) => {
  try {
    const linkId = req.params.id;
    const stats = await getLinkStats(linkId);
    return res.status(200).json(stats);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { shortenController, getCustomShortController, getLinksByUserController, getUrlController, getLinkStatsController };