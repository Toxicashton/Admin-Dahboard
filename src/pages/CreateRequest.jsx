import React, { useState,useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsUpload, BsXLg } from 'react-icons/bs';
import './CreateRequest.scss';
import { LayoutContext } from '../contexts/LayoutContext';
import TagInput from '../components/ui/TagInput';

const allTagOptions = {
  Business: ['HQ', 'Nespresso', 'Nestle waters', 'Cereal Partners'],
  Zone: ['Americas', 'Europe', 'Asia, Oceania and Africa', 'LATAM', 'MENA'],
  Market: ['Central & West Africa Region (CWAR)', 'Plata Region', 'Austria', 'Russia & Eurasia Region'],
  Country: ['Algeria', 'Angola', 'Argentina', 'Australia', 'Azerbaijan', 'Bahrain'],
  Category: ['Sustainability', 'Green washing', 'Packaging', 'Sourcing'],
  Others: ['Case Law', 'Internal', 'External', 'Policy'],
};
// ... (near your other mock data)
const redraftPromptOptions = [
  
  { 
    id: 'p1', 
    name: 'NESCAFÉ Redrafting Prompt', 
    text: 'Since 2010, NESCAFÉ has supported coffee farmers with plantlets bred for improved resilience to climate variations. For example, selected improved plantlet varieties distributed through the NESCAFÉ Plan in certain regions have shown, in field trials and on-farm data, up to 50% higher yield per tree compared to local traditional varieties under similar agronomic conditions.'
  },
  {
    id: 'p2',
    name: 'General Redrafting Prompt',
    text: 'Review the claims for general compliance and redraft as needed.'
  }
];
const extractionPromptOptions = [
  
    { 
    id: 'p1', 
    name: 'Standard Extraction Prompt', 
    text: 'Please find any claims or statements, with more than 10 words, strongly related to clear and explicit references to sustainable practices and principles in the provided content that might be exposed to ESG rules. Avoid empty lines as well as your comments and replace numbered claims by bullets.' 
  },
];

const CreateRequest = () => {
  const { setTopBarTitle } = useContext(LayoutContext);

  const [activeTab, setActiveTab] = useState('Business');
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
    setTopBarTitle('Create New Request'); // <-- Changed
    
    return () => setTopBarTitle('');
  }, [setTopBarTitle]);

  const [isExtractionExcluded, setIsExtractionExcluded] = useState(false);
  const [extractionPromptId, setExtractionPromptId] = useState('');
  const [redraftPromptId, setRedraftPromptId] = useState('');

  const selectedExtractionPrompt = extractionPromptOptions.find(p => p.id === extractionPromptId);
  const selectedRedraftPrompt = redraftPromptOptions.find(p => p.id === redraftPromptId);
    

  return (
    <div className="create-request-page">
      
      {/* === Page Header === */}
      <div className="page-header">
        <Link to="/dashboard" className="back-button">
          <BsArrowLeft />
        </Link>
        
        
        <div className="header-actions">
          <button className="button button-secondary">Save as Draft</button>
          <button className="button button-primary">Generate</button>
        </div>
      </div>

      {/* === Form Body === */}
      <div className="form-body">
        
        {/* --- Top Section (Content & Upload) --- */}
        <div className="form-card">
          <div className="form-group">
            <label htmlFor="content">Required Content</label>
            <textarea id="content" rows="4" placeholder="Enter the text"></textarea>
          </div>

          <div className="form-group">
            <label>Upload Document</label>
            <div className="file-upload-box">
              <BsUpload />
              <p><strong>Drag & Drop</strong></p>
              <p>File supports TXT, PDF, DocX</p>
            </div>
            {/* This would be shown after a file is "uploaded" */}
            <div className="file-chip">
              <span>Guideline for regenerative agriculture.pdf</span>
              <BsXLg />
            </div>
          </div>
        </div>

        {/* --- Attributes Section --- */}
        <div className="form-card">
          <div className="form-group">
            <label>Attributes</label>
            <div className="tabs">
              {tabs.map(tabName => (
                <button
                  key={tabName}
                  className={`tab-btn ${activeTab === tabName ? 'active' : ''}`}
                  onClick={() => setActiveTab(tabName)}
                >
                  {tabName}
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
            <label htmlFor="prompt-extraction">Prompt for Extractions</label>
            <select 
                id="prompt-extraction"
                value={extractionPromptId}
                onChange={(e) => setExtractionPromptId(e.target.value)}
                disabled={isExtractionExcluded}
              >
                <option value="" disabled>Select Prompt</option>
                {extractionPromptOptions.map(prompt => (
                  <option key={prompt.id} value={prompt.id}>{prompt.name}</option>
                ))}
              </select>
          </div>
          <div className="form-group">
            <label htmlFor="prompt-redraft">Prompt for Redrafting the proposal</label>
            <select 
                id="prompt-redraft"
                value={redraftPromptId}
                onChange={(e) => setRedraftPromptId(e.target.value)}
              >
                <option value="" disabled className='fsize'>Select Prompt</option>
                {redraftPromptOptions.map(prompt => (
                  <option key={prompt.id} value={prompt.id}>{prompt.name}</option>
                ))}
              </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;