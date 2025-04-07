import React from "react";
import "../../styles/kitmodal.css";
import { X } from "lucide-react";
import Modal from "../modal/modal";
import AppButton from "../AppButton/Button";
import { FormLabel } from "../FormLabel/Label";
import { FormInput } from "../FormInput/Input";
import { FilterSelect } from "../FilterSelect/Filter";

const EditFundingModal = ({
  isOpen,
  formData,
  handleChange,
  handleSelectChange,
  handleRadioChange,
  handleSave,
  closeModal,
  loading,
  error,
}) => {
  if (!isOpen) return null;

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Success", value: "success" },
    { label: "Failed", value: "failed" },
  ];

  const footerContent = (
    <>
      <AppButton
        className="user-modal-button save"
        onClick={handleSave}
        loading={loading}
        loadingText="Saving..."
      >
        Save
      </AppButton>
      <AppButton className="user-modal-button cancel" onClick={closeModal}>
        Cancel
      </AppButton>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Edit Funding"
      size="md"
      footer={footerContent}
    >
      {error && <p className="error-message">{error}</p>}

      <div className="modal-form">
        <div className="form-group">
          <FormLabel htmlFor="amount">Amount:</FormLabel>
          <FormInput
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <FormLabel htmlFor="status">Status:</FormLabel>
          <FilterSelect
            options={statusOptions}
            defaultValue={formData.status}
            onChange={handleSelectChange}
            placeholder="Select status"
            name="status"
          />
        </div>

        <div className="form-group">
          <FormLabel>Credit Account:</FormLabel>
          <div className="kit-radio-group">
            <label>
              <input
                type="radio"
                name="credit_account"
                value="yes"
                checked={formData.credit_account === "yes"}
                onChange={handleRadioChange}
              />
              Yes
            </label>
            <label style={{ marginLeft: "1rem" }}>
              <input
                type="radio"
                name="credit_account"
                value="no"
                checked={formData.credit_account === "no"}
                onChange={handleRadioChange}
              />
              No
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditFundingModal;
