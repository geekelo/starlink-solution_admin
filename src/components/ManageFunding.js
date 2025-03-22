import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createAxiosInstance } from "../config/axios";
import "../styles/Wallet.css";
import { Edit, X, CheckCircle } from "lucide-react";

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

  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal state

  const [newFunding, setNewFunding] = useState({
    email: "",
    amount: "",
    type: "",
    payment_method: "",
    status: "pending",
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
    setFundingData([]);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `/api/v1/admin/user_fundings?email=${email}`
      );

      const sortedData = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setFundingData(sortedData);
      setCurrentPage(1);
    } catch (err) {
      setError("No records found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFunding = async () => {
    if (
      !newFunding.email ||
      !newFunding.amount ||
      !newFunding.type ||
      !newFunding.payment_method ||
      !newFunding.status
    ) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.post("/api/v1/admin/user_fundings", {
        email: newFunding.email,
        funding: {
          amount: Number(newFunding.amount),
          payment_method: newFunding.payment_method,
          status: newFunding.status,
        },
      });

      setShowModal(false);
      setShowSuccessModal(true); // Show success modal
      setNewFunding({
        email: "",
        amount: "",
        type: "",
        payment_method: "",
        status: "pending",
      });
      handleSearch();
    } catch (err) {
      setError("Failed to create funding.");
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
        <h2 className="wallet-header">Manage Funding Request</h2>
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
          <button
            className="create-funds-button"
            onClick={() => setShowModal(true)}
          >
            Create fundings
          </button>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="wallet-history">
        {currentFunding.length > 0 ? (
          currentFunding.map((funding, index) => (
            <div key={index} className="history-box funding">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(funding.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Amount:</strong> ₦
                {Number(funding.amount).toLocaleString()}
              </p>
              <p>
                <strong>Reference:</strong> {funding.reference}
              </p>
              <p>
                <strong>Payment Type:</strong> {funding.type}
              </p>
              <p>
                <strong>Status:</strong>
                <span className={`status ${funding.status}`}>
                  {funding.status}
                </span>
              </p>
              <button className="fundedit-button">
                <Edit size={20} color="#fff" />
              </button>
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

      {showModal && (
        <div className="modal-overlay">
          <div className="funding-modal">
            <div className="funding-modal-header">
              <h3>Create Funding Request</h3>
              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="funding-modal-body">
              <label>User Email</label>
              <input
                type="email"
                value={newFunding.email}
                onChange={(e) =>
                  setNewFunding({ ...newFunding, email: e.target.value })
                }
              />

              <label>Funding Amount</label>
              <input
                type="number"
                value={newFunding.amount}
                onChange={(e) =>
                  setNewFunding({ ...newFunding, amount: e.target.value })
                }
              />

              <label>Transaction Type</label>
              <select
                value={newFunding.type}
                onChange={(e) =>
                  setNewFunding({ ...newFunding, type: e.target.value })
                }
              >
                <option value="">Select Transaction Type</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>

              <label>Status</label>
              <select
                value={newFunding.status}
                onChange={(e) =>
                  setNewFunding({ ...newFunding, status: e.target.value })
                }
              >
                <option value="pending">Pending</option>
                <option value="awaiting-approval">Awaiting Approval</option>
                <option value="approved">Approved</option>
                <option value="unapproved">Unapproved</option>
                <option value="expired">Expired</option>
              </select>

              <label>Payment Method</label>
              <select
                value={newFunding.payment_method}
                onChange={(e) =>
                  setNewFunding({
                    ...newFunding,
                    payment_method: e.target.value,
                  })
                }
              >
                <option value="">Select Payment Method</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div className="funding-modal-footer">
              <button onClick={handleCreateFunding} disabled={loading}>
                {loading ? "Processing..." : "Submit Funding Request"}
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <CheckCircle size={50} color="green" />
            <h3>Funding Request Created Successfully!</h3>
            <button onClick={() => setShowSuccessModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingPage;
