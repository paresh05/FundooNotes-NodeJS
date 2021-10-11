const {
  createNote,
  findNote,
  findNoteId,
  updateNote,
  deleteNote,
} = require("../models/note.model.js");

const createNewNote = (title, content) => {
  let note = createNote(title, content)
    .then((result) => {
      return result;
    })
    .catch();
  return note;
};

//query to find all notes
const findAllNotes = () => {
  return findNote()
    .then((result) => {
      return result;
    })
    .catch();
};

//query to find a single note
const findNoteById = (findId) => {
  return findNoteId(findId)
    .then((result) => {
      return result;
    })
    .catch();
};

// Find note and update it with the request body
const update = (findId, { title: title, content: content }) => {
  return updateNote(findId, { title: title, content: content })
    .then((result) => {
      return result;
    })
    .catch();
};

//query to delete a note
const deleteById = (findId) => {
  return deleteNote(findId)
    .then((result) => {
      return result;
    })
    .catch();
};

module.exports = {
  createNewNote,
  findAllNotes,
  findNoteById,
  update,
  deleteById,
};
