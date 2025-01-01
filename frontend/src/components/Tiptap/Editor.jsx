import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Code from "@tiptap/extension-code";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import "./Editor.css";
import Dropdown from "react-bootstrap/Dropdown";
import CodeBlock from "@tiptap/extension-code-block";
import FontFamily from "@tiptap/extension-font-family";
import { set } from "mongoose";

const Editor = () => {

  const [selectedFont, setSelectedFont] = useState("Inter");
  const [selectedHierarchy, setSelectedHierarchy] = useState("H1");

  // Set up the editor with required extensions
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextAlign.configure({
        types: ["paragraph", "heading"],
      }),
      TextStyle,
      Bold,
      Italic,
      Underline,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Code,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      CodeBlock,
      FontFamily,
    ],
    content: `
      <h2>Welcome to the Editor</h2>
      <p>Try out the various features in the toolbar.</p>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="editor">
      {/* Toolbar for the buttons */}
      <div className="editor-menu">
        {/* Heading buttons */}
        <div className="hierarchy">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-heading">
              { selectedHierarchy}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 1 }).run();
                  setSelectedHierarchy("H1");
                }}
              >
                H1
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                  setSelectedHierarchy("H2");
                }}
              >
                H2
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 3 }).run();
                  setSelectedHierarchy("H3");
                }}
              >
                H3
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 4 }).run();
                  setSelectedHierarchy("H4");
                }}
              >
                H4
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Font familybuttons */}
        <div className="font-family">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-heading">
              { selectedFont}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setFontFamily("Inter").run();
                  setSelectedFont("Inter");
                }}
                className={
                  editor.isActive("textStyle", { fontFamily: "Inter" })
                    ? "is-active"
                    : ""
                }
              >
                Inter
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setFontFamily('"Comic Sans MS", "Comic Sans"').run();
                  setSelectedFont("Comic Sans");
                }}
                className={
                  editor.isActive("textStyle", {
                    fontFamily: '"Comic Sans MS", "Comic Sans"',
                  })
                    ? "is-active"
                    : ""
                }
              >
                Comic Sans
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* List buttons */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered List
        </button>

        {/* Inline formatting buttons */}
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
        <button onClick={() => editor.chain().focus().toggleCode().run()}>
          Code
        </button>

        {/* Text alignment buttons */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          Right
        </button>

        {/* Color button */}
        <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        >
          Purple
        </button>

        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          Redo
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Toggle code block
        </button>
      </div>

      {/* The actual editor content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
