const express = require('express');
const Morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');

const app = express();

app.use(Morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);

// catch 404 and forward to error handler
const handle404 = function handle404(req, res) {
  res.sendStatus(404);
};

app.use(handle404);

module.exports = app;
