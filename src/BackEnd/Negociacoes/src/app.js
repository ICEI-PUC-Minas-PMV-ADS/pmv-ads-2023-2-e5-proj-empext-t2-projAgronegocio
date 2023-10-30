const express = require('express');
const router = require('./router');
const bodyParser = require ('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(router);

module.exports = app;