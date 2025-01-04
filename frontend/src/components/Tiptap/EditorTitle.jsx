import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "./EditorTitle.css";

const EditorTitle = ({ noteId, noteTitle = "Untitled" }) => {
  const [title, setTitle] = useState(noteTitle !== "Untitled" ? noteTitle : "");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [isDirty, setIsDirty] = useState(false); // Track if the title has changed

  const handleChange = (event) => {
    setTitle(event.target.value);
    setIsDirty(true); // Set isDirty to true when the title changes
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [title]);

  // Save the title directly to the API
  useEffect(() => {
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

    if (isDirty && debouncedTitle !== noteTitle) {
      saveTitle(debouncedTitle); // Save only if dirty and different from initial title
      setIsDirty(false); // Reset dirty flag after saving
    }
  }, [debouncedTitle, noteTitle, isDirty, noteId]);

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




// import React, { useState } from "react";
// import "./EditorTitle.css";

// const EditorTitle = () => {
//   const [title, setTitle] = useState("");

//   const handleChange = (event) => {
//     setTitle(event.target.value);
//   };

//   return (
//     <div className="title-editor">
//       <input
//         type="text"
//         value={title}
//         onChange={handleChange}
//         placeholder="Type your title..."
//         className="title-input"
//       />
//     </div>
//   );
// };

// export default EditorTitle;
