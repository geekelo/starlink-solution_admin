import React from "react";
import "../../styles/kitmodal.css"; 
import { X } from "lucide-react";

const KitModal = ({ isOpen, formData, handleChange, handleSave, closeModal, error }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="user-modal-container">
        <div className="modal-header">
          <h3 className="user-modal-title">Edit Kit</h3>
          <X size={20} className="close-icon" onClick={closeModal} />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="user-modal-content">
          <label className="user-modal-label">Kit Number:</label>
          <input
            type="text"
            className="user-modal-input"
            name="kit_number"
            value={formData.kit_number}
            onChange={handleChange}
            placeholder="Kit Number"
          />

          <label className="user-modal-label">Address:</label>
          <input
            type="text"
            className="user-modal-input"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />

          <label className="user-modal-label">Company Name:</label>
          <input
            type="text"
            className="user-modal-input"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
          />

          <label className="user-modal-label">Company Number:</label>
          <input
            type="text"
            className="user-modal-input"
            name="company_number"
            value={formData.company_number}
            onChange={handleChange}
            placeholder="Company Number"
          />

          <label className="user-modal-label">NIN:</label>
          <input
            type="text"
            className="user-modal-input"
            name="nin"
            value={formData.nin}
            onChange={handleChange}
            placeholder="NIN"
          />

          <label className="user-modal-label">Status:</label>
          <select
            name="status"
            className="user-modal-input"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <label className="user-modal-label">Service Line Number:</label>
          <input
            type="text"
            className="user-modal-input"
            name="service_line_number"
            value={formData.service_line_number}
            onChange={handleChange}
            placeholder="Service Line Number"
          />

          <div className="user-modal-actions">
            <button className="user-modal-button save" onClick={handleSave}>
              Save
            </button>
            <button className="user-modal-button cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitModal;
