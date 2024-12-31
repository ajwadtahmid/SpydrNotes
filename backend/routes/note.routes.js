import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  updateNote,
} from "../controllers/note.controller.js";

const noteRouter = express.Router();

// /api/note/create
noteRouter.post("/create", createNote);

// /api/note/:noteId
noteRouter.delete("/:id", deleteNote);

// /api/note/:noteId
noteRouter.get("/:id", getNote);

// /api/note/update/:noteId
noteRouter.put("/update/:id", updateNote);

export default noteRouter;
