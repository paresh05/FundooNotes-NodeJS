/**
 * @requires mongoose
 */
const mongoose = require("mongoose");
/**
 * @description Creates a Note collection
 */
const LabelSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Label = mongoose.model("Label", LabelSchema);
/**
 * @description This function creates a new label
 * @param {string} name
 * @returns result or err
 */
const createLabel = async (name, userId) => {
  const label = new Label({
    name: name,
    userId: userId,
  });
  try {
    return await label.save();
  } catch (error) {
    throw error;
  }
};
/**
 * @description This function is used to get all the labels
 * @param {ObjectId} userId
 * @returns
 */
const findLabel = async (userId) => {
  try {
    return await Label.find({ userId: userId });
  } catch (err) {
    throw err;
  }
};
/**
 * @description This function is used to get a label of the id passed
 * @param {_id} findId
 * @param {ObjectId} userId
 * @returns
 */
const findLabelId = async (findId, userId) => {
  try {
    return await Label.findById(findId).findOne({ userId: userId });
  } catch (err) {
    throw err;
  }
};
/**
 * @description This function is used to update a label of the id passed
 * @param {ObjectId} findId
 * @returns
 */
const updateLabel = async (findId, { name: name, userId: userId }) => {
  try {
    return await Label.findByIdAndUpdate(
      findId,
      { name: name, userId: userId },
      { new: true }
    );
  } catch (err) {
    throw err;
  }
};
/**
 * @description This function is used to delete a label of the id passed
 * @param {ObjectId} findId
 * @param {_id} userId
 * @returns
 */
const deleteLabel = async (findId, userId) => {
  try {
    return await Label.findById(findId).findOneAndDelete({ userId: userId });
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createLabel,
  findLabel,
  findLabelId,
  updateLabel,
  deleteLabel,
};
