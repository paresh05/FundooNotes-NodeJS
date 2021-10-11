const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
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
    .catch();
};
const findNote = () => {
  return Note.find()
    .then((result) => {
      return result;
    })
    .catch();
};
const findNoteId = (findId) => {
  return Note.findById(findId)
    .then((result) => {
      return result;
    })
    .catch();
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
    .catch();
};
const deleteNote = (findId) => {
  return Note.findByIdAndRemove(findId)
    .then((result) => {
      return result;
    })
    .catch();
};
module.exports = { createNote, findNote, findNoteId, updateNote, deleteNote };
