import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Editor from "../../components/Tiptap/Editor";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

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
      <Editor />
    </div>
  );
};

export default Home;
