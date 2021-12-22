/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : configure data base
 * @file            : database.config.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/
require("dotenv").config();
module.exports = {
  url: process.env.MONGO_URL
};