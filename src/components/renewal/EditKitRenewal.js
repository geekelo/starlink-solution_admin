import React from "react";
import "../../styles/KitRenewalModal.css";
import "../../styles/Wallet.css";
import { createAxiosInstance } from "../../config/axios";
import { XCircle } from 'lucide-react';


const EditRenewalModal = ({ isOpen, closeModal, transaction, onSave }) => {




  const [formData, setFormData] = React.useState({
    status: transaction?.status || "",
    amount: transaction?.amount || "",
    month: transaction?.month || "",
    year: transaction?.year || "",
    credit_admin: transaction?.credit_admin || false,
    start_date: transaction?.start_date || "",
    end_date: transaction?.end_date || "",
    deadline: transaction?.deadline || "",
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
// const EditKitRenewalModal = ({ 
//   showModal, 
//   setShowModal, 
//   recordType, 
//   formData = {}, 
//   handleInputChange, 
//   handleCreateRecord 
// }) => {
//   if (!showModal) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="renewalmodal-container">
//         <h3>{formData?.id ? `Edit ${recordType}` : `Create ${recordType}`}</h3>
//         <div className="renewalmodal-content">
//           {/* Left Column */}
//           <div className="renewalmodal-col">
//             <label className="modal-label">Kit Number:</label>
//             <input 
//               className="modal-input" 
//               type="text" 
//               name="kit_number" 
//               placeholder="Kit Number" 
//               value={formData.kit_number || ""} 
//               onChange={handleInputChange} 
//             />

//             <label className="modal-label">Status:</label>
//             <select 
//               className="modal-input" 
//               name="status" 
//               value={formData.status || ""} 
//               onChange={handleInputChange}
//             >
//               <option value="">Select Status</option>
//               <option value="receipt">Receipt</option>
//               <option value="invoice">Invoice</option>
//             </select>

//             <label className="modal-label">Kit Renewal Amount:</label>
//             <input 
//               className="modal-input" 
//               type="number" 
//               name="amount" 
//               placeholder="Amount" 
//               value={formData.amount || ""} 
//               onChange={handleInputChange} 
//             />

//             <label className="modal-label">Month:</label>
//             <input 
//               className="modal-input" 
//               type="text" 
//               name="month" 
//               placeholder="Month" 
//               value={formData.month || ""} 
//               onChange={handleInputChange} 
//             />

//             <label className="modal-label">Year:</label>
//             <input 
//               className="modal-input" 
//               type="number" 
//               name="year" 
//               placeholder="Year" 
//               value={formData.year || ""} 
//               onChange={handleInputChange} 
//             />

//             <label className="modal-label">Kit Credit Admin:</label>
//             <input 
//               className="modal-input" 
//               type="text" 
//               name="credit_admin" 
//               placeholder="Credit Admin" 
//               value={formData.credit_admin || ""} 
//               onChange={handleInputChange} 
//             />
//           </div>

//           {/* Right Column */}
//           <div className="renewalmodal-col">
//             <label className="modal-label">Kit Start Date:</label>
//             <input 
//               className="modal-input" 
//               type="date" 
//               name="start_date" 
//               value={formData.start_date || ""} 
//               onChange={handleInputChange} 
//             />

//             <label className="modal-label">Kit End Date:</label>
//             <input 
//               className="modal-input" 
//               type="date" 
//               name="end_date" 
//               value={formData.end_date || ""} 
//               onChange={handleInputChange} 
//             />

//             <label className="modal-label">Deadline:</label>
//             <input 
//               className="modal-input" 
//               type="date" 
//               name="deadline" 
//               value={formData.deadline || ""} 
//               onChange={handleInputChange} 
//             />

//             {formData.status === "receipt" && (
//               <>
//                 <label className="modal-label">Date of Renewal:</label>
//                 <input 
//                   className="modal-input" 
//                   type="date" 
//                   name="date_of_renewal" 
//                   value={formData.date_of_renewal || ""} 
//                   onChange={handleInputChange} 
//                 />
//               </>
//             )}
//           </div>
//         </div>

//         {/* Modal Actions */}
//         <div className="modal-actions">
//           <button className="modal-button save" onClick={handleCreateRecord}>
//             {formData?.id ? "Update" : "Save"}
//           </button>
//           <button className="modal-button cancel" onClick={() => setShowModal(false)}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditKitRenewalModal;
