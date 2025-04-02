import React, { useState } from 'react';
import { Save } from 'lucide-react';
import AppButton from '../AppButton/Button';
import Modal from '../modal/modal';
import { FilterSelect } from '../FilterSelect/Filter';

const ManageKitRequestModal = ({ isOpen, onClose, kitRequest, plans, onSave }) => {
  // Initialize state with current kit request data or defaults
  const [status, setStatus] = useState(kitRequest?.status || 'pending');
  const [selectedPlan, setSelectedPlan] = useState(kitRequest?.planId || plans[0]?.id || '');

  // Convert status options to format required by FilterSelect
  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  // Convert plans to format required by FilterSelect
  const planOptions = plans.map(plan => ({
    value: plan.id,
    label: plan.name
  }));

  const handleSave = () => {
    onSave({ status, planId: selectedPlan });
    onClose();
  };

  // Define the footer content with AppButton components
  const modalFooter = (
    <>
      <AppButton
        variant="tertiary" 
        onClick={onClose}
      >
        Cancel
      </AppButton>
      <AppButton 
        variant="primary" 
        onClick={handleSave}
        leftIcon={<Save size={16} />}
      >
        Save Changes
      </AppButton>
    </>
  );

  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Kit Request"
      footer={modalFooter}
      size="md"
    >
      <div className="form-group">
        <FilterSelect
          label="Status"
          options={statusOptions}
          defaultValue={status}
          onChange={setStatus}
          placeholder="Select status"
        />
      </div>
        
      <div className="form-group">
        <FilterSelect
          label="Plan"
          options={planOptions}
          defaultValue={selectedPlan}
          onChange={setSelectedPlan}
          placeholder="Select plan"
        />
      </div>
    </Modal>
  );
};

export default ManageKitRequestModal;