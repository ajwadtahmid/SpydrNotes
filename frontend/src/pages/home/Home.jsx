import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Editor from "../../components/Tiptap/Editor";
import Sidebar from "../../components/Sidebar/Sidebar";
import icons from "../../assets/icons";
import "./Home.css";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/authcheck");
      if (response.data) {
        setUserInfo(response.data);
        console.log(userInfo);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    console.log(userInfo);
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
