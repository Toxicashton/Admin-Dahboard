import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { LayoutContext } from '../contexts/LayoutContext';
import requestsData from '../data/dummyRequests.json';
import './EditRequestDetails.scss';

// --- MOCK DATA FOR PROMPTS (Your correct version) ---
const allPromptOptions = [
  { 
    id: 'p1', 
    name: 'Please find any claims or statements, with more than 10 words, strongly related to clear and explicit references to sustainable practices and principles in the provided content that might be exposed to ESG rules. Avoid empty lines as well as your comments and replace numbered claims by bullets.' 
  },
  { 
    id: 'p2', 
    name: 'Since 2010, NESCAFÉ has supported coffee farmers with plantlets bred for improved resilience to climate variations. For example, selected improved plantlet varieties distributed through the NESCAFÉ Plan in certain regions have shown, in field trials and on-farm data, up to 50% higher yield per tree compared to local traditional varieties under similar agronomic conditions.'
  },
  {
    id: 'p3',
    name: 'Review the claims for general compliance and redraft as needed.'
  }
];

// --- MOCK DATA FOR CLAIMS ---
const dummyClaims = [
  {
    claimNo: 1,
    description: 'Since 2010, NESCAFÉ has supported coffee farmers with plantlets bred for improved resilience to climate variations.',
    status: 'Done'
  },
  {
    claimNo: 2,
    description: 'An internal environmental assessment (conducted in 2022, methodology and details available at [link]) estimates that these yield improvements, by increasing production with similar land, fertilizer.',
    status: 'Review'
  },
  {
    claimNo: 3,
    description: 'By referencing peer-reviewed or company-verified data and providing a direct link to further substantiation, this wording also supports good practice in ESG reporting and communications.',
    status: 'Review'
  }
];

const EditRequestDetails = () => {
  const { setTopBarTitle } = useContext(LayoutContext);
  const { requestId } = useParams();
  const [activeTab, setActiveTab] = useState('Request Details');
  
  const request = requestsData.find(r => r.id === requestId);
  
  const [status, setStatus] = useState(request ? request.status : '');
  const [isExtractionExcluded, setIsExtractionExcluded] = useState(false);
  const [extractionPromptId, setExtractionPromptId] = useState('p1');
  const [redraftPromptId, setRedraftPromptId] = useState('p2');

  // Note: We don't need selectedExtractionPrompt or selectedRedraftPrompt
  // because the text is in the dropdown itself.

  useEffect(() => {
    setTopBarTitle(
      <div className="breadcrumb-header">
        <Link to="/dashboard">Dashboard</Link>
        <span>/</span>
        <p>Edit Details</p>
      </div>
    );
    return () => setTopBarTitle('');
  }, [setTopBarTitle]);

  if (!request) {
    return <p>Request not found.</p>;
  }

  return (
    <div className="edit-details-page">
      <Link to="/dashboard" className="back-button">
        <BsArrowLeft />
      </Link>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'Request Details' ? 'active' : ''}`}
          onClick={() => setActiveTab('Request Details')}
        >
          Request Details
        </button>
        <button
          className={`tab-btn ${activeTab === 'Claim Details' ? 'active' : ''}`}
          onClick={() => setActiveTab('Claim Details')}
        >
          Claim Details
        </button>
      </div>

      {/* --- Tab Content: REQUEST DETAILS --- */}
      {activeTab === 'Request Details' && (
        <div className="tab-content-wrapper">
          <div className="details-grid">
            {/* ... (All grid-items: ID, Content, Status, etc.) ... */}
            <div className="grid-item">
              <label>Request ID</label>
              <p>{request.id}</p>
            </div>
            <div className="grid-item">
              <label>Content</label>
              <a href={request.url} target="_blank" rel="noopener noreferrer">{request.content}</a>
            </div>
            <div className="grid-item">
              <label>No. of Claims</label>
              <p>{request.claims} <a href="#">View Details</a></p>
            </div>
            <div className="grid-item">
              <label>Responsible</label>
              <input type="text" value={request.responsible} readOnly />
            </div>
            <div className="grid-item">
              <label>Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Created">Created</option>
                <option value="In Progress">In Progress</option>
                <option value="Generated">Generated</option>
                <option value="Discarded">Discarded</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          
          <div className="prompts-container">
            <div className="form-group">
              
              

              {/* --- Extraction Prompt --- */}
              <div className="form-group" style={{ opacity: isExtractionExcluded ? 0.5 : 1 }}>
                <label htmlFor="prompt-extraction">AI prompt for content extraction</label>
                <select 
                  id="prompt-extraction"
                  value={extractionPromptId}
                  onChange={(e) => setExtractionPromptId(e.target.value)}
                  disabled={isExtractionExcluded}
                >
                  <option value="" disabled>Select Prompt</option>
                  {allPromptOptions.map(prompt => (
                    <option key={prompt.id} value={prompt.id}>{prompt.name}</option>
                  ))}
                </select>
                
                {/* No text box needed, per your design */}
              </div>

              {/* --- Redrafting Prompt --- */}
              <div className="form-group">
                <label htmlFor="prompt-redraft">AI prompt for content analysis and redraft</label>
                <select 
                  id="prompt-redraft"
                  value={redraftPromptId}
                  onChange={(e) => setRedraftPromptId(e.target.value)}
                >
                  <option value="" disabled>Select Prompt</option>
                  {allPromptOptions.map(prompt => (
                    <option key={prompt.id} value={prompt.id}>{prompt.name}</option>
                  ))}
                </select>
                
                {/* No text box needed, per your design */}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- Tab Content: CLAIM DETAILS --- */}
      {activeTab === 'Claim Details' && (
        <div className="tab-content-wrapper">
          <div className="claim-list-header">
            <span>Claim no.</span>
            <span>Claim Description</span>
          </div>
          <ul className="claim-list">
            {dummyClaims.map((claim) => (
              <li key={claim.claimNo} className="claim-item">
                <span className="claim-number">{claim.claimNo}</span>
                <p className="claim-description">{claim.description}</p>
                <button 
                  className={`button button-small ${claim.status === 'Done' ? 'button-done' : 'button-review'}`}
                >
                  {claim.status}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EditRequestDetails;