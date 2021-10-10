const Note = require("../models/note.model.js");
const logger = require('../logger');
// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    logger.error('Note content can not be empty');
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  // Create a Note
  const note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content,
  });

  // Save Note in the database
  note
    .save()
    .then((data) => {
      res.send(data);
      logger.info('Successfully created the note');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
      logger.error('Some error occurred while creating the Note.');
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Note.find()
    .then((notes) => {
      res.send(notes);
      logger.info('Successfully returned all the notes. ');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
      logger.error("Some error occurred while retrieving notes.")
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then((note) => {
      if (!note) {
        logger.error("Note not found");
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
      logger.info('Successfully found the note ');
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

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    logger.error("Note content can not be empty");
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  // Find note and update it with the request body
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || "Untitled Note",
      content: req.body.content,
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

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
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