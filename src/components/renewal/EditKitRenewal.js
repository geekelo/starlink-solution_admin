import React from "react";
import "../../styles/KitRenewalModal.css";
import "../../styles/Wallet.css";
import { XCircle } from 'lucide-react';


const EditRenewalModal = ({ isOpen, closeModal, transaction, onSave }) => {




  const [formData, setFormData] = React.useState({
    kit_number: transaction?.kit_number || "",
    status: transaction?.status || "",
    amount: transaction?.amount || "",
    month: transaction?.month || "",
    year: transaction?.year || "",
    credit_admin: transaction?.credit_admin || false,
    start_date: transaction?.start_date || "",
    end_date: transaction?.end_date || "",
    deadline: transaction?.deadline ? new Date(transaction.deadline).toISOString().split('T')[0] : "",
    date_of_renewal: transaction?.date_of_renewal || ""
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateRecord = () => {
    onSave({
      ...transaction,
      ...formData
    });
    closeModal();
  };
  if (!isOpen || !transaction) {
    return null;
  }
  console.log(formData)
  return (
    <div className="modal-overlay">
      <div className="funding-modal">
        <div className="funding-modal-header">
          <h3>Edit Renewal</h3>
          <button onClick={closeModal}>
            <XCircle size={20} />
          </button>
        </div>
        <div className="funding-modal-body">
          <div className="modal-two-columns">
            {/* Left Column */}
            <div className="modal-column">
              <label>Kit Number:</label>
              <input 
                type="text" 
                name="kit_number" 
                placeholder="Kit Number" 
                value={formData.kit_number || ""} 
                onChange={handleInputChange} 
              />

              <label>Status:</label>
              <select 
                name="status" 
                value={formData.status || ""} 
                onChange={handleInputChange}
              >
                <option value="">Select Status</option>
                <option value="receipt">Receipt</option>
                <option value="invoice">Invoice</option>
              </select>

              <label>Kit Renewal Amount:</label>
              <input 
                type="number" 
                name="amount" 
                placeholder="Amount" 
                value={formData.amount || ""} 
                onChange={handleInputChange} 
              />

              <label>Month:</label>
              <input 
                type="text" 
                name="month" 
                placeholder="Month" 
                value={formData.month || ""} 
                onChange={handleInputChange} 
              />

              <label>Year:</label>
              <input 
                type="number" 
                name="year" 
                placeholder="Year" 
                value={formData.year || ""} 
                onChange={handleInputChange} 
              />

              <label>Kit Credit Admin:</label>
              <select
                name="credit_admin"
                value={formData.credit_admin ? "true" : "false"}
                onChange={(e) => handleInputChange({
                  target: {
                    name: "credit_admin",
                    value: e.target.value,
                    type: "checkbox",
                    checked: e.target.value === "true"
                  }
                })}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Right Column */}
            <div className="modal-column">
              <label>Kit Start Date:</label>
              <input 
                type="date" 
                name="start_date" 
                value={formData.start_date || ""} 
                onChange={handleInputChange} 
              />

              <label>Kit End Date:</label>
              <input 
                type="date" 
                name="end_date" 
                value={formData.end_date || ""} 
                onChange={handleInputChange} 
              />

              <label>Deadline:</label>
              <input 
                type="date" 
                name="deadline" 
                value={formData.deadline || ""} 
                onChange={handleInputChange} 
              />

              {formData.status === "receipt" && (
                <>
                  <label>Date of Renewal:</label>
                  <input 
                    type="date" 
                    name="date_of_renewal" 
                    value={formData.date_of_renewal || ""} 
                    onChange={handleInputChange} 
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="funding-modal-footer">
          <button onClick={handleCreateRecord}>
            {transaction?.id ? "Update" : "Save"}
          </button>
          <button onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRenewalModal;
