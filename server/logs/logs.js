const winston = require('winston');
exports.infologger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/info.log',
      json: true,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss A ZZ'
        }),
        winston.format.json()
      ),
    }),
    new winston.transports.Console,
  ],
  
});

exports.errorlogger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: './logs/errors.log',
      json: true,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss A ZZ'
        }),
        winston.format.json()
      ),
    }),
    new winston.transports.Console,
  ],
  
});


