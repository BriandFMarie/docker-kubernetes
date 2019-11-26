/////////////////////
// External imports
////////////////////

const winston = require('winston');


/////////////////////
// Configuration
////////////////////

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.align(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({ colorize: true })
    ]
});

/////////////////////
// Modules to export
////////////////////

module.exports = logger;
