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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
      setCurrentPage(1);
    } catch (err) {
      setError("No records found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecord = async (type) => {
    try {
      const axiosInstance = createAxiosInstance();
      const payload = {
        kit_number: "kitblabla",
        status: "accepted",
        date_of_renewal: type === "receipt" ? new Date().toISOString() : "",
        deadline: type === "invoice" ? new Date().toISOString() : "",
        kit_renewal: {
          amount: 1000,
          month: 4,
          year: 2025,
          credit_admin: "",
          start_date: "",
          end_date: "",
        },
      };

    const res =  await axiosInstance.post(`/api/v1/admin/user_kit_renewals`, payload);
    console.log(res)
      alert(`${type} created successfully!`);
    } catch (err) {
      setError(`Failed to create ${type}. Please try again.`);
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
            <button
              className="funding-search-button"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          <div className="renew-flex">
            <button
              className="create-funds-button"
              onClick={() => handleCreateRecord("invoice")}
            >
              Create Invoice
            </button>
            <button
              className="create-funds-button"
              onClick={() => handleCreateRecord("receipt")}
            >
              Create Receipt
            </button>
          </div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RenewalPage;
