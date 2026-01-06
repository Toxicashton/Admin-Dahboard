// src/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { LayoutProvider } from '../contexts/LayoutContext';

// Import the styles for our layout
import './layout.scss';

const MainLayout = () => {
  return (
    <LayoutProvider>
    <div className="app-layout">
      <Sidebar />
      <div className="content-wrapper">
        <TopBar />
        <main className="page-content">
          <Outlet /> {/* Your pages will render here */}
        </main>
      </div>
    </div>
    </LayoutProvider>
  );
};

export default MainLayout;