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
import Strike from "@tiptap/extension-strike";
import "./Editor.css";
import Dropdown from "react-bootstrap/Dropdown";
import FontFamily from "@tiptap/extension-font-family";
import { set } from "mongoose";
import icons from "../../assets/icons";

const Editor = () => {
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [selectedHierarchy, setSelectedHierarchy] = useState(icons.heading1);
  const [selectedAlignment, setSelectedAlignment] = useState(icons.alignLeft);
  const [selectedList, setSelectedList] = useState(icons.bulletList);

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
      Strike,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Code,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
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
              <img src={selectedHierarchy} alt="Heading" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 1 }).run();
                  setSelectedHierarchy(icons.heading1);
                }}
              >
                <img src={icons.heading1} alt="Heading 1" />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                  setSelectedHierarchy(icons.heading2);
                }}
              >
                <img src={icons.heading2} alt="Heading 2" />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 3 }).run();
                  setSelectedHierarchy(icons.heading3);
                }}
              >
                <img src={icons.heading3} alt="Heading 3" />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 4 }).run();
                  setSelectedHierarchy(icons.heading4);
                }}
              >
                <img src={icons.heading4} alt="Heading 4" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Font familybuttons */}
        <div className="font-family">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-heading">
              {selectedFont}
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
                  editor
                    .chain()
                    .focus()
                    .setFontFamily('"Comic Sans MS", "Comic Sans"')
                    .run();
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
        <div className="list-buttons">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-list">
              <img src={selectedList} alt="List" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().toggleBulletList().run();
                  setSelectedList(icons.bulletList);
                }}
                className={editor.isActive("bulletList") ? "is-active" : ""}
              >
                <img src={icons.bulletList} alt="Bullet List" />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().toggleOrderedList().run();
                  setSelectedList(icons.orderedList);
                }}
                className={editor.isActive("orderedList") ? "is-active" : ""}
              >
                <img src={icons.orderedList} alt="Ordered List" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Inline formatting buttons */}
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <img src={icons.bold} alt="Bold" />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <img src={icons.italic} alt="Italic" />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <img src={icons.underline} alt="Underline" />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          <img src={icons.strikethrough} alt="Strike" />
        </button>
        <button onClick={() => editor.chain().focus().toggleCode().run()}>
          <img src={icons.code} alt="Code" />
        </button>

        {/* Text alignment dropdown */}
        <div className="text-alignment">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-alignment">
              <img src={selectedAlignment} alt="Text Alignment" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setTextAlign("left").run();
                  setSelectedAlignment(icons.alignLeft);
                }}
                className={
                  editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                }
              >
                <img src={icons.alignLeft} alt="Align Left" />
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setTextAlign("center").run();
                  setSelectedAlignment(icons.alignCenter);
                }}
                className={
                  editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                }
              >
                <img src={icons.alignCenter} alt="Align Center" />
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setTextAlign("right").run();
                  setSelectedAlignment(icons.alignRight);
                }}
                className={
                  editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                }
              >
                <img src={icons.alignRight} alt="Align Right" />
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setTextAlign("justify").run();
                  setSelectedAlignment(icons.alignJustify);
                }}
                className={
                  editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
                }
              >
                <img src={icons.alignJustify} alt="Align Justify" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

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
          <img src={icons.undo} alt="Undo" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <img src={icons.redo} alt="Redo" />
        </button>
      </div>

      {/* The actual editor content */}
      <EditorContent editor={editor} className="tiptap" />
    </div>
  );
};

export default Editor;
