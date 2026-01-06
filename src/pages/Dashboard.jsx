// src/pages/Dashboard.jsx
import './Dashboard.scss';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../contexts/LayoutContext';

// --- DATA & HOOKS ---
import requestsData from '../data/dummyRequests.json';
import { useModal } from '../hooks/useModal';

// --- ICONS ---
import { 
  BsSearch, BsFunnel, BsPencil, BsClipboard, 
  BsTrash, BsDownload, BsStar, BsStarFill 
} from 'react-icons/bs';

// --- COMPONENTS ---
import Drawer from '../components/ui/Drawer';
import FilterPanel from '../components/features/FilterPanel';
import Pagination from '../components/ui/Pagination';
import plus from '../assets/images/plus.svg';

const ITEMS_PER_PAGE = 11;

const StarRating = ({ rating }) => {
  if (rating === 0) {
    return <span className="rating-empty">{[...Array(5)].map((_, index) => <BsStar key={index} />)}</span>;
  }
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        index < rating ? <BsStarFill key={index} className="star-filled" /> : <BsStar key={index} />
      ))}
    </div>
  );
};

const getStatusClass = (status) => status.toLowerCase().replace(' ', '-');

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen: isFilterOpen, openModal: openFilter, closeModal: closeFilter } = useModal();
  const { setTopBarTitle } = useContext(LayoutContext);

  const currentTableData = requestsData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setTopBarTitle('Dashboard');
    return () => setTopBarTitle('');
  }, [setTopBarTitle]);

  return (
    <>
      <div className="dashboard-page">
        
        {/* === OUTER WHITE BOX === */}
        <div className="fulpage">
          
          {/* Toolbar is inside Outer Box, but ABOVE the Inner Box */}
          <div className="dashboard-toolbar">
            <div className="spacer"></div>
            <div className="toolbar-actions">
              <div className="search-bar">
              <input type="text" placeholder="Search request" />
              <BsSearch className="search-icon" />
            </div>
              <button className="button button-secondary" onClick={openFilter}>
                <BsFunnel /> <span>Filter</span>
              </button>
              <Link to="/create-request" className="button button-primary">
                <img src={plus} alt="Plus Icon" className="plus-icon" /> Create New Request
              </Link>
            </div>
          </div>

          {/* === INNER BORDERED BOX (Table Only) === */}
          <div className="dashboard-table-wrapper">
            <div className="dashboard-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Content</th>
                    <th>No. of Claims</th>
                    <th>Status</th>
                    <th>Responsible</th>
                    <th>Created Date</th>
                    <th>Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td><Link to={`/dashboard/${request.id}`} className="table-link">{request.content}</Link></td>
                      <td>{request.claims}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td>{request.responsible}</td>
                      <td>{request.createdDate}</td>
                      <td><StarRating rating={request.rating} /></td>
                      <td className="action-buttons">
                         <Link to={`/dashboard/${request.id}`}><BsPencil className="action-icon edit" /></Link>
                         <BsClipboard className="action-icon copy" />
                         <BsTrash className="action-icon delete" />
                         <BsDownload className="action-icon download" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination is usually outside the bordered table box, but inside the white card */}
          <Pagination
            currentPage={currentPage}
            totalItems={requestsData.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={(page) => setCurrentPage(page)}
          />

        </div>
      </div>

      <Drawer isOpen={isFilterOpen} onClose={closeFilter}>
        <FilterPanel onClose={closeFilter} />
      </Drawer>
    </>
  );
};

export default Dashboard;