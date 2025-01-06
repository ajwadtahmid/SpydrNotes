import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Editor from "../../components/Tiptap/Editor";
import EditorTitle from "../../components/Tiptap/EditorTitle";
import Sidebar from "../../components/Sidebar/Sidebar";
import icons from "../../assets/icons";
import "./Home.css";
import Navbar from "react-bootstrap/Navbar";

const Home = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [notes, setNotes] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isCreatingNote, setIsCreatingNote] = useState(false); // Track creation state
  const [userLoaded, setUserLoaded] = useState(false); // Track user info load state

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
    } finally {
      setUserLoaded(true); // Set userLoaded to true after fetching user data
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
    if (isCreatingNote) return; // Prevent multiple requests
    setIsCreatingNote(true); // Set the flag to indicate note creation is in progress
    try {
      const response = await axiosInstance.post("/api/notes/create");
      if (response.data) {
        const newNote = response.data.note;
        setNotes((prevNotes) => [...prevNotes, newNote]); // Add new note to notes
        navigate(`/notes/${newNote._id}`); // Navigate to the new note
      }
    } catch (error) {
      console.error("Error creating new note:", error);
    } finally {
      setIsCreatingNote(false); // Reset the flag after the note creation process
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

  const handleDuplicateNote = async (noteId) => {
    try {
      // Fetch the note data first
      const response = await axiosInstance.get(`/api/notes/${noteId}`);
      const noteToDuplicate = response.data.note;

      // Now, create a new note with the same data
      const duplicateResponse = await axiosInstance.post("/api/notes/create", {
        title: noteToDuplicate.title,
        body: noteToDuplicate.body,
      });

      if (duplicateResponse.data) {
        const duplicatedNote = duplicateResponse.data.note;
        // Add the duplicated note to the local state
        setNotes((prevNotes) => [...prevNotes, duplicatedNote]);

        // Optionally, navigate to the new note page
        navigate(`/notes/${duplicatedNote._id}`);
      }
    } catch (error) {
      console.error("Error duplicating note:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userLoaded && notes.length === 0 && !isCreatingNote) {
      // Create a new note only after user info is loaded and notes are empty
      handleNewNote();
    } else if (noteId) {
      setNote(null);
      getNoteInfo(noteId);
    }
  }, [notes, noteId, isCreatingNote, userLoaded]);

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
          handleDuplicateNote={handleDuplicateNote}
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
