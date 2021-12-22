/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : logs the error or success mesaage
 * @file            : index.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/
const noteLogger = require("./noteLogger");
let logger = null;
logger = noteLogger();
module.exports = logger;
