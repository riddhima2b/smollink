const Base62 = require('../utils/base62');
const prismaclient = require('../../lib/prisma');

async function fetchUrl(url)
{
    const link = await prismaclient.primsa.link.findUnique({
        where: { longUrl: url },
    });

    return link;
}
async function createShortUrl(url,userId) {

    const existingLink = await fetchUrl(url);
    if(existingLink) {
        return existingLink;
    }
    
    const newLink = await prismaclient.primsa.link.create({
            data: {
                longUrl: url,
                userId: userId,
            },
        });
        
    const shortUrl = Base62.encodeBase62(newLink.id);

    const shortLink = await prismaclient.primsa.link.update({
        
        where: { id: newLink.id },
        data: { shortCode: shortUrl },
    });

    return shortLink;
    
}

async function getUrl(shortCode){

    const link = await prismaclient.primsa.link.findUnique({
        where: { shortCode: shortCode },
    })
    return link;
}

module.exports = {fetchUrl, createShortUrl,getUrl};