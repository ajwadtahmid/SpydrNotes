import React, { useState, useEffect } from "react";
import "./EditorTitle.css";

const EditorTitle = ({ noteTitle = "Untitled", saveTitle }) => {
  const [title, setTitle] = useState(noteTitle !== "Untitled" ? noteTitle : "");
  const [debouncedTitle, setDebouncedTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [title]);

  // Save the title only if it has changed
  useEffect(() => {
    if (debouncedTitle !== noteTitle) {
      saveTitle(debouncedTitle); // Call saveTitle only if the title has changed
    }
  }, [debouncedTitle, noteTitle, saveTitle]);

  useEffect(() => {
    // Update the title state when noteTitle changes
    setTitle(noteTitle !== "Untitled" ? noteTitle : "");
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
