import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  createNote,
  deleteNote,
  getNote,
  updateNoteTitle,
  updateNoteBody,
} from "../controllers/note.controller.js";

const noteRouter = express.Router();

// Create a new note
noteRouter.post("/create", protectedRoute, createNote);

// Delete a note by ID
noteRouter.delete("/:id", protectedRoute, deleteNote);

// Get a note by ID
noteRouter.get("/:id", protectedRoute, getNote);

// Update a note's title by ID
noteRouter.put("/update-title/:id", protectedRoute, updateNoteTitle);

// Update a note's body title by ID
noteRouter.put("/update-body/:id", protectedRoute, updateNoteBody);

export default noteRouter;
