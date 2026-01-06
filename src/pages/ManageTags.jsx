// src/pages/ManageTags.jsx
import React, { useState, useEffect, useContext } from 'react';
import { BsXLg } from 'react-icons/bs';
import { LayoutContext } from '../contexts/LayoutContext';
import './ManageTags.scss';

const ManageTags = () => {
  const { setTopBarTitle } = useContext(LayoutContext);

  const [tagData, setTagData] = useState({
    business: ['HQ', 'Nespresso', 'Nestle waters'],
    categorization: ['Sustainability', 'Green washing'],
    other: ['Case Law', 'Internal', 'External']
  });

  useEffect(() => {
    setTopBarTitle('Manage Tags');
    return () => setTopBarTitle('');
  }, [setTopBarTitle]);

  const handleRemoveTag = (category, tagToRemove) => {
    setTagData(prev => ({
      ...prev,
      [category]: prev[category].filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter') {
      const value = e.target.value.trim();
      if (value && !tagData[category].includes(value)) {
        setTagData(prev => ({
          ...prev,
          [category]: [...prev[category], value]
        }));
        e.target.value = ''; 
      }
    }
  };

  return (
    <div className="manage-tags-page">
      <div className="manage-tags-container">
        
        {/* --- Business Tags --- */}
        <div className="tag-section">
          <label>Business Tags</label>
          <div className="tag-box">
            {/* Wrapper for tags to keep them at the top */}
            <div className="tags-list">
              {tagData.business.map(tag => (
                <span key={tag} className="tag-chip">
                  {tag}
                  <BsXLg onClick={() => handleRemoveTag('business', tag)} />
                </span>
              ))}
            </div>
            {/* Input is now separate, so CSS can push it to the bottom */}
            <input 
              type="text" 
              placeholder="Type tags..." 
              onKeyDown={(e) => handleKeyDown(e, 'business')}
            />
          </div>
        </div>

        {/* --- Categorization Tags --- */}
        <div className="tag-section">
          <label>Categorization Tags</label>
          <div className="tag-box">
            <div className="tags-list">
              {tagData.categorization.map(tag => (
                <span key={tag} className="tag-chip">
                  {tag}
                  <BsXLg onClick={() => handleRemoveTag('categorization', tag)} />
                </span>
              ))}
            </div>
            <input 
              type="text" 
              placeholder="Type tags..." 
              onKeyDown={(e) => handleKeyDown(e, 'categorization')}
            />
          </div>
        </div>

        {/* --- Other Tags --- */}
        <div className="tag-section">
          <label>Other Tags</label>
          <div className="tag-box">
            <div className="tags-list">
              {tagData.other.map(tag => (
                <span key={tag} className="tag-chip">
                  {tag}
                  <BsXLg onClick={() => handleRemoveTag('other', tag)} />
                </span>
              ))}
            </div>
            <input 
              type="text" 
              placeholder="Type tags..." 
              onKeyDown={(e) => handleKeyDown(e, 'other')}
            />
          </div>
        </div>

        {/* --- Footer --- */}
        <div className="tags-footer">
          <p>
            The <strong>Country, Market</strong> and <strong>Zone</strong> are present in the system and it is not available for edit.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ManageTags;