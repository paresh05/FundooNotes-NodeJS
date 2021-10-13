const {
  createNewUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUserById,
} = require("../service/user.service.js");
const logger = require("../../logger");

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