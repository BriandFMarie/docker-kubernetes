// Imports
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// To add logger
const logger = require('./src/config/logger');
const VoteController = require('./src/controllers/VoteController');

// Variables
const app = express();

app.use(helmet());
app.use(cors());

// To parse body of queries
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

const MONGO_URI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// Database Connection
mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => logger.info('Connection established successfully'))
    .then(() => new Promise((resolve, reject) => {
        app.listen(3000, resolve).on('error', reject);
    }))
    .then(() => logger.info(`Server is now running in ${process.env.NODE_ENV || 'development'} on port 3000`))
    .then(() => {
        app.use('/api/v1/vote', VoteController)
    })
    .catch(err => {
        logger.error(`Error: ${err}`);
        throw err;
    });
