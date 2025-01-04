import React from "react";
import Nav from "react-bootstrap/Nav";
import icons from "../../assets/icons";
import "./Sidebar.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ notes, username, onNewNote, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleNoteClick = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h4 className="sidebar-username">{username}'s Notebook</h4>
        <button action="#" method="POST" onClick={onNewNote}>
          <img src={icons.fileAdd} alt="New Note" />
        </button>
        <button onClick={toggleSidebar} className="sidebar-toggle-btn">
          <img src={icons.sidebarFold} alt="Fold Sidebar" />
        </button>
      </div>
      {/* <Nav className="sidebar-nav flex-column">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#about">About</Nav.Link>
        <Nav.Link href="#services">Services</Nav.Link>
        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav> */}
      <div className="sidebar-notes">
        <h5>Your Notes</h5>
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <Button
              key={note._id}
              variant="light"
              className="note-item"
              onClick={() => handleNoteClick(note._id)}
            >
              <img src={icons.fileText} alt="Note Icon" className="note-icon" />
              {note.title || "New Page"}
            </Button>
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
