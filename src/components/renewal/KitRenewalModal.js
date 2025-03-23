import React from "react";
import "../../styles/KitRenewalModal.css";

const KitRenewalModal = ({ 
  showModal, 
  setShowModal, 
  recordType, 
  formData, 
  handleInputChange, 
  handleCreateRecord 
}) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Create {recordType}</h3>
        <div className="modal-content">
          {/* Left Column */}
          <div className="modal-col">
            <label className="modal-label">Kit Number:</label>
            <input className="modal-input" type="text" name="kit_number" placeholder="Kit Number" value={formData.kit_number} onChange={handleInputChange} />

            <label className="modal-label">Status:</label>
            <select className="modal-input" name="status" value={formData.status} onChange={handleInputChange}>
                <option value="">Select Status</option>
                <option value="receipt">Receipt</option>
                <option value="invoice">Invoice</option>
            </select>

            <label className="modal-label">Kit Renewal Amount:</label>
            <input className="modal-input" type="number" name="kit_renewal.amount" placeholder="Amount" value={formData.kit_renewal.amount} onChange={handleInputChange} />

            <label className="modal-label">Month:</label>
            <input className="modal-input" type="text" name="kit_renewal.month" placeholder="Month" value={formData.kit_renewal.month} onChange={handleInputChange} />

            <label className="modal-label">Year:</label>
            <input className="modal-input" type="number" name="kit_renewal.year" placeholder="Year" value={formData.kit_renewal.year} onChange={handleInputChange} />

            <label className="modal-label">Kit Credit Admin:</label>
            <input className="modal-input" type="text" name="kit_renewal.credit_admin" placeholder="Credit Admin" value={formData.kit_renewal.credit_admin} onChange={handleInputChange} />
          </div>

          {/* Right Column */}
          <div className="modal-col">
            <label className="modal-label">Kit Start Date:</label>
            <input className="modal-input" type="date" name="kit_renewal.start_date" value={formData.kit_renewal.start_date} onChange={handleInputChange} />

            <label className="modal-label">Kit End Date:</label>
            <input className="modal-input" type="date" name="kit_renewal.end_date" value={formData.kit_renewal.end_date} onChange={handleInputChange} />

            <label className="modal-label">Deadline:</label>
            <input className="modal-input" type="date" name="kit_renewal.deadline" value={formData.kit_renewal.deadline} onChange={handleInputChange} />
           {formData.status === "receipt" && (
              <>
                <label className="modal-label">Date of Renewal:</label>
                <input className="modal-input" type="date" name="da" value={formData.date_of_renewal} onChange={handleInputChange} />
              </>              
            )}      
          </div>
        </div>

        <div className="modal-actions">
          <button className="modal-button save" onClick={handleCreateRecord}>Save</button>
          <button className="modal-button cancel" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default KitRenewalModal;
