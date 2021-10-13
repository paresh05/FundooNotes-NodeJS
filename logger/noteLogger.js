require('winston-daily-rotate-file');
const { json } = require('express');
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const myFormat = printf(({ level, message, timestamp }) => {
  return ` [${level}] ${timestamp} ${message}`;
});
const noteLogger = () => {
  return createLogger({
    level: "info",
    format: combine(
      timestamp({ format: "DD-MMM-YYYY HH:mm:ss" }),
      myFormat,
      format.json()
    ),
    transports: [new transports.DailyRotateFile({
      filename: './logger/server-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })],
  });
};
module.exports = noteLogger;
