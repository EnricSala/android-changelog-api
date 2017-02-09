const request = require('request-promise');
const cheerio = require('cheerio');

const BASE_URL = 'https://play.google.com/store/apps/details?hl=en&id=';
const HEADERS = { 'Accept-Language': 'en-US,en;q=0.8' };

function scan(packageName) {
    const cleanPackageName = clean(packageName);
    const config = {
        url: BASE_URL + cleanPackageName,
        headers: HEADERS
    };
    return request(config)
        .then(html => {
            const $ = cheerio.load(html);
            changesList = $('.recent-change')
                .map((i, elem) => $(elem).text())
                .get();
            return result = {
                packageName: cleanPackageName,
                changes: changesList
            };
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
