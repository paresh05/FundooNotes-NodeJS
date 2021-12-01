/**
 * @requires mongoose
 */
const mongoose = require("mongoose");
/**
 * @description Creates a Note collection
 */
const NoteSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    content: String,
    isTrash:Boolean,
    color: String,
    image: String,
  },
  {
    timestamps: true,
  }
);
const Note = mongoose.model("Note", NoteSchema);
/**
 * @description This function creates a new note
 * @param {string} title
 * @param {string} content
 * @param {ObjectId} userId
 * @returns result or err
 */
const createNote = (title, content, userId) => {
  const note = new Note({
    title: title || "Untitled Note",
    content: content,
    userId: userId,
    isTrash: false,
    color:"rgb(255, 255, 255)",
    image:"",
  });
  return note
    .save()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
/**
 * @description This function is used to get all the notes
 * @param {ObjectId} userId
 * @returns
 */
const findNote = (userId) => {
  return Note.find({ userId: userId })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
/**
 * @description This function is used to get a note of the id passed
 * @param {_id} findId
 * @param {ObjectId} userId
 * @returns
 */
const findNoteId = (findId, userId) => {
  return Note.findById(findId)
    .findOne({ userId: userId })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
/**
 * @description This function is used to update a note of the id passed
 * @param {ObjectId} findId
 * @returns
 */
const updateNote = (
  findId,
  { title: title, content: content, userId: userId ,isTrash: isTrash, color:color,image:image}
) => {
  return Note.findByIdAndUpdate(
    findId,
    { title: title, content: content, userId: userId, isTrash: isTrash,color:color,image:image},
    { new: true }
  )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
/**
 * @description This function is used to delete a note of the id passed
 * @param {ObjectId} findId
 * @param {_id} userId
 * @returns
 */
const deleteNote = (findId, userId) => {
  return Note.findById(findId)
    .findOneAndDelete({ userId: userId })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
module.exports = { createNote, findNote, findNoteId, updateNote, deleteNote };
