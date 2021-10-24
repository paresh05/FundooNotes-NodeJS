/**
 * @requires dotenv
 * @requires jwt
 */
require("dotenv").config();
const jwt = require("jsonwebtoken");
/**
 * @description generates JWT token
 * @param {string} email
 */
exports.tokenGeneration = (email) => {
  return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
/**
 * @description Verifing the token
 * @param {String} token
 * @param {callback} callback
 * @returns err or data
 */
exports.tokenVerification = (token, callback) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};
