import React, { useState, useEffect, useContext } from 'react';
import { BsSearch, BsFilter, BsPlusLg, BsPencil, BsTrash } from 'react-icons/bs';
import { LayoutContext } from '../contexts/LayoutContext';
import Pagination from '../components/ui/Pagination';
import usersData from '../data/dummyUsers.json';
import './ManageUsers.scss';
import { useModal } from '../hooks/useModal';
import Modal from '../components/ui/Modal';
import UserForm from '../components/features/forms/UserForm';

const ITEMS_PER_PAGE = 8;

const ManageUsers = () => {
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
    setTopBarTitle('Manage Users');
    return () => setTopBarTitle('');
  }, [setTopBarTitle]);

  const handleToggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentTableData = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="manage-users-page">
      <div className="fullpage">
      
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
              placeholder="Search user" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="button button-secondary">
            <BsFilter /> Filter
          </button>
          <button className="button button-primary" onClick={openAddUserModal}>
            <BsPlusLg /> Add User
          </button>
        </div>
      </div>

      {/* === Table === */}
      <div className="table-wrapper">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Login ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Zone</th>
                <th>Market</th>
                <th>Country</th>
                <th>Business</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.zone}</td>
                  <td>{user.market}</td>
                  <td>{user.country}</td>
                  <td>{user.business}</td>
                  <td className="action-cell">
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={user.isActive} 
                        onChange={() => handleToggleStatus(user.id)}
                      />
                      <span className="slider"></span>
                    </label>
                    <button className="icon-btn"><BsPencil /></button>
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
      
      <Modal 
        isOpen={isAddUserOpen} 
        onClose={closeAddUserModal} 
        title="Add User"
      >
        <UserForm onClose={closeAddUserModal} />
      </Modal>
      </div>
      
    </div>
  );
};

export default ManageUsers;