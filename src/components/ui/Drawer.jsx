// src/components/ui/Drawer.jsx
import React from 'react';
import './Drawer.scss';

const Drawer = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* The grey overlay */}
      <div className="drawer-overlay" onClick={onClose}></div>
      
      {/* The sliding panel */}
      <div className="drawer-panel">
        {children}
      </div>
    </>
  );
};

export default Drawer;