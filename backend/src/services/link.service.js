const Base62 = require('../utils/base62');
const prismaclient = require('../../lib/prisma');

async function fetchUrl(url)
{
    const link = await prismaclient.primsa.link.findUnique({
        where: { longUrl: url },
    });

    return link;
}
async function createShortUrl(url) {

    const existingLink = await fetchUrl(url);
    if(existingLink) {
        return existingLink;
    }
    
    const newLink = await prismaclient.primsa.link.create({
            data: {
                longUrl: url,
            },
        });
        
    const shortUrl = Base62.encodeBase62(newLink.id);

    const shortLink = await prismaclient.primsa.link.update({
        
        where: { id: newLink.id },
        data: { shortCode: shortUrl },
    });

    return shortLink;
    
}

module.exports = {fetchUrl, createShortUrl};