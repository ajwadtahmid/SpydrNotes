import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Editor from "../../components/Tiptap/Editor";
import EditorTitle from "../../components/Tiptap/EditorTitle";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

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
      <EditorTitle saveTitle={saveTitle} />
      <Editor />
    </div>
  );
};

export default Home;
