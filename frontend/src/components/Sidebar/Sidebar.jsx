import React, { useState } from "react";
import icons from "../../assets/icons";
import "./Sidebar.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  notes,
  userInfo,
  onNewNote,
  toggleSidebar,
  onDeleteNote,
  handleDuplicateNote,
}) => {
  const navigate = useNavigate();
  const [contextMenu, setContextMenu] = useState(null); // Store context menu state
  const [selectedNoteId, setSelectedNoteId] = useState(null); // Store the selected note ID

  const handleNoteClick = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  const handleContextMenu = (event, noteId) => {
    event.preventDefault(); // Prevent the default browser context menu
    setSelectedNoteId(noteId); // Set the selected note
    setContextMenu({
      x: event.pageX,
      y: event.pageY,
    });
  };

  const handleMenuAction = async (action) => {
    if (action === "delete") {
      onDeleteNote(selectedNoteId);
    } else if (action === "duplicate") {
      await handleDuplicateNote(selectedNoteId); // Call the duplicate function
    }
    setContextMenu(null); // Hide the context menu after an action
  };

  const handleLogout = () => {
    // Clear user session or token
    localStorage.clear();
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="sidebar-container" onClick={() => setContextMenu(null)}>
      <div className="sidebar-header">
        <h3>Sypdr Notes</h3>
        {/* <button onClick={onNewNote}>
          <img src={icons.fileAdd} alt="New Note" />
        </button> */}
        <button onClick={toggleSidebar} className="sidebar-toggle-btn">
          <img src={icons.sidebarFold} alt="Fold Sidebar" />
        </button>
      </div>

      {/* New Page Text Link */}
      <div className="new-page-link">
        <span onClick={onNewNote} className="new-page-text">
          + New Page
        </span>
      </div>
      <div className="sidebar-notes">
        <h5>Your Notes</h5>
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              className="note-item-container"
              onContextMenu={(event) => handleContextMenu(event, note._id)}
            >
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
            </div>
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul>
            <li onClick={() => handleMenuAction("duplicate")}>Duplicate</li>
            <li onClick={() => handleMenuAction("delete")}>Delete</li>
          </ul>
        </div>
      )}
      {/* Footer with Name and Username */}
      <div className="sidebar-footer">
        <img src={icons.avatar} alt="Profile" className="profile-avatar" />
        <h4 className="sidebar-username">Logged in as: {userInfo?.username}</h4>
        <p className="sidebar-footer-text">Role: Editor</p>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
