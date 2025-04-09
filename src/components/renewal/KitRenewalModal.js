import { Calendar, CalendarDays, CalendarPlus, CalendarX, Clock, DollarSign, FileText, RefreshCw, Tag, UserCheck } from "lucide-react";
import React from "react";
import Modal from "../modal/modal";
import "../../styles/KitRenewalModal.css";
import { FormLabel } from "../FormLabel/Label";
import { FormInput } from "../FormInput/Input";
import { Select } from "../Select/Select";
import AppButton from "../AppButton/Button";

const KitRenewalModal = ({ 
  showModal, 
  setShowModal, 
  recordType, 
  formData, 
  handleInputChange, 
  handleCreateRecord 
}) => {
    // Status options for the select dropdown
    const statusOptions = [
      { value: "", label: "Select Status" },
      { value: "receipt", label: "Receipt" },
      { value: "invoice", label: "Invoice" }
    ];
  
    // Handle select change for status
    const handleStatusChange = (value) => {
      handleInputChange({
        target: {
          name: "status",
          value: value
        }
      });
    };
  
    // Handle select change for credit admin
    const handleCreditAdminChange = (value) => {
      handleInputChange({
        target: {
          name: "kit_renewal.credit_admin",
          value: value,
          type: "text"
        }
      });
    };
  
    // Credit admin options
    const creditAdminOptions = [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" }
    ];
  
  if (!showModal) return null;

  return (
    <Modal
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    title={`Create ${recordType}`}
    footer={
<>
        <AppButton variant="success" onClick={handleCreateRecord}>Save</AppButton>
        <AppButton variant="danger" onClick={() => setShowModal(false)}>Cancel</AppButton>
        </>
    }
    size="md"
  >
    <div className="renewalmodal-content">
      {/* Left Column */}
      <div className="renewalmodal-col">
        <FormLabel htmlFor="kit_number">Kit Number:</FormLabel>
        <FormInput
          id="kit_number"
          name="kit_number"
          type="text"
          placeholder="Kit Number"
          value={formData.kit_number || ""}
          onChange={handleInputChange}
          icon={<FileText size={18} />}
        />
        
        <FormLabel htmlFor="status">Status:</FormLabel>
        <Select
          options={statusOptions}
          defaultValue={formData.status || ""}
          onChange={handleStatusChange}
          placeholder="Select Status"
          
        />
        
        <FormLabel htmlFor="kit_renewal.amount">Kit Renewal Amount:</FormLabel>
        <FormInput
          id="kit_renewal_amount"
          name="kit_renewal.amount"
          type="number"
          placeholder="Amount"
          value={formData.kit_renewal?.amount || ""}
          onChange={handleInputChange}
          icon={<DollarSign size={18} />}
        />
        
        <FormLabel htmlFor="kit_renewal.month">Month:</FormLabel>
        <FormInput
          id="kit_renewal_month"
          name="kit_renewal.month"
          type="text"
          placeholder="Month"
          value={formData.kit_renewal?.month || ""}
          onChange={handleInputChange}
          icon={<Calendar size={18} />}
        />
        
        <FormLabel htmlFor="kit_renewal.year">Year:</FormLabel>
        <FormInput
          id="kit_renewal_year"
          name="kit_renewal.year"
          type="number"
          placeholder="Year"
          value={formData.kit_renewal?.year || ""}
          onChange={handleInputChange}
          icon={<CalendarDays size={18} />}
        />
        
        <FormLabel htmlFor="kit_renewal.credit_admin">Kit Credit Admin:</FormLabel>
        <Select
          options={creditAdminOptions}
          defaultValue={formData.kit_renewal?.credit_admin || "false"}
          onChange={handleCreditAdminChange}
          placeholder="Select Credit Admin Status"
    
        />
      </div>
      
      {/* Right Column */}
      <div className="renewalmodal-col">
        <FormLabel htmlFor="kit_renewal.start_date">Kit Start Date:</FormLabel>
        <FormInput
          id="kit_renewal_start_date"
          name="kit_renewal.start_date"
          type="date"
          value={formData.kit_renewal?.start_date || ""}
          onChange={handleInputChange}
     
        />
        
        <FormLabel htmlFor="kit_renewal.end_date">Kit End Date:</FormLabel>
        <FormInput
          id="kit_renewal_end_date"
          name="kit_renewal.end_date"
          type="date"
          value={formData.kit_renewal?.end_date || ""}
          onChange={handleInputChange}
       
        />
        
        <FormLabel htmlFor="kit_renewal.deadline">Deadline:</FormLabel>
        <FormInput
          id="kit_renewal_deadline"
          name="kit_renewal.deadline"
          type="date"
          value={formData.kit_renewal?.deadline || ""}
          onChange={handleInputChange}
        />
        
        {formData.status === "receipt" && (
          <>
            <FormLabel htmlFor="date_of_renewal">Date of Renewal:</FormLabel>
            <FormInput
              id="date_of_renewal"
              name="date_of_renewal"
              type="date"
              value={formData.date_of_renewal || ""}
              onChange={handleInputChange}
              icon={<RefreshCw size={18} />}
            />
          </>
        )}
      </div>
    </div>
  </Modal>
    // <div className="modal-overlay">
    //   <div className="modal-container">
    //     <h3>Create {recordType}</h3>
    //     <div className="modal-content">
    //       {/* Left Column */}
    //       <div className="modal-col">
    //         <label className="modal-label">Kit Number:</label>
    //         <input className="modal-input" type="text" name="kit_number" placeholder="Kit Number" value={formData.kit_number} onChange={handleInputChange} />

    //         <label className="modal-label">Status:</label>
    //         <select className="modal-input" name="status" value={formData.status} onChange={handleInputChange}>
    //             <option value="">Select Status</option>
    //             <option value="receipt">Receipt</option>
    //             <option value="invoice">Invoice</option>
    //         </select>

    //         <label className="modal-label">Kit Renewal Amount:</label>
    //         <input className="modal-input" type="number" name="kit_renewal.amount" placeholder="Amount" value={formData.kit_renewal.amount} onChange={handleInputChange} />

    //         <label className="modal-label">Month:</label>
    //         <input className="modal-input" type="text" name="kit_renewal.month" placeholder="Month" value={formData.kit_renewal.month} onChange={handleInputChange} />

    //         <label className="modal-label">Year:</label>
    //         <input className="modal-input" type="number" name="kit_renewal.year" placeholder="Year" value={formData.kit_renewal.year} onChange={handleInputChange} />

    //         <label className="modal-label">Kit Credit Admin:</label>
    //         <input className="modal-input" type="text" name="kit_renewal.credit_admin" placeholder="Credit Admin" value={formData.kit_renewal.credit_admin} onChange={handleInputChange} />
    //       </div>

    //       {/* Right Column */}
    //       <div className="modal-col">
    //         <label className="modal-label">Kit Start Date:</label>
    //         <input className="modal-input" type="date" name="kit_renewal.start_date" value={formData.kit_renewal.start_date} onChange={handleInputChange} />

    //         <label className="modal-label">Kit End Date:</label>
    //         <input className="modal-input" type="date" name="kit_renewal.end_date" value={formData.kit_renewal.end_date} onChange={handleInputChange} />

    //         <label className="modal-label">Deadline:</label>
    //         <input className="modal-input" type="date" name="kit_renewal.deadline" value={formData.kit_renewal.deadline} onChange={handleInputChange} />
    //        {formData.status === "receipt" && (
    //           <>
    //             <label className="modal-label">Date of Renewal:</label>
    //             <input className="modal-input" type="date" name="da" value={formData.date_of_renewal} onChange={handleInputChange} />
    //           </>              
    //         )}      
    //       </div>
    //     </div>

    //     <div className="modal-actions">
    //       <button className="modal-button save" onClick={handleCreateRecord}>Save</button>
    //       <button className="modal-button cancel" onClick={() => setShowModal(false)}>Cancel</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default KitRenewalModal;
