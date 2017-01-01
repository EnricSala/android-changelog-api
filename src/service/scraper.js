const request = require('request-promise');
const cheerio = require('cheerio');

const baseUrl = 'https://play.google.com/store/apps/details?hl=en&id=';
const headers = { 'Accept-Language': 'en-US,en;q=0.8' };

function scan(packageName) {
    const config = {
        url: baseUrl + packageName,
        headers: headers
    };
    return request(config)
        .then(html => {
            const $ = cheerio.load(html);
            changes = $('.recent-change')
                .map((i, elem) => $(elem).text())
                .get();
            return result = { changes };
        });
}

module.exports = { scan };
