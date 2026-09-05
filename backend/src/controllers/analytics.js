const { get } = require('https');
const {getLinkStats, getLinkAnalytics} = require('../services/analytics');

const getLinkStatsController = async (req, res) => {
    try {
      const linkId = Number(req.params.id);
      const stats = await getLinkStats(linkId);
      return res.status(200).json(stats);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
};

const getAnalyticsController = async (req, res) => {
    try {
        const linkId = Number(req.params.id);
        
        if (isNaN(linkId)) {
            return res.status(400).json({
                error: "Invalid link ID"
            });
        }
        const stats = await getLinkAnalytics(linkId);
        return res.status(200).json(stats);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch Analytics' });
    }
}



module.exports = {getLinkStatsController, getAnalyticsController};