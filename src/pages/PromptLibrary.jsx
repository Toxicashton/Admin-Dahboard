import React, { useState, useEffect, useContext } from 'react';
import { BsSearch, BsPlusLg } from 'react-icons/bs';
import { LayoutContext } from '../contexts/LayoutContext';
import './PromptLibrary.scss';

// --- 1. THESE IMPORTS WERE MISSING ---
import { useModal } from '../hooks/useModal';
import Modal from '../components/ui/Modal';
import PromptForm from '../components/features/forms/PromptForm';

// --- MOCK DATA ---
const categories = [
  "Prompt for claim identification",
  "Prompt for claim analysis & redraft"
];

const dummyPrompts = [
  {
    id: 1,
    title: "Redraft and Identification",
    category: "Prompt for claim identification",
    text: "Since 2010, NESCAFÉ has supported coffee farmers with plantlets bred for improved resilience to climate variations. For example, selected improved plantlet varieties distributed through the NESCAFÉ Plan in certain regions have shown, in field trials and on-farm data, up to 50% higher yield per tree compared to local traditional varieties under similar agronomic conditions."
  },
  {
    id: 2,
    title: "Redraft year 2025",
    category: "Prompt for claim identification",
    text: "In Colombia, during the 2010-2012 leaf rust epidemic, NESCAFÉ contributed more than 37 million disease-resistant plantlets to over 33,000 farmers, helping to restore productivity and reduce pressure to expand coffee cultivation into native forests."
  },
  {
    id: 3,
    title: "Analysis Logic 1",
    category: "Prompt for claim analysis & redraft",
    text: "Analyze the following text for greenwashing patterns based on the EU directive 2024."
  }
];

const PromptLibrary = () => {
  const { setTopBarTitle } = useContext(LayoutContext);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // --- 2. USE THE HOOK ---
  const { 
    isOpen: isAddOpen, 
    openModal: openAddModal, 
    closeModal: closeAddModal 
  } = useModal();

  useEffect(() => {
    setTopBarTitle('Prompt Library');
    return () => setTopBarTitle('');
  }, [setTopBarTitle]);

  const filteredPrompts = dummyPrompts.filter(prompt => {
    const matchesCategory = prompt.category === selectedCategory;
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prompt.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="prompt-library-page">
      <div className="library-container">
        
        {/* === Toolbar === */}
        <div className="library-toolbar">
          <div className="spacer"></div>
          <div className="toolbar-actions">
            
            {/* Category Selector */}
            <div className="category-selector">
              <label>Prompts Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
              <BsSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search Prompt" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Add Button */}
            <button className="button button-primary" onClick={openAddModal}>
              <BsPlusLg /> Add New Prompt
            </button>
          </div>
        </div>

        {/* === Prompts List === */}
        <div className="prompts-list">
          <h3 className="section-title">{selectedCategory}</h3>

          <div className="prompts-grid">
            {filteredPrompts.length > 0 ? (
              filteredPrompts.map(prompt => (
                <div key={prompt.id} className="prompt-card">
                  <div className="card-header">
                    <h4>{prompt.title}</h4>
                    <button className="preview-btn">Preview</button>
                  </div>
                  <p className="prompt-text">{prompt.text}</p>
                </div>
              ))
            ) : (
              <div className="no-data">No prompts found in this category.</div>
            )}
          </div>
        </div>

      </div>

      {/* --- 3. RENDER THE MODAL --- */}
      <Modal 
        isOpen={isAddOpen} 
        onClose={closeAddModal} 
        title="Create New Prompt"
      >
        <PromptForm onClose={closeAddModal} />
      </Modal>

    </div>
  );
};

export default PromptLibrary;