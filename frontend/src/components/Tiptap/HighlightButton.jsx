import React, { useRef } from "react";

const HighlightButton = ({ editor, icons }) => {
  const colorInputRef = useRef(null);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Visible but styled input */}
      <input
        type="color"
        ref={colorInputRef} /* Attach ref to the input */
        onInput={(event) =>
          editor
            .chain()
            .focus()
            .toggleHighlight({ color: event.target.value })
            .run()
        }
        value={editor.getAttributes("highlight").color || "#ffff00"} /* Default color */
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0, /* Make it invisible but clickable */
          width: "32px", /* Matches button dimensions */
          height: "32px",
          cursor: "pointer",
        }}
        data-testid="setHighlight"
      />

      {/* Button that is visually placed over the input */}
      <button
        onClick={() => colorInputRef.current.click()} /* Optional if input is clickable */
        style={{ position: "relative", zIndex: 1 }}
      >
        <img src={icons.highlight} alt="Highlight" />
      </button>
    </div>
  );
};

export default HighlightButton;
