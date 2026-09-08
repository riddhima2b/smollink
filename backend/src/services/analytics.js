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

  const [link, totalClicks, formattedCountries, formattedDevices, formattedRefferers, formattedRecentClicks] = await Promise.all([
    prismaclient.primsa.link.findUnique({
      where: { id: linkId },
      select: { shortCode: true, customSlug: true, longUrl: true },
    }),
    prismaclient.primsa.click.count({ where: { linkId } }),
    prismaclient.primsa.click.groupBy({
      by: ['country'],
      where: { linkId },
      _count: { country: true },
    }),
    prismaclient.primsa.click.groupBy({
      by: ['device'],
      where: { linkId },
      _count: { device: true },
    }),
    prismaclient.primsa.click.groupBy({
      by: ['referrer'],
      where: { linkId },
      _count: { referrer: true },
    }),
    prismaclient.primsa.click.findMany({
      where: { linkId },
      orderBy: { timestamp: 'desc' },
      take: 5,
      select: { timestamp: true, device: true, country: true, referrer: true },
    }),
  ]);

  if (!link) {
    throw new Error('Link not found'); 
  }

  return {
    shortCode: link.shortCode,
    customSlug: link.customSlug,
    longUrl: link.longUrl,
    totalClicks,
      formattedCountries, 
      formattedDevices,formattedRefferers, formattedRecentClicks
    };
}
module.exports = { recordClick, getLinkStats, getLinkAnalytics };
