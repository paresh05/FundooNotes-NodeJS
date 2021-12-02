/**
 * @requires logger
 * @requires jwt
 */
const logger = require("../../logger");
const jwtUtil = require("../../utility/jwt");
/**
 * @description validates the title of the label using regex
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns
 */
const labelValidation = (req, res, next) => {
  var pattern = new RegExp("(^[a-zA-z]+([\\s][a-zA-Z]+)*$)");
  if (!pattern.test(req.body.name)) {
    logger.error("Not a valid name");
    return res.status(400).send({
      message: "Not a valid name",
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
const verifyLabelToken = (req, res, next) => {
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
  labelValidation,
  verifyLabelToken,
};
