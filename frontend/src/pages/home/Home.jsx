import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Editor from "../../components/Tiptap/Editor";
import EditorTitle from "../../components/Tiptap/EditorTitle";
import Sidebar from "../../components/Sidebar/Sidebar";
import icons from "../../assets/icons";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Home = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/authcheck");
      if (response.data) {
        setUserInfo(response.data);
        setNotes(response.data.notes || []);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getNoteInfo = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/notes/${id}`);
      if (response.data) {
        setNote(response.data.note);
      }
    } catch (error) {
      console.error("Error getting note info:", error);
    }
  };

  const handleNewNote = async () => {
    try {
      const response = await axiosInstance.post("/api/notes/create");
      if (response.data) {
        const newNote = response.data.note;
        setNotes((prevNotes) => [...prevNotes, newNote]); // Add new note to notes
        navigate(`/notes/${newNote._id}`); // Navigate to the new note
      }
    } catch (error) {
      console.error("Error creating new note:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const response = await axiosInstance.delete(`/api/notes/${noteId}`);
      if (response.status === 200) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
        if (noteId === note?._id) {
          setNote(null); // Clear note if the currently viewed note is deleted
          navigate("/"); // Navigate back to the home page
        }
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
    if (noteId) {
      setNote(null);
      getNoteInfo(noteId);
    }
  }, [noteId]);

    // Set the tab title to the note's title or a default value
    useEffect(() => {
      if (note) {
        document.title = note.title || "Untitled Note"; // Default to "Untitled Note" if no title exists
      } else {
        document.title = "Loading Note..."; // Default while loading
      }
    }, [note]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const updateCounts = (words, chars) => {
    setWordCount(words);
    setCharCount(chars);
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div
        className={`sidebar-container ${
          isSidebarVisible ? "" : "sidebar-hidden"
        }`}
      >
        <Sidebar
          userInfo={userInfo}
          notes={notes}
          onNewNote={handleNewNote}
          toggleSidebar={toggleSidebar}
          onDeleteNote={handleDeleteNote}
        />
      </div>

      {/* Main Content */}
      <div
        className={`home-main-content ${
          isSidebarVisible ? "with-sidebar" : "no-sidebar"
        }`}
      >
        <Navbar className="navbar" expand="lg">
          {!isSidebarVisible && (
            <button onClick={toggleSidebar} className="home-toggle-btn">
              <img src={icons.sidebarUnfold} alt="Unfold Sidebar" />
            </button>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Navbar.Text className="navbar-text">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

        {/* Conditional Rendering for Note */}
        {note ? (
          <>
            <EditorTitle noteId={noteId} noteTitle={note.title || "Untitled"} />
            <Editor
              noteId={noteId}
              content={note.body || ""}
              onUpdateCounts={updateCounts}
            />
          </>
        ) : (
          <p>Loading note...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
