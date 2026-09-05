const prismaclient = require('../../lib/prisma');
const {UAParser} = require('ua-parser-js');
const geoip = require('geoip-lite');

async function recordClick (linkId, req) {
    const parser = new UAParser(req.headers['user-agent']);
    const ua = parser.getResult();
    const device = [ua.browser.name, ua.os.name].filter(Boolean).join('/') || "Unknown";
    const ip =  req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
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
    const totalClicks = await prismaclient.primsa.click.count({ where: { linkId } });
    return totalClicks;
}
      
async function getLinkAnalytics(linkId) {

    const totalClicks = await prismaclient.primsa.click.count({ where: { linkId } });
    
    const countries = await prismaclient.primsa.click.groupBy({
      by: ['country'],
      where:{linkId},
      _count: { country: true },
    });

    const devices = await prismaclient.primsa.click.groupBy({
      by: ['device'],
      where:{linkId},
      _count: { device: true },
    });

    const referrers = await prismaclient.primsa.click.groupBy({
      by: ['referrer'],
      where:{linkId},
      _count: { referrer: true },
    });

    return {
      totalClicks,
      countries, 
      devices,referrers
    };

}
module.exports = { recordClick, getLinkStats, getLinkAnalytics };
