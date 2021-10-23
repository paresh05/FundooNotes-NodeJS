module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const {
    validateWithJoi,
    validate,
  } = require("../middleware/user.middleware.js");

  app.post("/users", validateWithJoi, users.create);

  app.get("/users", users.findAll);

  app.get("/users/:userId", users.findOne);

  app.put("/users/:userId", validate, users.update);

  app.delete("/users/:userId", users.delete);

  app.post("/users/login", users.loginUser);

  app.post("/users/login/forgotPassword", users.forgotPassword);

  app.post("/users/login/reset/:token", users.resetPassword);
};
