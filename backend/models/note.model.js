import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      unique: false,
      default: "Untitled",
    },
    body: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
