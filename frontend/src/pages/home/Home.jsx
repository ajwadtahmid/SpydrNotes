import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axiosInstance from "../../utils/axiosInstance";
import TextEditor from "../../components/Tiptap/TextEditor";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Initialize the TipTap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start typing here...</p>", // Initial content for the editor
  });

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

  return (
    <div>
      <h1>Home Page</h1>
      {userInfo ? (
        <div>
          <p>Welcome, {userInfo.fullName}!</p>
          <p>Email: {userInfo.email}</p>
          <p>Username: {userInfo.username}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      </div>
  );
};

export default Home;
