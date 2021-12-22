/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : Handles request and response for CRUD operations of user
 * @file            : user.controller.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/

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
  checkEmail(req.body.email, (err, token) => {
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
    if (!token) {
      logger.error("User not found");
      return res.status(404).send({
        message: "Invalid User Credentials",
      });
    }
    logger.info("Successfully found the user ");
    forgotPasswordEmail(req.body.email, token);
    res.json({ mesaage: "Reset link sent to the your Email " });
  });
};
/**
 * @description handles request and response for reset password
 * @param {Object} req
 * @param {Object} res
 */
exports.resetPassword = (req, res) => {
  let passwordReset = req.body.password;
  let userId = req.body.userId;
  createNewPassword(userId , passwordReset, (err, data) => {
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
exports.findAll = async(req, res) => {
  try {
    let data = await findAllUsers();
    logger.info("Successfully returned all the users.");
    return res.send(data);
  } catch (err) {
    logger.error("Some error occurred while retrieving users.");
    return res.status(500).send({
      message: "Some error occurred while retrieving users.",
    });
  }
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
  updateUser(id, firstName, lastName, email, (err, user) => {
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
