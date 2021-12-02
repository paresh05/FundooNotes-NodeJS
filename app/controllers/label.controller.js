const {
  createNewLabel,
  findAllLabel,
  findLabelById,
  update,
  deleteById,
} = require("../service/label.service.js");
const logger = require("../../logger");
/**
 * @description Handles request and response for creating a new Label
 * @param {Object} req
 * @param {Object} res
 */
exports.create = async (req, res) => {
  try {
    let data = await createNewLabel(req.body.name, req.body.userId);
    logger.info("Successfully created the Label");
    return res.send(data);
  } catch (err) {
    logger.error("Some error occurred while creating the Label.");
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the Label.",
    });
  }
};
/**
 * @description Handles request and response for finding all the Labels
 * @param {Object} req
 * @param {Object} res
 */
exports.findAll = async (req, res) => {
  try {
    let data = await findAllLabel(req.body.userId);
    logger.info("Successfully returned all the labels. ");
    return res.send(data);
  } catch (err) {
    logger.error("Invalid UserId");
    return res.status(500).send({
      message: "Invalid UserId",
    });
  }
};
/**
 * @description Handles request and response for finding a Label using labelId
 * @param {Object} req
 * @param {Object} res
 */
exports.findOne = async (req, res) => {
  try {
    let data = await findLabelById(req.params.labelId, req.body.userId);
    if (!data) {
      logger.error("Label not found");
      return res.status(404).send({
        message: "Label not found with id " + req.params.labelId,
      });
    }
    logger.info("Successfully found the Label ");
    return res.send(data);
  } catch (err) {
    if (err.kind === "ObjectId") {
      logger.error("Label not found");
      return res.status(404).send({
        message: "Label not found with id " + req.params.labelId,
      });
    }
    logger.error("Error retrieving Label");
    return res.status(500).send({
      message: "Error retrieving Label with id " + req.params.labelId,
    });
  }
};
/**
 * @description Handles request and response for updating a Label
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
exports.update = async (req, res) => {
  try {
    let data = await update(
      req.params.labelId,
      { name: req.body.name, userId: req.body.userId },
      { new: true }
    );
    if (!data) {
      logger.error("Label not found");
      return res.status(404).send({
        message: "Label not found with id " + req.params.labelId,
      });
    }
    logger.info("Successfully updated the Label");
    return res.send(data);
  } catch (err) {
    if (err.kind === "ObjectId") {
      logger.error("Label not found ");
      return res.status(404).send({
        message: "Label not found with id " + req.params.labelId,
      });
    }
    logger.error("Error retrieving Label");
    return res.status(500).send({
      message: "Error updating Label with id " + req.params.labelId,
    });
  }
};
/**
 * @description Handles request and response for deleting a Label
 * @param {Object} req
 * @param {Object} res
 */
exports.delete = async (req, res) => {
  try {
    let data = await deleteById(req.params.labelId, req.body.userId);
    if (!data) {
      logger.error("Label not found");
      return res.status(404).send({
        message: "Label not found with id " + req.params.labelId,
      });
    }
    logger.info("Successfully deleted the Label");
    return res.send({ message: "Label deleted successfully!" });
  } catch (err) {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      logger.error("Label not found");
      return res.status(404).send({
        message: "Label not found with id " + req.params.labelId,
      });
    }
    logger.error("Error retrieving Label");
    return res.status(500).send({
      message: "Could not delete Label with id " + req.params.labelId,
    });
  }
};
