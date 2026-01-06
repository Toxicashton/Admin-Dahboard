// src/components/features/FilterPanel.jsx
import React from 'react';
import { BsXLg } from 'react-icons/bs'; // Close icon
import './FilterPanel.scss';

// 'onClose' will be passed down from the Drawer
const FilterPanel = ({ onClose }) => {
  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filter</h3>
        <button onClick={onClose} className="close-btn">
          <BsXLg />
        </button>
      </div>

      <div className="filter-content">
        {/* We'll add real dropdowns later */}
        <div className="form-group">
          <label>Site Name</label>
          <select>
            <option>Select Site Name</option>
            <option>Site A</option>
            <option>Site B</option>
            <option>Site C</option>
          </select>
        </div>
        <div className="form-group">
          <label>Country</label>
          <select>
            <option>Select Country</option>
            <option>USA</option>
            <option>Canada</option>
            <option>UK</option>
            <option>Germany</option>
            <option>France</option>
          </select>
        </div>
        <div className="form-group">
          <label>Zone</label>
          <select>
            <option>Select Zone</option>
            <option>Zone 1</option>
            <option>Zone 2</option>
            <option>Zone 3</option>
          </select>
        </div>
      </div>

      <div className="filter-footer">
        <button className="button button-secondary" onClick={onClose}>Clear</button>
        <button className="button button-primary" onClick={onClose}>Apply</button>
      </div>
    </div>
  );
};

export default FilterPanel;