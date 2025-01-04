import React from "react";
import Nav from "react-bootstrap/Nav";
import icons from "../../assets/icons";
import "./Sidebar.css";
import axiosInstance from "../../utils/axiosInstance";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ userInfo, toggleSidebar }) => {
  const [notes, setNotes] = React.useState(userInfo.notes || []);
  const navigate = useNavigate();

  const newPage = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/notes/create");

      if (response.data) {
        console.log("New note created");
        console.log(response.data);
        console.log(notes);
        setNotes((prevNotes) => [...prevNotes, response.data.note]); // Update notes state, adds the last one as a note object
      }
    } catch (error) {
      console.error("Error creating new note:", error);
    }
  };

  const handleNoteClick = async (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h4 className="sidebar-username">{userInfo.username}'s Notebook</h4>
        <button onClick={toggleSidebar} className="sidebar-toggle-btn">
          <img
            src={icons.sidebarFold} // Replace with your actual path
            alt="Fold Sidebar"
          />
        </button>
      </div>
      <Nav className="sidebar-nav flex-column">
        <button action="#" method="POST" onClick={newPage}>
          <img src={icons.fileAdd} alt="New Note" />
        </button>
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#about">About</Nav.Link>
        <Nav.Link href="#services">Services</Nav.Link>
        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav>
      <div className="sidebar-notes">
        <h5>Your Notes</h5>
        {notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <Button
              key={note._id}
              variant="light"
              className="note-item"
              onClick={() =>
                handleNoteClick(typeof note === "string" ? note : note._id)
              }
            >
              {/* Icon inside the button */}
              <img src={icons.fileText} alt="Note Icon" className="note-icon" />
              {/* {typeof note === "string" ? note : note._id} */}
              {typeof note === "string" ? note : note._id}
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
