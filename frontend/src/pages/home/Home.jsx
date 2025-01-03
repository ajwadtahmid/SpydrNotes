import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Editor from "../../components/Tiptap/Editor";
import EditorTitle from "../../components/Tiptap/EditorTitle";
import Sidebar from "../../components/Sidebar/Sidebar";
import icons from "../../assets/icons";
import "./Home.css";

const Home = () => {
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

  const saveTitle = async (title) => {
    try {
      const response = await axiosInstance.post("/api/title/save", { title });
      console.log("Title saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving title:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      {isSidebarVisible && (
        <Sidebar userInfo={userInfo} toggleSidebar={toggleSidebar} />
      )}
      <EditorTitle saveTitle={saveTitle} />
      <Editor />
      {/* Main Content */}
      <div className="home-main-content">
        {!isSidebarVisible && (
          <button onClick={toggleSidebar} className="home-toggle-btn">
            <img
              src= { icons.sidebarUnfold } // Replace with your actual path
              alt="Unfold Sidebar"
            />
          </button>
        )}
        <h1>Home Page</h1>
        <Editor />
      </div>
    </div>
  );
};

export default Home;
