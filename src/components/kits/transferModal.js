import React from "react";
import { X } from "lucide-react";

import "../../styles/kitmodal.css"; 

const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="user-modal-container">
        <div className="user-modal-header">
          <h3 className="user-modal-title">{title}</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="user-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
