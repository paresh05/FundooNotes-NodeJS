/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : get the values from the controller and sends it to model and vice versa 
 * @file            : note.service.js
 * @author          : Paresh Praveen
 * @version         : 1.0
 * @since           : 7-Oct-2021
 *
 **************************************************************************/

const {
  createNote,
  findNote,
  findNoteId,
  updateNote,
  deleteNote,
} = require("../models/note.model.js");
/**
 * @description creates a new note using the function createNote
 * @param {string} title
 * @param {string} content
 * @param {ObjectId} userId
 * @returns err or note
 */
const createNewNote = (title, content, userId) => {
  return createNote(title, content, userId)
    .then((note) => {
      return note;
    })
    .catch((err) => {
      throw err;
    });
};
/**
 * @description retrieves all the notes using findNote function
 * @param {ObjectId} userId
 * @returns err or result
 */
const findAllNotes = (userId) => {
  return findNote(userId)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
/**
 * @description retrieves a note of the id passed using findNoteId function
 * @param {_id} findId
 * @param {ObjectId} userId
 * @returns err or result
 */
const findNoteById = (findId, userId) => {
  return findNoteId(findId, userId)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
/**
 * @description updates a note of the id passed using updateNote function
 * @param {_id} findId
 * @returns err or result
 */
const update = (findId, { title: title, content: content, userId: userId , isTrash:isTrash, color:color,image:image}) => {
  return updateNote(findId, { title: title, content: content, userId: userId, isTrash:isTrash,color:color,image:image})
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
/**
 * @description deletes a note of the id passed using deleteNote function
 * @param {_id} findId
 * @param {ObjectId} userId
 * @returns err or result
 */
const deleteById = (findId, userId) => {
  return deleteNote(findId, userId)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
module.exports = {
  createNewNote,
  findAllNotes,
  findNoteById,
  update,
  deleteById,
};
