import React from "react";
import icons from "../../assets/icons";
import "./Sidebar.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  notes,
  username,
  onNewNote,
  toggleSidebar,
  onDeleteNote,
}) => {
  const navigate = useNavigate();

  const handleNoteClick = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h4 className="sidebar-username">{username}'s Notebook</h4>
        <button onClick={onNewNote}>
          <img src={icons.fileAdd} alt="New Note" />
        </button>
        <button onClick={toggleSidebar} className="sidebar-toggle-btn">
          <img src={icons.sidebarFold} alt="Fold Sidebar" />
        </button>
      </div>
      <div className="sidebar-notes">
        <h5>Your Notes</h5>
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="note-item-container">
              <Button
                variant="light"
                className="note-item"
                onClick={() => handleNoteClick(note._id)}
              >
                <img
                  src={icons.fileText}
                  alt="Note Icon"
                  className="note-icon"
                />
                {note.title || "New Page"}
              </Button>
              <button
                className="delete-note-btn"
                onClick={() => onDeleteNote(note._id)}
              >
                <img src={icons.trashBin} alt="Delete Note" />
              </button>
            </div>
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
