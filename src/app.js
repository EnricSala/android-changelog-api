const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const auth = require('./service/auth');
const changelogsRoutes = require('./route/changelogs');

// Create app
const app = express();
app.set('etag', false);
app.set('x-powered-by', false);

// Configure middlewares
const logFormat =
    ':date[iso] :method ":url" res=:status'
    + ' time=:response-time size=:res[content-length]';
app.use(morgan(logFormat));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add routes after authentication
app.use(auth.validate);
app.use('/changelogs', changelogsRoutes);

// Map unknown requests to 404
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Catch all errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ message: err.message });
});

app.listen(process.env.PORT || 8080);
