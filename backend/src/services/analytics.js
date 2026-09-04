const prismaclient = require('../../lib/prisma');
const {UAParser} = require('ua-parser-js');
const geoip = require('geoip-lite');

async function recordClick (linkId, req) {
    const parser = new UAParser(req.headers['user-agent']);
    const ua = parser.getResult();
    const device = [ua.browser.name, ua.os.name].filter(Boolean).join('/') || "Unknown";
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip);
    const referrer = req.headers['referer'] || 'Direct';
    
    return prismaclient.primsa.click.create({
        data: {
          linkId,
          device,
          country: geo?.country || 'Unknown',
          referrer,
        },
      });
    }

async function getLinkStats(linkId) {
        console.log("linkId:", linkId);
        console.log("type:", typeof linkId);
        const totalClicks = await prismaclient.primsa.click.count({ where: { linkId } });
        const clicks = await prismaclient.primsa.click.findMany({ where: { linkId } });
        return { totalClicks, clicks };
}
      
module.exports = { recordClick, getLinkStats };
