const Base62 = require('../utils/base62');
const prismaclient = require('../../lib/prisma');
const { ValidationError } = require('../utils/errors');

const reserved_slugs = ['api', 'login', 'register', 'user', 'logout'];

async function fetchUrl(url)
{
    const link = await prismaclient.primsa.link.findFirst({
        where: { longUrl: url, customSlug: null },
    });

    return link;
}
async function createShortUrl(url,userId,customSlug) {

    if (!url || typeof url !== 'string') {
        throw new ValidationError('URL is required');
    }

    if (customSlug) {
        if(!userId){
            throw new ValidationError('You must be logged in to create a custom slug');
        }
        if(reserved_slugs.includes(customSlug.toLowerCase())){
            throw new ValidationError('This keyword is reserved');
        }
        const existingSlug = await prismaclient.primsa.link.findUnique({where: {customSlug: customSlug},});
        if(existingSlug){
            throw new ValidationError('This custom keyword is already taken');
        }

        const newLink = await prismaclient.primsa.link.create({
            data: {
                longUrl: url,
                userId: userId,
                customSlug: customSlug || null,
                },
            });
            const shortUrl = Base62.encodeBase62(newLink.id);
            return await prismaclient.primsa.link.update({
                where: { id: newLink.id },
                data: { shortCode: shortUrl },
            });
    }
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

    return await prismaclient.primsa.link.update({
        
        where: { id: newLink.id },
        data: { shortCode: shortUrl },
    });    
}

async function getUrl(shortCode){

    const link = await prismaclient.primsa.link.findUnique({
        where: { shortCode: shortCode },
    })
    return link;
}

module.exports = {fetchUrl, createShortUrl,getUrl};