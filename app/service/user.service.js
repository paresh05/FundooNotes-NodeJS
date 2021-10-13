const {
  createUser,
  findUser,
  findUsersId,
  findSingleUserAndUpdate,
  deleteUser,
} = require("../models/user.model.js");

const createNewUser = (
  { firstName, lastName, email, mobileNumber },
  callback
) => {
  let user = createUser(
    { firstName, lastName, email, mobileNumber },
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
  createNewUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUserById,
};
