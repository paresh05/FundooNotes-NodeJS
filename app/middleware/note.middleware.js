/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : Handles the validation and token verification of notes
 * @file            : note.middleware.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/

/**
 * @requires logger
 * @requires jwt
 */
const logger = require("../../logger");
const jwtUtil = require("../../utility/jwt");
/**
 * @description validates the title of the note using regex
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns
 */
const validation = (req, res, next) => {
  if (!req.body.content) {
    logger.error("Not content can not be empty (handled by middleware)");
    return res.status(400).send({
      message: "Not content can not be empty (handled by middleware)",
    });
  }
  var pattern = new RegExp("(^[a-zA-z]+([\\s][a-zA-Z]+)*$)");
  if (!pattern.test(req.body.title)) {
    logger.error("Not a valid title name");
    return res.status(400).send({
      message: "Not a valid title name",
    });
  } else {
    next();
  }
};
/**
 * @description This function is used to verify the jwt token
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization || req.headers.access_token;
  if (!bearerHeader) {
    res.send("Token is empty");
  }
  const token = bearerHeader;
  jwtUtil.tokenVerification(token, (err, data) => {
    if (err) {
      res.send(err);
    }
    req.body.userId = data.userId;
    next();
  });
};
module.exports = {
  validation,
  verifyToken,
};
