import User from "../models/user.model.js";
import Note from "../models/note.model.js";

export const createNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Use provided title and body or default if not provided
    const { title, body } = req.body;
    const newNote = new Note({
      title: title || "Untitled",
      body: body || "",
    });

    if (newNote) {
      await newNote.save();
      user.notes.push(newNote._id); // Add the new note to user's notes
      await user.save();
      res
        .status(201)
        .json({ message: "Note created successfully", note: newNote });
    } else {
      res.status(400).json({ error: "Unable to create new note" });
    }
  } catch (error) {
    console.log("Error in createNote controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    const userId = req.user._id; // Assuming req.user contains the logged-in user's details
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the note from the user's notes array
    await User.findByIdAndUpdate(userId, {
      $pull: { notes: req.params.id },
    });

    res.status(200).json({ message: "Note deleted successfully", deletedNote });
  } catch (error) {
    console.log("Error in deleteNote controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    return res.status(200).json({ note });
  } catch (error) {
    console.log("Error in getNote controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateNoteBody = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const { body } = req.body;

    note.body = body;
    await note.save();
    res.status(200).json({ message: "Body updated successfully", note });
  } catch (error) {
    console.log("Error in updateNoteBody controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update a note's title
export const updateNoteTitle = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const { title } = req.body;
    note.title = title;
    await note.save();

    res.status(200).json({ message: "Title updated successfully", note: note });
  } catch (error) {
    console.error("Error updating title:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the title" });
  }
};
