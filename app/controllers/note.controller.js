const {
  createNewNote,
  findAllNotes,
  findNoteById,
  update,
  deleteById,
} = require("../service/note.service.js");
const logger = require("../logger");

exports.create = (req, res) => {  
  createNewNote(req.body.title || "Untitled Note", req.body.content)
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

exports.findAll = (req, res) => {
  findAllNotes()
    .then((notes) => {
      res.send(notes);
      logger.info("Successfully returned all the notes. ");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
      logger.error("Some error occurred while retrieving notes.");
    });
};

exports.findOne = (req, res) => {
  findNoteById(req.params.noteId)
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

exports.delete = (req, res) => {
  deleteById(req.params.noteId)
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
