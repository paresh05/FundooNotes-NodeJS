/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : set up the server and connects to the database
 * @file            : server.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const dbConfig = require("./config/dbConnect.js");
const logger = require("./logger/index");
const cors = require("cors")
const express = require("express");
require("dotenv");
const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(express.static("uploads"));

require("./app/routes/label.routes.js")(app);
require("./app/routes/note.routes.js")(app);
require("./app/routes/user.routes.js")(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || process.env.portNumber
console.log(PORT);
// listen for requests
module.exports = app.listen(PORT, () => {
  logger.info("Server is listening on port "+process.env.PORT)
  dbConfig();
});
