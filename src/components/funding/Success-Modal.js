


import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <CheckCircle size={50} color="green" />
        <h3>{message}</h3>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default SuccessModal;