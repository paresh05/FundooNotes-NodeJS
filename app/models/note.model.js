const mongoose = require("mongoose");
const {User} = require("../models/user.model")
const NoteSchema = mongoose.Schema(
  {
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

const createNote = (title, content) => {
  const note = new Note({
    title: title || "Untitled Note",
    content: content,
  });
  return note
    .save()
    .then((result) => {
      return result;
    })
    .catch(err =>{return err});
};

const findNote = () => {
  return Note.find()
    .then((result) => {
      return result;
    })
    .catch(err =>{return err});
};
const findNoteId = (findId) => {
  return Note.findById(findId)
    .then((result) => {
      return result;
    }).catch ( err =>{
    return err});
};
const updateNote = (findId, { title: title, content: content }) => {
  return Note.findByIdAndUpdate(
    findId,
    { title: title, content: content },
    { new: true }
  )
    .then((result) => {
      return result;
    })
    .catch(err =>{return err});
};
const deleteNote = (findId) => {
  return Note.findByIdAndRemove(findId)
    .then((result) => {
      return result;
    })
    .catch(err =>{return err});
};
module.exports = { createNote, findNote, findNoteId, updateNote, deleteNote };
