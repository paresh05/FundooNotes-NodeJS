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

const registerUser = (email, password, callback) => {
  findEmail(email, (err, data) => {
    if (err) {
      return callback(err, null);
    } else {
      if (data != null && bcrypt.compareSync(password, data.password)) {
        var token = jwtUtil.tokenGeneration(email);
        var result = data + "Token:" + token;
        return callback(null, result);
      } else {
        return callback(err, null);
      }
    }
  });
};

const createNewPassword = (token, password, callback) => {
  reset(token, password, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};

const checkEmail = (email, callback) => {
  findEmail(email, (err, data) => {
    if (data != null) {
      var tokenPassword = jwtUtil.tokenGeneration(email);
      var resultPassword = tokenPassword;
      return callback(null, resultPassword);
    } else {
      return callback(err, null);
    }
  });
};

const createNewUser = (
  { firstName, lastName, email, mobileNumber, password },
  callback
) => {
  let user = createUser(
    { firstName, lastName, email, mobileNumber, password },
    (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    }
  );
  return user;
};

const findAllUsers = (callback) => {
  findUser((err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};

const findUserById = (findUserId, callback) => {
  findUsersId(findUserId, (err, data) => {
    return err ? callback(err, null) : callback(null, data);
  });
};

const updateUser = (
  findUserId,
  firstName,
  lastName,
  email,
  mobileNumber,
  callback
) => {
  findSingleUserAndUpdate(
    findUserId,
    firstName,
    lastName,
    email,
    mobileNumber,
    (err, data) => {
      return err ? callback(err, null) : callback(null, data);
    }
  );
};

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
