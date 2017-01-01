const router = require('express').Router();

const scraper = require('../service/scraper');

const baseUrl = 'https://play.google.com/store/apps/details?hl=en&id=';
const headers = { 'Accept-Language': 'en-US,en;q=0.8' };

router.get('/', (req, res, next) => {
    const packageName = req.query.package;

    if (!packageName) {
        const err = new Error('Undefined query');
        err.satus = 404;
        next(err);
    }

    scraper
        .scan(packageName)
        .then(result => {
            const changes = result.changes;
            res.json({ packageName, changes });
        })
        .catch(error => {
            const err = new Error('Could not request info');
            err.status = 404;
            next(err);
        });
});

module.exports = router;
