import React, { useRef } from "react";

const TextColorButton = ({ editor, icons }) => {
  const colorInputRef = useRef(null);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Hidden but clickable color input */}
      <input
        type="color"
        ref={colorInputRef}
        onInput={(event) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes("textStyle").color || "#000000"} // Default color
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0, // Make it invisible but clickable
          width: "32px", // Matches button dimensions
          height: "32px",
          cursor: "pointer",
        }}
        data-testid="setTextColor"
      />

      {/* Button that triggers the input */}
      <button
        onClick={() => colorInputRef.current.click()} // Trigger the input click
        style={{ position: "relative", zIndex: 1 }}
      >
        <img src={icons.palette} alt="Palette" />
      </button>
    </div>
  );
};

export default TextColorButton;
