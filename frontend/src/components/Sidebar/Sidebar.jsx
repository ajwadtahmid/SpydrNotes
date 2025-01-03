import React from "react";
import Nav from "react-bootstrap/Nav";
import icons from "../../assets/icons";
import "./Sidebar.css";

const Sidebar = ({ userInfo, toggleSidebar }) => {
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
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#about">About</Nav.Link>
        <Nav.Link href="#services">Services</Nav.Link>
        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
