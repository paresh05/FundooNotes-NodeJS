const {
  createLabel,
  findLabel,
  findLabelId,
  updateLabel,
  deleteLabel,
} = require("../models/label.model.js");
/**
 * @description creates a new label using the function createLabel
 * @param {string} name
 * @param {ObjectId} userId
 * @returns err or note
 */
const createNewLabel = async (name, userId) => {
  try {
    return await createLabel(name, userId);
  } catch (err) {
    throw err;
  }
};
/**
 * @description retrieves all the labels using findLabel function
 * @param {ObjectId} userId
 * @returns err or result
 */
const findAllLabel = async (userId) => {
  try {
    return await findLabel(userId);
  } catch (err) {
    throw err;
  }
};
/**
 * @description retrieves a Label of the id passed using findLabelId function
 * @param {_id} findId
 * @param {ObjectId} userId
 * @returns err or result
 */
const findLabelById = async (findId, userId) => {
  try {
    return await findLabelId(findId, userId);
  } catch (err) {
    throw err;
  }
};
/**
 * @description updates a Label of the id passed using updateLabel function
 * @param {_id} findId
 * @returns err or result
 */
const update = async (findId, { name: name, userId: userId }) => {
  try {
    return await updateLabel(findId, { name: name, userId: userId });
  } catch (err) {
    throw err;
  }
};
/**
 * @description deletes a Label of the id passed using deleteLabel function
 * @param {_id} findId
 * @param {ObjectId} userId
 * @returns err or result
 */
const deleteById = async (findId, userId) => {
  try {
    return await deleteLabel(findId, userId);
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createNewLabel,
  findAllLabel,
  findLabelById,
  update,
  deleteById,
};
