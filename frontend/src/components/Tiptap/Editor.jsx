import React, { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
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
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import PlaceHolder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { Dropdown } from "react-bootstrap";
import icons from "../../assets/icons";
import "./Editor.css";
import HighlightButton from "./HighlightButton";
import TextColorButton from "./TextColorButton";
import axiosInstance from "../../utils/axiosInstance";

const Editor = ({ noteId, content = "", onUpdateCounts }) => {
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [selectedHierarchy, setSelectedHierarchy] = useState(icons.heading1);
  const [selectedAlignment, setSelectedAlignment] = useState(icons.alignLeft);
  const [selectedList, setSelectedList] = useState(icons.bulletList);
  const colorInputRef = useRef(null);
  const [editorHTML, setEditorHTML] = useState(content);
  const [debouncedContent, setDebouncedContent] = useState(content);
  const [isDirty, setIsDirty] = useState(false); // Track if content has changed

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
      Highlight.configure({ multicolor: true }),
      PlaceHolder,
      CharacterCount,
    ],
    // content: `
    //   <h2>Welcome to the Editor</h2>
    //   <p>Try out the various features in the toolbar.</p>
    // `,
    content,
    onUpdate: ({ editor }) => {
      // Update the HTML content whenever the editor changes
      const updatedHTML = editor.getHTML();
      setEditorHTML(updatedHTML);
      setIsDirty(true); // Set isDirty to true when the content changes
    },
  });

  // Debounce the content before saving
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedContent(editorHTML); // Update debounced content after delay
    }, 500); // 500ms debounce

    return () => clearTimeout(handler); // Cleanup timeout on changes
  }, [editorHTML]);

  // Save content to the API whenever debouncedContent changes
  useEffect(() => {
    const saveContent = async (updatedContent) => {
      try {
        if (noteId && updatedContent !== content) {
          await axiosInstance.put(`/api/notes/update-body/${noteId}`, {
            body: updatedContent,
          });
          console.log("Content saved successfully:", updatedContent);
        }
      } catch (error) {
        console.error("Error saving content:", error);
      }
    };

    if (isDirty && debouncedContent !== content) {
      saveContent(debouncedContent);
      setIsDirty(false); // Reset dirty flag after saving
    }
  }, [debouncedContent, content, isDirty, noteId]);

  // Save content immediately on blur
  const handleBlur = async () => {
    try {
      if (editorHTML !== content) {
        await axiosInstance.put(`/api/notes/update-body/${noteId}`, {
          body: editorHTML,
        });
        console.log("Content saved immediately on blur:", editorHTML);
      }
    } catch (error) {
      console.error("Error saving content on blur:", error);
    }
  };

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
      setIsDirty(false); // Reset dirty flag when a new note is loaded
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  useEffect(() => {
    if (editor) {
      const words = editor.storage.characterCount.words();
      const chars = editor.storage.characterCount.characters();
      onUpdateCounts(words, chars); // Pass the updated counts to the parent
    }
  }, [editorHTML]);

  const percentage = editor
    ? Math.round(100 * editor.storage.characterCount.characters())
    : 0;

  return (
    <div className="editor">
      {/* Bubble Menu */}
      {editor && (
        <BubbleMenu editor={editor} className="bubble-menu">
          {/* Inline Formatting Buttons */}
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            <img src={icons.bold} alt="Bold" />
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <img src={icons.italic} alt="Italic" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <img src={icons.underline} alt="Underline" />
          </button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()}>
            <img src={icons.strikethrough} alt="Strike" />
          </button>
          <button onClick={() => editor.chain().focus().toggleCode().run()}>
            <img src={icons.code} alt="Code" />
          </button>

          {/* Heading Dropdown */}
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

          {/* Font Family Dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-font">
              {selectedFont}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* Inter Font */}
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

              {/* EB Garamond Font */}
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setFontFamily('"EB Garamond"').run();
                  setSelectedFont("EB Garamond");
                }}
                className={
                  editor.isActive("textStyle", { fontFamily: '"EB Garamond"' })
                    ? "is-active"
                    : ""
                }
              >
                EB Garamond
              </Dropdown.Item>

              {/* Fira Code Font */}
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setFontFamily('"Fira Code"').run();
                  setSelectedFont("Fira Code");
                }}
                className={
                  editor.isActive("textStyle", { fontFamily: '"Fira Code"' })
                    ? "is-active"
                    : ""
                }
              >
                Fira Code
              </Dropdown.Item>

              {/* JetBrains Mono Font */}
              <Dropdown.Item
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .setFontFamily('"JetBrains Mono"')
                    .run();
                  setSelectedFont("JetBrains Mono");
                }}
                className={
                  editor.isActive("textStyle", {
                    fontFamily: '"JetBrains Mono"',
                  })
                    ? "is-active"
                    : ""
                }
              >
                JetBrains Mono
              </Dropdown.Item>

              {/* Lato Font */}
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setFontFamily("Lato").run();
                  setSelectedFont("Lato");
                }}
                className={
                  editor.isActive("textStyle", { fontFamily: "Lato" })
                    ? "is-active"
                    : ""
                }
              >
                Lato
              </Dropdown.Item>

              {/* Merriweather Font */}
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setFontFamily("Merriweather").run();
                  setSelectedFont("Merriweather");
                }}
                className={
                  editor.isActive("textStyle", { fontFamily: "Merriweather" })
                    ? "is-active"
                    : ""
                }
              >
                Merriweather
              </Dropdown.Item>

              {/* Pacifico Font */}
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setFontFamily("Pacifico").run();
                  setSelectedFont("Pacifico");
                }}
                className={
                  editor.isActive("textStyle", { fontFamily: "Pacifico" })
                    ? "is-active"
                    : ""
                }
              >
                Pacifico
              </Dropdown.Item>

              {/* Poppins Font */}
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setFontFamily("Poppins").run();
                  setSelectedFont("Poppins");
                }}
                className={
                  editor.isActive("textStyle", { fontFamily: "Poppins" })
                    ? "is-active"
                    : ""
                }
              >
                Poppins
              </Dropdown.Item>

              {/* Roboto Font */}
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setFontFamily("Roboto").run();
                  setSelectedFont("Roboto");
                }}
                className={
                  editor.isActive("textStyle", { fontFamily: "Roboto" })
                    ? "is-active"
                    : ""
                }
              >
                Roboto
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* List Dropdown */}
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
              >
                <img src={icons.bulletList} alt="Bullet List" />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().toggleOrderedList().run();
                  setSelectedList(icons.orderedList);
                }}
              >
                <img src={icons.orderedList} alt="Ordered List" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Text Alignment Dropdown */}
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
              >
                <img src={icons.alignLeft} alt="Align Left" />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setTextAlign("center").run();
                  setSelectedAlignment(icons.alignCenter);
                }}
              >
                <img src={icons.alignCenter} alt="Align Center" />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  editor.chain().focus().setTextAlign("right").run();
                  setSelectedAlignment(icons.alignRight);
                }}
              >
                <img src={icons.alignRight} alt="Align Right" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Highlight Button */}
          <HighlightButton editor={editor} icons={icons} />

          {/* Color Button */}
          <TextColorButton editor={editor} icons={icons} />

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
        </BubbleMenu>
      )}

      {/* Editor Content */}
      <EditorContent editor={editor} className="tiptap" onBlur={handleBlur} />
      {/* Render HTML content below the editor */}
      <div className="editor-html-preview">
        <h3>HTML Output:</h3>
        <pre>{editorHTML}</pre>
      </div>

      <div className="character-count">
        {editor.storage.characterCount.characters()} characters
        <br />
        {editor.storage.characterCount.words()} words
      </div>
    </div>
  );
};

export default Editor;
