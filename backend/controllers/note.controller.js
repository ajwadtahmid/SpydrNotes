import User from "../models/user.model.js";
import Note from "../models/note.model.js";

// export const createNote = async (req, res) => {
//     try {
//         const newNote = new Note({
//             title: "Untitled",
//             body: "",
//         })
    
//         if (newNote) {
//             await newNote.save(); // save the new note to the database
//             res.redirect(`/notes/update/${newNote._id}`); // redirect to the update page of the new note
//         } else {
//             res.status(400).json({ error: "Unable to create new note" });
//         }
//     } catch (error) {
//         console.log("Error in createNote controller: ", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

export const createNote = async (req, res) => {
    try {
        const newNote = new Note({
            title: "Untitled",
            body: "",
        })
    
        if (newNote) {
            await newNote.save(); // save the new note to the database
            res.status(201).json(newNote);
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

export const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        const { title, body } = req.body;

        note.title = title;
        note.body = body;
        await note.save();
        res.status(200).json({ message: "Note updated successfully", note });
    } catch (error) {
        console.log("Error in updateNote controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};