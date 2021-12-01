const jwtUtil = require("../../utility/jwt");
const bcrypt = require("bcrypt");
const {
  createUser,
  findUser,
  findUsersId,
  findEmail,
  findSingleUserAndUpdate,
  deleteUser,
  reset,
} = require("../models/user.model.js");
/**
 * @description finds a user that matches the email id using findEmail function
 * @param {string} email
 * @param {string} password
 * @param {callback} callback
 */
const registerUser = (email, password, callback) => {
  findEmail(email, (err, data) => {
    if (err) {
      return callback(err, null);
    } else {
      if (data != null && bcrypt.compareSync(password, data.password)) {
        var token = jwtUtil.tokenGeneration(data);
        var result = {data: data,token:token};
        return callback(null, result);
      } else {
        return callback(err, null);
      }
    }
  });
};
/**
 * @description This function is used to reset the password using reset function
 * @param {string} token
 * @param {string} password
 * @param {callback} callback
 */
const createNewPassword = (userId, password, callback) => {
  reset(userId, password, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};
/**
 * @description This function generates a jwt token if the user with the email passed is found
 * @param {string} email
 * @param {callback} callback
 */
const checkEmail = (email, callback) => {
  findEmail(email, (err, data) => {
    if (data != null) {
      var tokenPassword = jwtUtil.tokenGeneration(data);
      var resultPassword = tokenPassword;
      return callback(null, resultPassword);
    } else {
      return callback(err, null);
    }
  });
};
/**
 * @description creates a new user using create user function
 * @param {callback} callback
 * @returns user or err
 */
const createNewUser = (
  { firstName, lastName, email, password },
  callback
) => {
  let user = createUser(
    { firstName, lastName, email, password },
    (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    }
  );
  return user;
};
/**
 * @description finds all the users using findUser function
 * @param {callback} callback
 */
const findAllUsers = (callback) => {
  findUser((err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};
/**
 * @description finds a user with id passed using findUsersId function
 * @param {_id} findUserId
 * @param {callback} callback
 */
const findUserById = (findUserId, callback) => {
  findUsersId(findUserId, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};
/**
 * @description updates the user of the id using updateUser function
 * @param {_id} findUserId
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {callback} callback
 */
const updateUser = (
  findUserId,
  firstName,
  lastName,
  email,
  callback
) => {
  findSingleUserAndUpdate(
    findUserId,
    firstName,
    lastName,
    email,
    (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    }
  );
};
/**
 * @description deletes the user using deleteUserById functon
 * @param {_id} findUserId
 * @param {callback} callback
 */
const deleteUserById = (findUserId, callback) => {
  deleteUser(findUserId, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};

module.exports = {
  registerUser,
  createNewUser,
  findAllUsers,
  findUserById,
  updateUser,
  checkEmail,
  createNewPassword,
  deleteUserById,
};
