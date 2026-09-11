const Base62 = require('../utils/base62');
const prismaclient = require('../../lib/prisma');
const { ValidationError } = require('../utils/errors');
const { isValidUrl } = require('../utils/validateUrl');

const reserved_slugs = ['api', 'login', 'register', 'user', 'logout'];

async function fetchUrl(url, slug, userId)
{
    const link = await prismaclient.primsa.link.findFirst({
        where: { longUrl: url, customSlug: slug || null, userId: userId || null },
    });

    return link;
}
async function createShortUrl(url, userId, customSlug) {

    if (!url || typeof url !== 'string') {
        throw new ValidationError('URL is required');
    }
    if (!isValidUrl(url)) {
        throw new ValidationError('Invalid URL format');
    }

    if (customSlug) {
        const slug2 = customSlug.toLowerCase();

        if (!userId) {
            throw new ValidationError('You must be logged in to create a custom slug');
        }
        if (reserved_slugs.includes(slug2)) {
            throw new ValidationError('This keyword is reserved');
        }
        const clash = await prismaclient.primsa.link.findFirst({
            where: { OR: [{ customSlug: slug2 }, { shortCode: slug2 }] },
        });
        if (clash) {
            throw new ValidationError('This custom keyword is already taken');
        }

        return await prismaclient.primsa.link.create({
            data: {
                longUrl: url,
                userId,
                customSlug: slug2,
            },
        });
    }

    const existingLink = await fetchUrl(url, customSlug, userId);
    if (existingLink) {
        return existingLink;
    }

    const newLink = await prismaclient.primsa.link.create({
        data: { longUrl: url, userId },
    });

    const shortCode = Base62.encodeBase62(newLink.id);

    return await prismaclient.primsa.link.update({
        where: { id: newLink.id },
        data: { shortCode },
    });
}
async function getUrl(shortCode){

    const link = await prismaclient.primsa.link.findUnique({
        where: { shortCode: shortCode },
    })
    return link;
}

const getUrlBySlug = async (slug) => {
    const link = await prismaclient.primsa.link.findUnique({
        where:{
            customSlug: slug,
        },
    });
    return link;
}
const getLinksByUserId = async (userId) => {
    const links = await prismaclient.primsa.link.findMany({
        where: {userId:userId},
        orderBy: { createdAt: 'desc' },
    })
    return links;
}
module.exports = {fetchUrl, createShortUrl, getUrl, getLinksByUserId, getUrlBySlug};