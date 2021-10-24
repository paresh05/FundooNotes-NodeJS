const {
  registerUser,
  createNewUser,
  findAllUsers,
  findUserById,
  checkEmail,
  updateUser,
  deleteUserById,
  createNewPassword,
} = require("../service/user.service.js");
const logger = require("../../logger");
const {
  createEmail,
  forgotPasswordEmail,
} = require("../../utility/nodemailer");
/**
 * @description handles request and response for logging in a user
 * @param {Object} req
 * @param {Object} res
 */
exports.loginUser = (req, res) => {
  registerUser(req.body.email, req.body.password, (err, user) => {
    if (err) {
      if (err.kind === "ObjectId") {
        logger.error("User not found");
        return res.status(404).send({
          message: "Invalid User Credentials ",
        });
      }
      logger.error("Error retrieving user");
      return res.status(500).send({
        message: "Error retrieving user with email " + req.body.email,
      });
    }
    if (!user) {
      logger.error("User not found");
      return res.status(404).send({
        message: "Invalid User Credentials",
      });
    }
    logger.info("Successfully found the user ");
    res.send(user);
    createEmail();
  });
};
/**
 * @description handles request and response for forgot password
 * @param {Object} req
 * @param {Object} res
 */
exports.forgotPassword = (req, res) => {
  checkEmail(req.body.email, (err, user) => {
    if (err) {
      if (err.kind === "ObjectId") {
        logger.error("User not found");
        return res.status(404).send({
          message: "Invalid User Credentials ",
        });
      }
      logger.error("Error retrieving user");
      return res.status(500).send({
        message: "Error retrieving user with email " + req.body.email,
      });
    }
    if (!user) {
      logger.error("User not found");
      return res.status(404).send({
        message: "Invalid User Credentials",
      });
    }
    logger.info("Successfully found the user ");
    forgotPasswordEmail(req.body.email, user);
    res.json({ mesaage: "Reset link sent to the your Email " });
  });
};
/**
 * @description handles request and response for reset password
 * @param {Object} req
 * @param {Object} res
 */
exports.resetPassword = (req, res) => {
  let token = req.params.token;
  let passwordReset = req.body.password;
  createNewPassword(token, passwordReset, (err, data) => {
    if (err) {
      if (err.kind === "ObjectId") {
        logger.error("Error while reseting the password");
        return res.status(404).send({
          message: "Error while reseting the password",
        });
      }
      logger.error("Error while reseting the password ");
      return res.status(500).send({
        message: "Error while reseting the password",
      });
    }
    if (!data) {
      logger.error("Error while reseting the password");
      return res.status(404).send({
        message: "Error while reseting the password",
      });
    }
    logger.info("Successfully reset the passeord");
    res.json({ mesaage: "Password has been Reset Successfully!!" });
  });
};
/**
 * @description handles request and response for creating a new user
 * @param {Object} req
 * @param {Object} res
 */
exports.create = (req, res) => {
  createNewUser(req.body, (err, dataUser) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
      logger.error("Some error occurred while creating the user.");
    }
    res.send(dataUser);
    logger.info("Successfully created the user");
  });
};
/**
 * @description handles request and response for finding all the users
 * @param {Object} req
 * @param {Object} res
 */
exports.findAll = (req, res) => {
  findAllUsers((err, user) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
      logger.error("Some error occurred while retrieving users.");
    }
    res.send(user);
    logger.info("Successfully returned all the users. ");
  });
};
/**
 * @description handles request and response for finding a user using id
 * @param {Object} req
 * @param {Object} res
 */
exports.findOne = (req, res) => {
  findUserById(req.params.userId, (err, user) => {
    if (err) {
      if (err.kind === "ObjectId") {
        logger.error("User not found");
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      logger.error("Error retrieving user");
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    }
    if (!user) {
      logger.error("User not found");
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }
    res.send(user);
    logger.info("Successfully found the user ");
  });
};
/**
 * @description handles request and response for updating a user
 * @param {Object} req
 * @param {Object} res
 */
exports.update = (req, res) => {
  let id = req.params.userId;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let mobileNumber = req.body.mobileNumber;
  updateUser(id, firstName, lastName, email, mobileNumber, (err, user) => {
    if (err) {
      if (err.kind === "ObjectId") {
        logger.error("User not found ");
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      logger.error("Error retrieving user");
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId,
      });
    }
    if (!user) {
      logger.error("user not found");
      return res.status(404).send({
        message: "user not found with id " + req.params.userId,
      });
    }
    res.send(user);
    logger.info("Successfully updated the user");
  });
};
/**
 * @description handles request and response for deleting a user
 * @param {Object} req
 * @param {Object} res
 */
exports.delete = (req, res) => {
  deleteUserById(req.params.userId, (err, user) => {
    if (err) {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        logger.error("User not found");
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      logger.error("Error retrieving user");
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId,
      });
    }
    if (!user) {
      logger.error("User not found");
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }
    res.send({ message: "User deleted successfully!" });
    logger.info("Successfully deleted the user");
  });
};
