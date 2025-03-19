import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createAxiosInstance } from "../config/axios";
import "../styles/Wallet.css"; // Reuse Wallet.css for consistent styling

const FundingPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get("email") || "";

  const [email, setEmail] = useState(userEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fundingData, setFundingData] = useState([]);
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
    setFundingData([]);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(`/api/v1/admin/user_fundings?email=${email}`);
      const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFundingData(sortedData);
      setCurrentPage(1);
    } catch (err) {
      setError("No records found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFunding = fundingData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="wallet-container">
      <div className="wallet-nav">
        <h2 className="wallet-header">Funding Request</h2>
        <div className="search-bar">
          <input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="wallet-history">
        {currentFunding.length > 0 ? (
          currentFunding.map((funding, index) => (
            <div key={index} className="history-box funding">
              <p><strong>Date:</strong> {new Date(funding.date).toLocaleDateString()}</p>
              <p><strong>Amount:</strong> ₦{Number(funding.amount).toLocaleString()}</p>
              <p><strong>Reference:</strong> {funding.reference}</p>
              <p><strong>Payment Type:</strong> {funding.type}</p>
              <p>
                <strong>Status:</strong>
                <span className={`status ${funding.status}`}>{funding.status}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="no-records">No funding records found.</p>
        )}
      </div>

      {fundingData.length > itemsPerPage && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt; Prev
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                indexOfLastItem < fundingData.length ? prev + 1 : prev
              )
            }
            disabled={indexOfLastItem >= fundingData.length}
          >
            Next &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default FundingPage;
