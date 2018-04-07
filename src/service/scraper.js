const request = require('request-promise');
const cheerio = require('cheerio');
const crypto = require('crypto');

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
            changesList = parseChanges(html);
            return result = {
                packageName: cleanPackageName,
                changes: changesList,
                changesHash: hash(changesList.join())
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

function hash(payload) {
    return crypto.createHash('md5')
        .update(payload, 'utf8')
        .digest('base64');
}

function parseChanges(html) {
    const whatsNew = '>What&#39;s New<';
    const contentOpen = '<content>';
    const contentClose = '</content>';
    const whatsNewIdx = html.indexOf(whatsNew);
    if (whatsNewIdx < 0) return [];
    const changesStartIdx = html.indexOf(contentOpen, whatsNewIdx) + contentOpen.length;
    const changesEndIdx = html.indexOf(contentClose, changesStartIdx);
    const changesHtml = html.substring(changesStartIdx, changesEndIdx);
    const changesList = changesHtml.split('<br>')
        .map(it => it.trim())
        .map(it => cheerio.load(it).text())
        .filter(it => it.length > 0);
    return changesList;
}

module.exports = { scan };
