import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createAxiosInstance } from "../../config/axios";
import "../../styles/Wallet.css";
import KitRenewalModal from "./KitRenewalModal";
import Renewal from "./Renewal";
import EditKitRenewalModal from "./EditKitRenewal";

const RenewalPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const kitNum = queryParams.get("kitNumber") || "";

  const [kitNumber, setkitNumber] = useState(kitNum);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [renewalData, setRenewalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recordType, setRecordType] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  const [formData, setFormData] = useState({
    kit_number: "",
    status: "",
    date_of_renewal: "",
   
      amount: "",
      month: "",
      year: "",
      credit_admin: "",
      start_date: "",
      end_date: "",
      deadline: "",
    
  });

  useEffect(() => {
    if (kitNumber) {
      handleSearch();
    }
  }, [kitNum]);

  const handleSearch = async () => {
    if (!kitNumber) return;
    setLoading(true);
    setError("");
    setRenewalData([]);
  
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(`/api/v1/admin/kit_renewals?kit_number=${kitNumber}`);
  
      if (response.data.length > 0) {
        const sortedData = response.data.sort((a, b) => new Date(b.date_of_renewal) - new Date(a.date_of_renewal));
        setRenewalData(sortedData);
      } else {
        setError("No records found.");
      }
    } catch (err) {
      setError("Error fetching records.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateRecord = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      
      const url = formData.id
        ? `/api/v1/admin/kit_renewals/${formData.id}`
        : `/api/v1/admin/kit_renewals`;
  
      const method = formData.id ? "patch" : "post"; // Use POST for creating, PATCH for updating
  
      const response = await axiosInstance[method](url, {
        ...formData,
        kit_number: formData.kit_number,
      });
  console.log(FormData)
      console.log("Response:", response);
  
      // Refresh the records after successful creation/update
      handleSearch();
  
      setShowModal(false);
    } catch (error) {
      setError("Failed to save the record. Please try again.");
      console.error("Error:", error);
    }
  };
  
  const handleEditRecord = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.patch(`/api/v1/admin/kit_renewals/${selectedRecordId}`, formData);
      alert("Renewal updated successfully!");
      setShowModal(false);
      setEditMode(false);
      handleSearch(); // Refresh data
    } catch (err) {
      setError("Failed to update renewal. Please try again.");
    }
  };const openModal = (type, transaction = null) => {
    setRecordType(type);
    setShowModal(true);
  
    if (transaction) {
      setEditMode(true);
      setSelectedRecordId(transaction.id);
      setFormData({
        kit_number: transaction.kit_number || "",
        status: transaction.status || "",
        date_of_renewal: transaction.date_of_renewal || "",
        amount: transaction.amount || "",
        month: transaction.month || "",
        year: transaction.year || "",
        credit_admin: transaction.credit_admin || false,
        start_date: transaction.start_date || "",
        end_date: transaction.end_date || "",
        deadline: transaction.deadline || "",
      });
    } else {
      setEditMode(false);
      setSelectedRecordId(null);
      setFormData({
        kit_number: kitNumber,
        status: "",
        date_of_renewal: "",
        amount: "",
        month: "",
        year: "",
        credit_admin: false,
        start_date: "",
        end_date: "",
        deadline: "",
      });
    }
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name.startsWith("kit_renewal.")) {
        const field = name.split(".")[1];
        return { ...prev, kit_renewal: { ...prev.kit_renewal, [field]: value } };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  console.log(FormData)
  

  return (
    <div className="wallet-container">
      <div className="wallet-nav">
        <h2 className="wallet-header">Manage Kit Renewals</h2>
        <div className="funding-search-container">
          <div className="funding-search-bar">
            <input
              type="text"
              className="funding-search-input"
              placeholder="Enter kit number"
              value={kitNumber || ""}
              onChange={(e) => setkitNumber(e.target.value)}
            />
            <button className="funding-search-button" onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          <div className="renew-flex">
            <button className="create-funds-button" onClick={() => openModal("invoice")}>
              Create Renewal
            </button>
          </div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {renewalData.length > 0 ? (
        renewalData.map((item) => (
          <Renewal key={item.id} transaction={item} openModal={openModal} />
        ))
      ) : (
        <p className="error-message">No records found.</p>
      )}

      {showModal && (
        <EditKitRenewalModal
          showModal={showModal}
          setShowModal={setShowModal}
          recordType={recordType}
          formData={formData}
          handleInputChange={handleInputChange}
          handleCreateRecord={editMode ? handleEditRecord : handleCreateRecord}
          editMode={editMode}
        />
      )}
    </div>
  );
};

export default RenewalPage;
