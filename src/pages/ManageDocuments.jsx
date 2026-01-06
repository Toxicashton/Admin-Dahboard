import React, { useState, useEffect, useContext } from 'react';
import { BsSearch, BsFilter, BsTrash, BsUpload, BsPencil, BsClipboard, BsDownload } from 'react-icons/bs';
import { LayoutContext } from '../contexts/LayoutContext';
import Pagination from '../components/ui/Pagination';
import usersData from '../data/dummyDocuments.json';
import './ManageDocuments.scss';
import { Link } from 'react-router-dom';
import { useModal } from '../hooks/useModal';
import Modal from '../components/ui/Modal';
import UserForm from '../components/features/forms/UserForm';

const ITEMS_PER_PAGE = 7;

const ManageDocuments = () => {
  const { setTopBarTitle } = useContext(LayoutContext);
  const [users, setUsers] = useState(usersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    isOpen: isAddUserOpen, 
    openModal: openAddUserModal, 
    closeModal: closeAddUserModal 
  } = useModal();

  useEffect(() => {
    setTopBarTitle('Manage Documents');
    return () => setTopBarTitle('');
  }, [setTopBarTitle]);

  
  const handleToggleStatus = (id) => {
    setUsers((prevUsers) => 
      prevUsers.map((user) => 
        // Ensure we match by ID and toggle ONLY that specific user's status
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const filteredUsers = users.filter(user => 
    (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.id && user.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentTableData = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="manage-users-page">
      {/* Changed class name to match SCSS provided earlier (manage-users-page is the wrapper) */}
      <div className="table-wrapper-outer"> 
      
      {/* === Toolbar === */}
      <div className="page-toolbar">
        
        {/* 1. This spacer pushes everything to the right */}
        <div className="spacer"></div>

        {/* 2. Everything grouped here */}
        <div className="toolbar-actions">
          
          {/* Search Bar is now inside the actions group */}
          <div className="search-bar">
            <BsSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search document" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="button button-secondary">
            <BsFilter /> Filter
          </button>
          <Link to="/documents/upload" className="button button-primary">
            <BsUpload /> Upload
          </Link>
        </div>
      </div>

      {/* === Table === */}
      <div className="table-wrapper">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Zone</th>
                <th>From Date</th>
                <th>Languages</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.Type}</td>
                  <td>{user.zone}</td>
                  <td>{user.FromDate}</td>
                  <td>{user.Langauage}</td>
                  <td className="action-cell">
                    {/* Toggle Switch */}
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={user.isActive || false} // Ensure a default boolean value
                        onChange={() => handleToggleStatus(user.id)}
                      />
                      <span className="slider"></span>
                    </label>
                    
                    
                    <button className="icon-btn delete"><BsTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      
       
      </div>
    </div>
  );
};

export default ManageDocuments;