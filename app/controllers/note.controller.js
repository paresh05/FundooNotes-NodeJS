const {
  createNewNote,
  findAllNotes,
  findNoteById,
  update,
  deleteById,
} = require("../service/note.service.js");
const logger = require("../../logger");
/**
 * @description Handles request and response for creating a new note
 * @param {Object} req
 * @param {Object} res
 */
exports.create = (req, res) => {
  createNewNote(req.body.title, req.body.content, req.body.userId)
    .then((data) => {
      res.send(data);
      logger.info("Successfully created the note");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
      logger.error("Some error occurred while creating the Note.");
    });
};
/**
 * @description Handles request and response for finding all the notes
 * @param {Object} req
 * @param {Object} res
 */
exports.findAll = (req, res) => {
  findAllNotes(req.body.userId)
    .then((notes) => {
      res.send(notes);
      logger.info("Successfully returned all the notes. ");
    })
    .catch((err) => {
      res.status(500).send({
        message: "Invalid UserId",
      });
      logger.error("Invalid UserId");
    });
};
/**
 * @description Handles request and response for finding a note using noteId
 * @param {Object} req
 * @param {Object} res
 */
exports.findOne = (req, res) => {
  findNoteById(req.params.noteId, req.body.userId)
    .then((note) => {
      if (!note) {
        logger.error("Note not found");
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
      logger.info("Successfully found the note ");
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        logger.error("Note not found");
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      logger.error("Error retrieving note");
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId,
      });
    });
};
/**
 * @description Handles request and response for updating a note
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
exports.update = (req, res) => {
  if (!req.body.content) {
    logger.error("Note content can not be empty");
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
  update(
    req.params.noteId,
    {
      title: req.body.title || "Untitled Note",
      content: req.body.content,
      userId: req.body.userId,
      isTrash: req.body.isTrash,
      color:req.body.color,
      image:req.body.image
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        logger.error("Note not found");
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
      logger.info("Successfully updated the note");
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        logger.error("Note not found ");
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      logger.error("Error retrieving note");
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId,
      });
    });
};
/**
 * @description Handles request and response for deleting a note
 * @param {Object} req
 * @param {Object} res
 */
exports.delete = (req, res) => {
  deleteById(req.params.noteId, req.body.userId)
    .then((note) => {
      if (!note) {
        logger.error("Note not found");
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send({ message: "Note deleted successfully!" });
      logger.info("Successfully deleted the note");
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        logger.error("Note not found");
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      logger.error("Error retrieving note");
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId,
      });
    });
};
