

import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import { EditorContent, useEditor } from '@tiptap/react';
import React from 'react';

export default ({ className }) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3], // Configure allowed heading levels
      }),
      ListItem,
      BulletList,
      OrderedList,
      Bold,
      Italic,
      Strike,
    ],
    editorProps: {
      attributes: {
        class: `prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc ${className || ''}`,
      },
    },
    content: `
      <h1>Heading Level 1</h1>
      <h2>Heading Level 2</h2>
      <p><strong>Bold</strong>, <em>Italic</em>, and <s>Strikethrough</s> text.</p>
      <ul>
        <li>Unordered list item 1</li>
        <li>Unordered list item 2</li>
      </ul>
      <ol>
        <li>Ordered list item 1</li>
        <li>Ordered list item 2</li>
      </ol>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      {/* Toolbar */}
      <div className="control-group mb-4">
        <div className="button-group flex gap-2">
          {/* Inline Styles */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              editor.isActive('bold')
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              editor.isActive('italic')
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              editor.isActive('strike')
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Strike
          </button>

          {/* Headings */}
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            H3
          </button>

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              editor.isActive('bulletList')
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              editor.isActive('orderedList')
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Ordered List
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="border p-4 rounded-md" />
    </>
  );
};
