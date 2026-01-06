import React from 'react';
import './Modal.scss';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* The Modal handles the Title */}
        {title && <h2 className="modal-title">{title}</h2>}
        
        {children}
        
        {/* The Modal handles the Close Button */}
        <button onClick={onClose} className="modal-close">
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;