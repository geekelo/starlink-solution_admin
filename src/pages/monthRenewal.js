import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../config/axios";
import "../styles/Wallet.css";
import Renewal from "../components/renewal/Renewal";
import { ViewRenewalModal } from "../components/renewal/ViewRenewal";

const MonthlyRenewalPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [renewalData, setRenewalData] = useState([]);
  const [searchResult, setSearchResult] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [kitNumber, setKitNumber] = useState("");
  // Dropdown for selecting month (default: current month)
  const currentMonth = new Date().toISOString().split("-")[1]; // e.g., "03" for March
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useEffect(() => {
    handleSearch();
  }, [selectedMonth]);

  const handleSearch = async () => {
    setLoading(true);
    setSearchResult(true);
    setError("");
    setRenewalData([]);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        "/api/v1/admin/wallet_histories"
      );
      const { renewals } = response.data;

      if (renewals && renewals.length > 0) {
        // Filter renewals by selectedMonth using date_of_renewal
        const filteredRenewals = renewals.filter((item) => {
          if (!item.date_of_renewal) return false;
          const itemMonth = new Date(item.date_of_renewal).getMonth() + 1;
          const formattedMonth = itemMonth.toString().padStart(2, "0");
          return formattedMonth === selectedMonth;
        });

        // Apply kit number search if input is provided
        const finalFilteredRenewals = kitNumber
          ? filteredRenewals.filter((item) =>
              item.kit_number.includes(kitNumber)
            )
          : filteredRenewals;

        console.log("Filtered Renewals:", finalFilteredRenewals);

        if (finalFilteredRenewals.length > 0) {
          setRenewalData(finalFilteredRenewals);
        } else {
          setError(`No renewals found for ${selectedMonth}.`);
        }
      } else {
        setError("No renewal records found.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching renewal records.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setViewModalOpen(true);
  };

  return (
    <div className="kit-container-renewal">
      {/* Top Card - Total Renewals */}
      <div className="kit-summary-card">
        <h3>
          Total Renewals for{" "}
          {new Date(2025, parseInt(selectedMonth) - 1).toLocaleString(
            "default",
            { month: "long" }
          )}{" "}
          is {renewalData.length}
        </h3>
      </div>

      {/* Actions bar */}
      <div className="kit-actions-bar">
        {/* Month Selector */}
        <select
          className="kit-month-dropdown"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {[
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ].map((month, index) => (
            <option key={index} value={month}>
              {new Date(2025, index).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>

        {/* Search by Kit Number */}
        <input
          type="text"
          placeholder="Search by Kit Number"
          value={kitNumber}
          onChange={(e) => setKitNumber(e.target.value)}
          className="kit-search-input"
        />

        <button
          className="kit-search-button"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        {/* Create Renewal Button */}
        <button
          className="kit-create-button"
          onClick={() => navigate("/create-renewal")}
        >
          Create Renewal
        </button>

        {/* View All Renewals */}
        <button
          className="kit-view-all-button"
          onClick={() => navigate(`/manage-renewal`)}
        >
          View All Renewals
        </button>
      </div>

      {/* Content */}
      <div className="kit-content-area">
        {loading && (
          <div className="kit-loading-container">
            <div className="kit-spinner-large"></div>
            <p>Loading records...</p>
          </div>
        )}

        {/* Show results only after a search has been performed */}
        {searchResult && !loading && (
          <>
            {renewalData.length > 0 ? (
              <div className="kit-grid">
                {renewalData.map((item) => (
                  <div key={item.id} className="kit-renewal-item">
                    <Renewal transaction={item} openModal={handleOpenModal} />
                    <button
                      className="kit-edit-button"
                      onClick={() => handleOpenModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="kit-view-kit-button"
                      onClick={() =>
                        navigate(`/manage-renewal?kit=${item.kit_number}`)
                      }
                    >
                      See Kit
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="kit-empty-state">
                <div className="kit-empty-icon">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className="kit-empty-title">No Receipts Found</h3>
                <p className="kit-empty-message">
                  No renewals found in{" "}
                  <span className="kit-highlight">{selectedMonth}</span>.
                </p>
              </div>
            )}
          </>
        )}

        {/* Initial state before searching */}
        {!searchResult && !loading && (
          <div className="kit-initial-state">
            <div className="kit-initial-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="kit-initial-title">Ready to Search</h3>
            <p className="kit-initial-message">
              Select a month or enter a kit number to search.
            </p>
          </div>
        )}
      </div>

      {/* View/Edit Modal */}
      {viewModalOpen && selectedTransaction && (
        <ViewRenewalModal
          isOpen={viewModalOpen}
          closeModal={() => setViewModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default MonthlyRenewalPage;
