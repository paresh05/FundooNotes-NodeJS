/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : conects the database
 * @file            : multer.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const mongoose = require("mongoose");
const dbConfig = require("./database.config.js");
const logger = require("../logger")
// Connecting to the database
const dbConnect = () => {
    mongoose
    .connect(dbConfig.url, {
      useNewUrlParser: true,
    })
    .then(() => {
      logger.info("Successfully connected to the database")
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      logger.info("Could not connect to the database. Exiting now...", err)
      console.log("Could not connect to the database. Exiting now...", err);
      process.exit();
    });
};
module.exports = dbConnect;