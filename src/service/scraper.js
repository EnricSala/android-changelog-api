const request = require('request-promise');
const cheerio = require('cheerio');

const baseUrl = 'https://play.google.com/store/apps/details?hl=en&id=';
const headers = { 'Accept-Language': 'en-US,en;q=0.8' };

function scan(packageName) {
    const config = {
        url: baseUrl + clean(packageName),
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

function clean(packageName) {
    const MAX_PACKAGE_LENGTH = 100;
    const NON_ALLOWED_CHARS = /[^\w\.]/g;
    return packageName
        .substr(0, MAX_PACKAGE_LENGTH)
        .replace(NON_ALLOWED_CHARS, '');
}

module.exports = { scan };
