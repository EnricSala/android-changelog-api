const API_KEY = process.env.API_KEY;

function validate(req, res, next) {
    const key = req.get('x-api-key');
    if (key === API_KEY) {
        next();
    } else {
        res.status(401).send('Invalid authorization');
    }
}

module.exports = { validate };
