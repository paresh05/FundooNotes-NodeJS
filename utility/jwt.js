/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : generate and verifies json web token
 * @file            : jwt.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

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
exports.tokenGeneration = (data) => {
  return jwt.sign({email:data.email, userId: data._id}, process.env.ACCESS_TOKEN_SECRET, {
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
