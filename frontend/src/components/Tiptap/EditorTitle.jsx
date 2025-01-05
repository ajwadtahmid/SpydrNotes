import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "./EditorTitle.css";

const EditorTitle = ({ noteId, noteTitle = "Untitled" }) => {
  const [title, setTitle] = useState(noteTitle !== "Untitled" ? noteTitle : "");
  const [isDirty, setIsDirty] = useState(false); // Track if the title has changed

  const saveTitle = async (updatedTitle) => {
    try {
      if (noteId && updatedTitle !== noteTitle) {
        await axiosInstance.put(`/api/notes/update-title/${noteId}`, {
          title: updatedTitle,
        });
        console.log("Title saved successfully:", updatedTitle);
      }
    } catch (error) {
      console.error("Error saving title:", error);
    }
  };

  const handleChange = (event) => {
    const updatedTitle = event.target.value;
    setTitle(updatedTitle);
    setIsDirty(true); // Set dirty flag when the title changes
    saveTitle(updatedTitle); // Save immediately
  };

  const handleBlur = () => {
    if (isDirty) {
      saveTitle(title); // Save when the input loses focus
      setIsDirty(false); // Reset dirty flag
    }
  };

  useEffect(() => {
    // Update the title state when noteTitle changes
    setTitle(noteTitle !== "Untitled" ? noteTitle : "");
    setIsDirty(false); // Reset dirty flag when a new note is loaded
  }, [noteTitle]);

  return (
    <div className="title-editor">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="Type your title..."
        className="title-input"
      />
    </div>
  );
};

export default EditorTitle;
