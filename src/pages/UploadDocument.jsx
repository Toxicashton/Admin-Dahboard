import React, { useState,useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsUpload, BsXLg } from 'react-icons/bs';
import './UploadDocument.scss';
import { LayoutContext } from '../contexts/LayoutContext';
import TagInput from '../components/ui/TagInput';
import uploadIcon from '../assets/images/upload_icon.svg';
import SimpleLanguageSelector from '../components/SimpleLanguageSelector';

const allTagOptions = {
  Business: ['HQ', 'Nespresso', 'Nestle waters', 'Cereal Partners'],
  Zone: ['Americas', 'Europe', 'Asia, Oceania and Africa', 'LATAM', 'MENA'],
  Market: ['Central & West Africa Region (CWAR)', 'Plata Region', 'Austria', 'Russia & Eurasia Region'],
  Country: ['Algeria', 'Angola', 'Argentina', 'Australia', 'Azerbaijan', 'Bahrain'],
  Category: ['Sustainability', 'Green washing', 'Packaging', 'Sourcing'],
  Others: ['Case Law', 'Internal', 'External', 'Policy'],
};

// ... (near your other mock data)



const UploadDocument = () => {
  const { setTopBarTitle } = useContext(LayoutContext);
  
  const [activeTab, setActiveTab] = useState('Business');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const tabs = ['Business', 'Zone', 'Market', 'Country', 'Category', 'Others'];

  // 3. State for ALL selected tags, pre-filled from your screenshots
  const [selectedTags, setSelectedTags] = useState({
    Business: ['HQ', 'Nespresso', 'Nestle waters'],
    Zone: ['Americas', 'Europe', 'Asia, Oceania and Africa'],
    Market: ['MENA', 'Oceania'],
    Country: ['Algeria', 'Angola', 'Argentina'],
    Category: ['Sustainability', 'Green washing'],
    Others: ['Case Law', 'Internal', 'External'],
  });

  

  // 4. A single handler to update the tags for the *active* tab
  const handleTagChange = (newTags) => {
    setSelectedTags(prevTags => ({
      ...prevTags,
      [activeTab]: newTags
    }));
  };

  // 4. Set the NEW header content when this page loads
  useEffect(() => {
    setTopBarTitle('Upload Document'); // <-- Changed
    
    return () => setTopBarTitle('');
  }, [setTopBarTitle]);

  const [isExtractionExcluded, setIsExtractionExcluded] = useState(false);
  const [extractionPromptId, setExtractionPromptId] = useState('');
  const [redraftPromptId, setRedraftPromptId] = useState('');

  
    

  return (
    <div className="create-request-page">
      
      {/* === Page Header === */}
      <div className="page-header">
        <Link to="/dashboard" className="back-button">
          <BsArrowLeft />
        </Link>
        
        
        <div className="header-actions">
          
          <button className="button button-primary">Upload</button>
        </div>
      </div>

      {/* === Form Body === */}
      <div className="form-body">
        
        {/* --- Top Section (Content & Upload) --- */}
        <div className="form-card">
          <div className="form-group">
            <label htmlFor="content">Document Name</label>
            <input type="text" className="line-input-box"/>
          </div>

          <div className="form-group">
          <div className="attachment-container">
            <div className='attachment-section'>
            <label>Document Description</label>
            <div className="file-write-box">
              <textarea id="content" rows="1"></textarea>
            </div>
            
            
          </div>
          <div className='attachment-section'>
          <div className='side-by-side'>
            <div className='fromdate'>
            <label>From Date</label>
            <input type="text" className="line-input-box"/>
            </div>
            <div className='lang'>
            <label>Language</label>
            
            <SimpleLanguageSelector 
                    value={selectedLanguage} 
                    onChange={(val) => setSelectedLanguage(val)} 
                  />
                  
            </div>
          </div>
          </div>
          </div>
          </div>
        </div>

        {/* --- Attributes Section --- */}
        <div className="form-card">
          <div className="form-group">
            <label>Add Tags</label>
            <div className="tabs">
              {tabs.map(tabName => (
                <button
                  key={tabName}
                  className={`tab-btn ${activeTab === tabName ? 'active' : ''}`}
                  onClick={() => setActiveTab(tabName)}
                >
                  <strong>{tabName}</strong>
                </button>
              ))}
            </div>
            
            <div className="tab-content">
              {/* This is the magic!
                We render ONE TagInput component and pass it the props
                for the currently active tab.
              */}
              <TagInput
                label={`${activeTab} Tags`}
                options={allTagOptions[activeTab]}
                selected={selectedTags[activeTab]}
                onChange={handleTagChange}
              />
            </div>
          </div>
        </div>

        {/* --- Prompts Section --- */}
        <div className="form-card">
  <div className="form-group">
    
    {/* Container for side-by-side layout */}
    <div className="attachment-container">
      
      {/* Add Attachment Section */}
      <div className="attachment-section">
        <label>Add Attachment</label>
        <div className="file-upload-box">
          <img src={uploadIcon} alt="" />
          <p><strong>Drag & Drop</strong></p>
          <p>File supports TXT, PDF, DocX</p>
        </div>
      </div>

      {/* Document Attached Section */}
      <div className="attachment-section">
        <label>Document Attached</label>
        <div className="file-chip">
          <span>Guideline for regenerative agriculture.pdf</span>
          <BsXLg />
        </div>
      </div>

    </div>

  </div>
</div>
      </div>
    </div>
  );
};

export default UploadDocument;