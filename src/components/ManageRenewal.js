import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createAxiosInstance } from "../config/axios";
import "../styles/Wallet.css";

const RenewalPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get("email") || "";

  const [email, setEmail] = useState(userEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [renewalData, setRenewalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recordType, setRecordType] = useState("");
  const [formData, setFormData] = useState({
    kit_number: "",
    status: "accepted",
    date_of_renewal: "",
    deadline: "",
    kit_renewal: {
      amount: "",
      month: "",
      year: "",
      credit_admin: "",
      start_date: "",
      end_date: "",
    },
  });

  useEffect(() => {
    if (userEmail) {
      handleSearch();
    }
  }, [userEmail]);

  const handleSearch = async () => {
    if (!email) return;
    setLoading(true);
    setError("");
    setRenewalData([]);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `/api/v1/admin/user_kit_renewals?email=${email}`
      );
      const sortedData = response.data.sort(
        (a, b) => new Date(b.date_of_renewal) - new Date(a.date_of_renewal)
      );
      setRenewalData(sortedData);
    } catch (err) {
      setError("No records found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecord = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const payload = {
        ...formData,
        date_of_renewal: recordType === "receipt" ? new Date().toISOString() : "",
        deadline: recordType === "invoice" ? new Date().toISOString() : "",
      };

      await axiosInstance.post(`/api/v1/admin/kit_renewals`, payload);
      alert(`${recordType} created successfully!`);
      setShowModal(false);
    } catch (err) {
      setError(`Failed to create ${recordType}. Please try again.`);
    }
  };

  const openModal = (type) => {
    setRecordType(type);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("kit_renewal.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        kit_renewal: { ...prev.kit_renewal, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="wallet-container">
      <div className="wallet-nav">
        <h2 className="wallet-header">Manage Kit Renewals</h2>
        <div className="funding-search-container">
          <div className="funding-search-bar">
            <input
              type="email"
              className="funding-search-input"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="funding-search-button" onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          <div className="renew-flex">
            <button className="create-funds-button" onClick={() => openModal("invoice")}>
              Create Invoice
            </button>
            <button className="create-funds-button" onClick={() => openModal("receipt")}>
              Create Receipt
            </button>
          </div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {showModal && (
       <div className="user-modal-overlay">
       <div className="user-modal-container">
       
            <h3>Create {recordType}</h3>
            <div className="user-modal-content">
            <label className="user-modal-label">Kit Number:</label>
         
            <input className="user-modal-input" type="text" name="kit_number" placeholder="Kit Number" value={formData.kit_number} onChange={handleInputChange} />
            <label className="user-modal-label">Kit Renewal Amount:</label>
         
            <input className="user-modal-input" type="number" name="kit_renewal.amount" placeholder="Amount" value={formData.kit_renewal.amount} onChange={handleInputChange} />
            <label className="user-modal-label">Month:</label>
         
            <input className="user-modal-input" type="text" name="kit_renewal.month" placeholder="Month" value={formData.kit_renewal.month} onChange={handleInputChange} />
            <label className="user-modal-label">Year:</label>
         
            <input className="user-modal-input" type="number" name="kit_renewal.year" placeholder="Year" value={formData.kit_renewal.year} onChange={handleInputChange} />
            <label className="user-modal-label">Kit Credit Admin:</label>
         
            <input className="user-modal-input" type="text" name="kit_renewal.credit_admin" placeholder="Credit Admin" value={formData.kit_renewal.credit_admin} onChange={handleInputChange} />
            <label className="user-modal-label">Kit StartDate:</label>
         
            <input className="user-modal-input" type="date" name="kit_renewal.start_date" placeholder="Start Date" value={formData.kit_renewal.start_date} onChange={handleInputChange} />
            <label className="user-modal-label">Kit EndDate:</label>
         
            <input type="date" name="kit_renewal.end_date" className="user-modal-input" placeholder="End Date" value={formData.kit_renewal.end_date} onChange={handleInputChange} />
            <div className="user-modal-actions">
            <button  className="user-modal-button save" onClick={handleCreateRecord}>Save</button>
            <button className="user-modal-button cancel" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenewalPage;