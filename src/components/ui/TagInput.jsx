// src/components/ui/TagInput.jsx
import React from 'react';
import { BsXLg } from 'react-icons/bs';
import './TagInput.scss';

const TagInput = ({ label, options, selected, onChange }) => {

  // Get a list of options that are NOT already selected
  const availableOptions = options.filter(opt => !selected.includes(opt));

  // --- Handlers ---
  const handleAddTag = (e) => {
    const newTag = e.target.value;
    if (newTag && !selected.includes(newTag)) {
      onChange([...selected, newTag]);
    }
    // Reset dropdown
    e.target.value = '';
  };

  const handleRemoveTag = (tagToRemove) => {
    onChange(selected.filter(tag => tag !== tagToRemove));
  };

  // --- Render ---
  return (
    <div className="tag-input-component">
      <label>{label}</label>
      <div className="tag-input-box">
        {/* 1. The selected tag chips */}
        {selected.map(tag => (
          <span key={tag} className="tag">
            {tag}
            <BsXLg onClick={() => handleRemoveTag(tag)} />
          </span>
        ))}

        {/* 2. The dropdown to add new tags */}
        <select className="tag-select" onChange={handleAddTag} value="">
          <option value="" disabled>Select...</option>
          {availableOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TagInput;