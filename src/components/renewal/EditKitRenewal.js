import React, { useState, useEffect } from "react";
import "../../styles/KitRenewalModal.css";
import "../../styles/Wallet.css";
import { XCircle } from "lucide-react";
import { FormSelect } from "../FormSelect";
import { toast } from "react-toastify";
import { createAxiosInstance } from "../../config/axios"; 

const EditRenewalModal = ({ isOpen, closeModal, transaction, }) => {
  const [formData, setFormData] = useState({
    kit_number: transaction?.kit_number || "",
    status: transaction?.status || "",
    amount: transaction?.amount || "",
    month: transaction?.month || "",
    year: transaction?.year || "",
    credit_admin: transaction?.credit_admin || false,
    start_date: transaction?.start_date || "",
    end_date: transaction?.end_date || "",
    deadline: transaction?.deadline
      ? new Date(transaction.deadline).toISOString().split("T")[0]
      : "",
    date_of_renewal: transaction?.date_of_renewal || "",
    prorated : transaction?.prorated  || false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        kit_number: transaction?.kit_number || "",
        status: transaction?.status || "",
        amount: transaction?.amount || "",
        month: transaction?.month || "",
        year: transaction?.year || "",
        credit_admin: transaction?.credit_admin || false,
        start_date: transaction?.start_date || "",
        end_date: transaction?.end_date || "",
        deadline: transaction?.deadline
          ? new Date(transaction.deadline).toISOString().split("T")[0]
          : "",
        date_of_renewal: transaction?.date_of_renewal || "",
        prorated: transaction?.prorated || false,

      });
    }
  }, [transaction]);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const booleanFields = ["credit_admin", "prorated"];
    const isBooleanField = booleanFields.includes(name);
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : isBooleanField
        ? value === "true"
        : value,
    }));
  };
  
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const axiosInstance = createAxiosInstance();
  
      const response = await axiosInstance.put(
        `/api/v1/admin/kit_renewals/${transaction?.id}`,
        formData
      );
  
      if (response.data) {
        toast.success("Renewal updated successfully!");
        setFormData(response.data);
       
        closeModal();
      } else {
        throw new Error("Failed to update renewal.");
      }
    } catch (error) {
      console.error("Error saving renewal:", error);
      toast.error("Failed to update renewal. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  if (!isOpen || !transaction) {
    return null;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
              <FormSelect
                id="kit_renewal_month"
                name="month"
                value={formData.month || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Month
                </option>
                {months.map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </FormSelect>

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
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "credit_admin",
                      value: e.target.value,
                      type: "checkbox",
                      checked: e.target.value === "true",
                    },
                  })
                }
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
              {formData.status === "invoice" || "receipt" && (
  <>
    <label>Prorated:</label>
    <select
  name="prorated"
  value={formData.prorated ? "true" : "false"}
  onChange={handleInputChange}
>
  <option value="true">Yes</option>
  <option value="false">No</option>
</select>

  </>
)}

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
          <button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditRenewalModal;
