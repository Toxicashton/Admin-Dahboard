import React from 'react';
import { NavLink } from 'react-router-dom'; // <-- 1. Import NavLink
// You can import icons here if you want them in the sidebar later
import { 
  BsGrid1X2, 
  BsChatLeftText, 
  BsJournalText, 
  BsPeople, 
  BsTags, 
  BsFileText 
} from 'react-icons/bs';
import appLogo from '../assets/images/Group 522.svg';
import menu_image from '../assets/images/menu_image.svg';
import bc from '../assets/images/bc.svg';
//// --- ICONS ---
import dashboard from '../assets/images/dashboard.svg'; 
import chatwithdoc from '../assets/images/chatwithdoc.svg';
import promptlib from '../assets/images/promptlib.svg';
import manageusers from '../assets/images/manageusers.svg';
import managetags from '../assets/images/managetags.svg';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={appLogo} alt="App Logo" className="sidebar-logo" />
        <img src={bc} alt="BC Logo" className="bc-logo" />
        
      </div>
      
      <nav className="sidebar-nav">
        {/* 2. Use NavLink instead of <a> */}
        {/* The 'to' prop must match the path in App.jsx */}
        
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <img src={dashboard} alt="Dashboard" className="nav-icon" /> {/* Optional: Add Icon */}
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/chat" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <img src={chatwithdoc} alt="Chat" className="nav-icon" />
          <span>Chat with Document</span>
        </NavLink>

        <NavLink to="/prompts" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <img src={promptlib} alt="Prompts" className="nav-icon" />
          <span>Prompt Library</span>
        </NavLink>

        <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <img src={manageusers} alt="Users" className="nav-icon" />
          <span>Manage Users</span>
        </NavLink>

        <NavLink to="/tags" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <img src={managetags} alt="Tags" className="nav-icon" />
          <span>Manage Tags</span>
        </NavLink>

        <NavLink to="/documents" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <BsFileText className="nav-icon" />
          <span>Manage Documents</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-menu-image" >
        <img src={menu_image} alt="Menu" />
        <div className="footer-text-overlay">
          <p>Beta Version 1.0</p>
          <p>© Copy right, 2025</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;