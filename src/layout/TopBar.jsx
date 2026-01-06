// src/layout/TopBar.jsx
import React,{useContext} from 'react';
import { LayoutContext } from '../contexts/LayoutContext';
import { BsPerson } from 'react-icons/bs';

// We'll get this from context later
const userName = "Nikolas Hazel"; 

const TopBar = () => {
  const { topBarTitle } = useContext(LayoutContext);
  return (
    <div className="topbar">
      <h2 className="topbar-title">{topBarTitle}</h2>
      
      <div className="user-menu">
        {/* Add user avatar icon here */}
        <div className="user-avatar">
        <BsPerson />
        </div>
        <span>{userName}</span>
      </div>
    </div>
  );
};

export default TopBar;