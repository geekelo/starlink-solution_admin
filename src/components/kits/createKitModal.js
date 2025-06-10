import React, { useState } from "react";
import { createAxiosInstance } from "../../config/axios";
import Modal from "../modal/modal";
import { FormInput } from "../FormInput/Input";
import { FormLabel } from "../FormLabel/Label";
import AppButton from "../AppButton/Button";
import { toast } from "react-toastify";


const AddKitModal = ({ isOpen, onClose, userId, onSuccess, userEmail }) => {
  const [form, setForm] = useState({
    kit_number: "",
    address: "",
    nin: "",
    company_name: "",
    company_number: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.post(
        `/api/v1/admin/kit_transfers/add_kit_to_user?user_email=${encodeURIComponent(userEmail)}`,
        {
          starlink_kit: {
            ...form,
            user_id: userId,
          },
        }
      );
      toast.success("Kit added successfully!");
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Add kit error:", error.response?.data || error.message);
      toast.error("Failed to add kit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Kit"
      size="md"
      footer={
        <div className="modal-actions">
          <AppButton variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Kit"}
          </AppButton>
          <AppButton variant="secondary" onClick={onClose}>
            Cancel
          </AppButton>
        </div>
      }
    >
      <div className="form-group">
        <FormLabel htmlFor="kit_number">Kit Number:</FormLabel>
        <FormInput
          id="kit_number"
          name="kit_number"
          value={form.kit_number}
          onChange={handleChange}
          placeholder="Enter Kit Number"
          required
        />
      </div>

      <div className="form-group">
        <FormLabel htmlFor="address">Address:</FormLabel>
        <FormInput
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter Address"
          required
        />
      </div>

      <div className="form-group">
        <FormLabel htmlFor="nin">NIN:</FormLabel>
        <FormInput
          id="nin"
          name="nin"
          value={form.nin}
          onChange={handleChange}
          placeholder="Enter NIN"
        />
      </div>

      <div className="form-group">
        <FormLabel htmlFor="company_name">Company Name:</FormLabel>
        <FormInput
          id="company_name"
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
          placeholder="Enter Company Name"
        />
      </div>

      <div className="form-group">
        <FormLabel htmlFor="company_number">Company Number:</FormLabel>
        <FormInput
          id="company_number"
          name="company_number"
          value={form.company_number}
          onChange={handleChange}
          placeholder="Enter Company Number"
        />
      </div>
    </Modal>
  );
};

export default AddKitModal;
