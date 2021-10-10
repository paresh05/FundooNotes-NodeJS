const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const myFormat = printf(({ level, message, timestamp }) => {
    return ` [${level}] ${timestamp} ${message}`;
  });
const noteLogger = () =>{
    return createLogger({
        level: 'info',
        format: combine(
            timestamp({format: "DD-MMM-YYYY HH:mm:ss"}),
            myFormat
          ),
        transports: [
          new transports.File({filename:'./app/logger/server.log'}),
        ]
      });
}

module.exports = noteLogger;