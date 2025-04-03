import React from 'react';
import { FilterSelect } from '../FilterSelect/Filter';
import Modal from '../modal/modal';
import { FormLabel } from '../FormLabel/Label';
import AppButton from '../AppButton/Button';
import { Save, X } from 'lucide-react';
import { FormInput } from '../FormInput/Input';


/**
 * UserEditModal - Component for editing user information
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {Object} props.user - The user data to edit
 * @param {Function} props.onSave - Function to call when save button is clicked
 * @param {Function} props.onChange - Function to update user data
 */
const UserEditModal = ({ isOpen, onClose, user, onSave, onChange }) => {
  // Early return if no user data is provided
  if (!user) return null;

  // Handle user data changes
  const handleChange = (field, value) => {
    onChange({ ...user, [field]: value });
  };
  const handleInputChange = (e) => {
    handleChange(e.target.name, e.target.value);
  };


  const emailOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" }
  ]

  const whatappsOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" }
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit User"
      size="md"
      footer={
        <div className="modal-actions">
           <AppButton 
            variant="primary" 
            onClick={onSave}
           
          >
            Save
          </AppButton>
          <AppButton 
            variant="secondary" 
            onClick={onClose}
         
          >
            Cancel
          </AppButton>
        </div>
      }
    >
  <div className="form-group">
        <FormLabel htmlFor="name">Name:</FormLabel>
        <FormInput
          id="name"
          name="name"
          type="text"
          placeholder="Enter user name"
          value={user.name || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <FormLabel htmlFor="email">Email:</FormLabel>
        <FormInput
          id="email"
          name="email"
          type="email"
          placeholder="Enter email address"
          value={user.email || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <FormLabel htmlFor="phone">Phone:</FormLabel>
        <FormInput
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter phone number"
          value={user.phone || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <FormLabel htmlFor="whatsapp">WhatsApp:</FormLabel>
        <FormInput
          id="whatsapp"
          name="whatsapp"
          type="tel"
          placeholder="Enter WhatsApp number"
          value={user.whatsapp || ''}
          onChange={handleInputChange}
        />
      </div>


      <div className="form-group">
      <FormLabel>Email Confirmed:</FormLabel>

        <FilterSelect
          options={emailOptions}
          value={user.email_confirmed?.toString() || "false"}
          onChange={(value) => handleChange('email_confirmed', value === "true")}
          placeholder="Select status"
        />
      </div>

      <div className="form-group">
        <FormLabel>WhatsApp Confirmed:</FormLabel>
   
        <FilterSelect
          options={whatappsOptions}
          value={user.whatsapp_number_confirmed?.toString() || "false"}
          onChange={(value) => handleChange('whatsapp_number_confirmed', value === "true")}
          placeholder="Select status"
        />
      </div>
    </Modal>
  );
};

export default UserEditModal;