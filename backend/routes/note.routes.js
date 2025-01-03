import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  updateNoteTitle,
  updateNoteBody,
} from "../controllers/note.controller.js";

const noteRouter = express.Router();

// Create a new note
noteRouter.post("/create", createNote);

// Delete a note by ID
noteRouter.delete("/:id", deleteNote);

// Get a note by ID
noteRouter.get("/:id", getNote);

// Update a note's title by ID
noteRouter.put("/update-title/:id", updateNoteTitle);

// Update a note's body title by ID
noteRouter.put("/update-body/:id", updateNoteBody);

export default noteRouter;
