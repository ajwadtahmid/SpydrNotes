import React, { useState, useEffect } from "react";
import "./EditorTitle.css";

const EditorTitle = ({ saveTitle }) => {
  const [title, setTitle] = useState("");
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

  useEffect(() => {
    if (debouncedTitle) {
      saveTitle(debouncedTitle); // Call save function when debounce settles
    }
  }, [debouncedTitle, saveTitle]);

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
