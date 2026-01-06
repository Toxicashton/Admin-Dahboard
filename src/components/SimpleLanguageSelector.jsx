import React from 'react';

const SimpleLanguageSelector = ({ selectedLanguage, onChange }) => {
  return (
    <div style={{ display: 'flex', width:'240%' }}>
      
      <select
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          height: '48px',
          padding: ' 10px',
          border: '1px solid #DEE2E6',
          borderRadius: '4px',
          backgroundColor: '#FFF',
          fontSize: '14px',
          color: '#333',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh">Chinese</option>
      </select>
    </div>
  );
};

export default SimpleLanguageSelector;