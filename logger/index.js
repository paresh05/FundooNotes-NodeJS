const noteLogger = require('./noteLogger')
let logger = null;
if (process.env.NODE_ENV !== 'production') {
  logger = noteLogger();
  }
module.exports = logger;
