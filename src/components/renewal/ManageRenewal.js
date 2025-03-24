import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createAxiosInstance } from "../../config/axios";
import "../../styles/Wallet.css";
import KitRenewalModal from "./KitRenewalModal";
import Renewal from "./Renewal";

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
  const [formData, setFormData] = useState({
    kit_number: "",
    status: "",
    date_of_renewal: "",
    kit_renewal: {
      amount: "",
      month: "",
      year: "",
      credit_admin: "",
      start_date: "",
      end_date: "",
      deadline: "",
    },
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
      const response = await axiosInstance.get(
        `/api/v1/admin/kit_renewals?kit_number=${kitNumber}`
      );

      if (response.data) {
        console.log(response);
        const sortedData = response.data.sort(
          (a, b) => new Date(b.date_of_renewal) - new Date(a.date_of_renewal)
        );
        setRenewalData(sortedData);
      }

    } catch (err) {
      setError("No records found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecord = async () => {
    try {
      const axiosInstance = createAxiosInstance();
  
      await axiosInstance.post(`/api/v1/admin/kit_renewals`, formData);
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
  
    setFormData((prev) => {
      if (name.startsWith("kit_renewal.")) {
        const field = name.split(".")[1];
        return {
          ...prev,
          kit_renewal: { ...prev.kit_renewal, [field]: value },
        };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };  

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

      {renewalData ? (
        renewalData.map((item) => (
          <Renewal transaction={item} />
        ))
      ) : (
        <p className="error-message">No records found.</p>
      )}

      {showModal && (
        <KitRenewalModal
        showModal={showModal}
        setShowModal={setShowModal}
        recordType="Kit Renewal"
        formData={formData}
        handleInputChange={handleInputChange}
        handleCreateRecord={handleCreateRecord}
      />
      )}
    </div>
  );
};

export default RenewalPage;
