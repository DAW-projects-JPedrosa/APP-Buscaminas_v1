require("dotenv").config();

const express = require('express');

const app = express();

const cors = require('cors')

app.use(express.json());

app.use(cors());

module.exports = app;

require('./controllers/gameController');
require('./swagger/swaggerController');

app.get('/welcome', (request, result) => {
    result.status(200).send("Welcome user!");
});