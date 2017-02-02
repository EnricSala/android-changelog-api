const router = require('express').Router();

const scraper = require('../service/scraper');

router.get('/:package/latest', (req, res, next) => {
    const packageName = req.params.package;

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
