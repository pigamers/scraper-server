const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeData(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const companyData = {
        name: $('meta[property="og:site_name"]').attr('content') || $('title').text() || 'N/A',
        description: $('meta[name="description"]').attr('content') || 'N/A',
        logo: $('meta[property="og:image"]').attr('content') || $('link[rel="icon"]').attr('href') || 'N/A',
        facebook: $('a[href*="facebook.com"]').attr('href') || 'N/A',
        linkedin: $('a[href*="linkedin.com"]').attr('href') || 'N/A',
        twitter: $('a[href*="twitter.com"]').attr('href') || 'N/A',
        instagram: $('a[href*="instagram.com"]').attr('href') || 'N/A',
        address: $('address').text() || 'N/A',
        phone: $('a[href^="tel:"]').text() || 'N/A',
        email: $('a[href^="mailto:"]').text() || 'N/A',
    };

    return companyData;
}

module.exports = scrapeData;
