const encodeBase62 = require('../utils/base62');
const prismaclient = require('../lib/prisma');
async function createShortUrl(url) {

    await prismaclient.primsa.link.create({
        data: {
            url: url,
            shortUrl: encodeBase62(),
        },
    });
    
}