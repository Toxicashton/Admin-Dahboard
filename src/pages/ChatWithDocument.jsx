import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from '../contexts/LayoutContext';
import { BsSendFill } from 'react-icons/bs'; // Using Fill version for the solid icon
import './ChatWithDocument.scss';

const ChatWithDocument = () => {
  const { setTopBarTitle } = useContext(LayoutContext);
  const [inputValue, setInputValue] = useState('');

  // Set the TopBar title when the page loads
  useEffect(() => {
    setTopBarTitle('Chat with Document');
    return () => setTopBarTitle('');
  }, [setTopBarTitle]);

  const handleSend = () => {
    // Logic to send message would go here
    console.log("Sending:", inputValue);
    setInputValue('');
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        
        {/* === Messages Area (Empty for now) === */}
        <div className="chat-messages">
          {/* Messages will be rendered here later */}
        </div>

        {/* === Input Area === */}
        <div className="chat-input-area">
          <input 
            type="text" 
            placeholder="Ask me anything..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-button" onClick={handleSend}>
            <BsSendFill />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChatWithDocument;