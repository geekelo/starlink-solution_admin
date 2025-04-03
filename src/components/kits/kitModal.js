import React from "react";
import "../../styles/kitmodal.css"; 
import { X } from "lucide-react";
import Modal from "../modal/modal";
import AppButton from "../AppButton/Button";
import { FormLabel } from "../FormLabel/Label";
import { FormInput } from "../FormInput/Input";
import { FilterSelect } from "../FilterSelect/Filter";

const KitModal = ({ isOpen, formData, handleChange, handleSelectChange, handleSave, closeModal, error }) => {
  if (!isOpen) return null;

  const footerContent = (
    <>
      <AppButton className="user-modal-button save" onClick={handleSave}>
        Save
      </AppButton>
      <AppButton className="user-modal-button cancel" onClick={closeModal}>
        Cancel
      </AppButton>
    </>
  );
const options = [
  {label: 'Active', value: 'active'},
  {label: 'Inactive', value: 'inactive'},
]
  return (
    <Modal
    isOpen={isOpen}
    onClose={closeModal}
    title="Edit Kit"
    size="md"
    footer={footerContent}
  >
    {error && <p className="error-message">{error}</p>}
    
    <div className="modal-form">
      <div className="form-group">
        <FormLabel htmlFor="kit_number">Kit Number:</FormLabel>
        <FormInput
          id="kit_number"
          name="kit_number"
          value={formData.kit_number}
          onChange={handleChange}
          placeholder="Kit Number"
        />
      </div>

      <div className="form-group">
        <FormLabel htmlFor="address">Address:</FormLabel>
        <FormInput
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
      </div>

      <div className="form-group">
        <FormLabel htmlFor="company_name">Company Name:</FormLabel>
        <FormInput
          id="company_name"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          placeholder="Company Name"
        />
      </div>

      <div className="form-group">
        <FormLabel htmlFor="company_number">Company Number:</FormLabel>
        <FormInput
          id="company_number"
          name="company_number"
          value={formData.company_number}
          onChange={handleChange}
          placeholder="Company Number"
        />
      </div>

      <div className="form-group">
        <FormLabel htmlFor="nin">NIN:</FormLabel>
        <FormInput
          id="nin"
          name="nin"
          value={formData.nin}
          onChange={handleChange}
          placeholder="NIN"
        />
      </div>

      <div className="form-group">
    
        <FormLabel htmlFor="status">Status:</FormLabel>
     
        <FilterSelect
                        options={options}
                        defaultValue={formData.status}
                        onChange={handleSelectChange}
                        placeholder="Select status"
                        name="status"
                      
                      />
        
    
        {/* <select
          id="status"
          name="status"
          className="form-input"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select> */}
      </div>

      <div className="form-group">
        <FormLabel htmlFor="service_line_number">Service Line Number:</FormLabel>
        <FormInput
          id="service_line_number"
          name="service_line_number"
          value={formData.service_line_number}
          onChange={handleChange}
          placeholder="Service Line Number"
        />
      </div>
    </div>
  </Modal>
  );
};

export default KitModal;
