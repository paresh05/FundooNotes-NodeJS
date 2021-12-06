/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : user routes for user url end points
 * @file            : user.routes.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const {
    validateWithJoi,
    validate,
    verifyResetToken
  } = require("../middleware/user.middleware.js");

  app.post("/users", validateWithJoi, users.create);

  app.get("/users", users.findAll);

  app.get("/users/:userId", users.findOne);

  app.put("/users/:userId", validate, users.update);

  app.delete("/users/:userId", users.delete);

  app.post("/users/login", users.loginUser);

  app.post("/users/login/forgotPassword", users.forgotPassword);

  app.post("/users/login/reset/:token",verifyResetToken, users.resetPassword);
};
