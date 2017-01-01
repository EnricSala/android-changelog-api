const router = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');

const baseUrl = 'https://play.google.com/store/apps/details?hl=en&id=';
const headers = { 'Accept-Language': 'en-US,en;q=0.8' };

router.get('/', (req, res, next) => {
    const packageName = req.query.package;

    if (!packageName) {
        const err = new Error('Undefined package');
        err.satus = 404;
        next(err);
    }

    const config = {
        url: baseUrl + packageName,
        headers: headers
    };

    request(config, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const changes = $('.recent-change')
                .map((i, elem) => $(elem).text())
                .get();
            res.json({ packageName, changes });
        } else {
            const err = new Error('Could not request changes');
            err.status = 404;
            next(err);
        }
    });
});

module.exports = router;
