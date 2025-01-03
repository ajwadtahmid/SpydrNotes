import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Editor from "../../components/Tiptap/Editor";
import EditorTitle from "../../components/Tiptap/EditorTitle";
import Sidebar from "../../components/Sidebar/Sidebar";
import icons from "../../assets/icons";
import "./Home.css";

const Home = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/authcheck");
      if (response.data) {
        setUserInfo(response.data);
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
        console.log("Note info:", response.data.note);
      }
    } catch (error) {
      console.error("Error getting note info:", error);
    }
  };

  const saveTitle = async (title) => {
    try {
      const response = await axiosInstance.post(`/api/notes/${noteId}/title`, {
        title,
      });
      console.log("Title saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving title:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
    if (noteId) {
      getNoteInfo(noteId);
      console.log("Note ID:", noteId);
    }
  }, [noteId]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      {isSidebarVisible && (
        <Sidebar userInfo={userInfo} toggleSidebar={toggleSidebar} />
      )}

      {/* Main Content */}
      <div className="home-main-content">
        {!isSidebarVisible && (
          <button onClick={toggleSidebar} className="home-toggle-btn">
            <img src={icons.sidebarUnfold} alt="Unfold Sidebar" />
          </button>
        )}
        <h1>Home Page</h1>
        <h3>{noteId}</h3>

        {/* Conditional Rendering for Note */}
        {note ? (
          <>
            <h3>{note.title}</h3>
            <EditorTitle noteTitle={note.title || "Untitled"} saveTitle={saveTitle} />
            <Editor content={note.content || ""} />
          </>
        ) : (
          <p>Loading note...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
