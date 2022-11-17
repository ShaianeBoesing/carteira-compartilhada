const express = require('express');
const app = express();

const routes = require('../app/routes');
app.use('/', routes);

module.exports = app;
