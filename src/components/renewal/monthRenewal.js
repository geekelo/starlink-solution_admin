import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../../config/axios";
import "../../styles/Wallet.css";
import Renewal from "./Renewal";
import { ViewRenewalModal } from "./ViewRenewal";
import EditRenewalModal from "./EditKitRenewal";

const MonthlyRenewalPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [renewalData, setRenewalData] = useState([]);
  const [searchResult, setSearchResult] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [kitNumber, setKitNumber] = useState("");

  // Default selected month and year
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentYear = currentDate.getFullYear().toString();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(renewalData.length / recordsPerPage) || 1;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = renewalData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Open Edit Modal
  const handleOpenEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  // Handle saving an edit
  const handleSaveEdit = (updatedTransaction) => {
    console.log("Updated transaction:", updatedTransaction);
    setEditModalOpen(false);
  };

  // Open View Modal
  const handleOpenModal = (transaction) => {
    console.log("Opening View Modal for transaction:", transaction);
    if (!transaction) {
      console.error("handleOpenModal called with an undefined transaction");
      return;
    }
    setSelectedTransaction(transaction);
    setViewModalOpen(true);
  };
  

  useEffect(() => {
    handleSearch();
  }, [selectedMonth, selectedYear, kitNumber]);

  const handleSearch = async () => {
    setLoading(true);
    setSearchResult(true);
    setError("");
    setRenewalData([]);
    setCurrentPage(1);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get("/api/v1/admin/wallet_histories");
      const { renewals } = response.data;

      if (renewals && renewals.length > 0) {
        const filteredRenewals = renewals.filter((item) => {
          if (!item.date_of_renewal) return false;
          const itemDate = new Date(item.date_of_renewal);
          const itemMonth = (itemDate.getMonth() + 1).toString().padStart(2, "0");
          const itemYear = itemDate.getFullYear().toString();

          return selectedMonth === "All"
            ? itemYear === selectedYear
            : itemMonth === selectedMonth && itemYear === selectedYear;
        });

        const finalFilteredRenewals = kitNumber
          ? filteredRenewals.filter((item) => item.kit_number.includes(kitNumber))
          : filteredRenewals;

        const sortedRenewals = finalFilteredRenewals.sort(
          (a, b) => new Date(b.date_of_renewal) - new Date(a.date_of_renewal)
        );
        if (sortedRenewals.length > 0) {
          setRenewalData(sortedRenewals);
        } else {
          setError(`No renewals found for ${selectedMonth}/${selectedYear}.`);
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
console.log(selectedTransaction)
  return (
    <div className="kit-container-renewal">
      {/* Top Summary Card */}
      <div className="kit-summary-card">
        <h3 className="kit-create-button">
          Total Renewals for{" "}
          {selectedMonth === "All"
            ? selectedYear
            : new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1).toLocaleString(
                "default",
                { month: "long" }
              ) + ` ${selectedYear}`}{" "}
          {renewalData.length}
        </h3>
      </div>

      {/* Actions Bar */}
      <div className="kit-actions-bar">
        {/* Month Selector */}
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="All">All</option>
          {Array.from({ length: 12 }, (_, index) => {
            const monthValue = (index + 1).toString().padStart(2, "0");
            return (
              <option key={index} value={monthValue}>
                {new Date(2025, index).toLocaleString("default", { month: "long" })}
              </option>
            );
          })}
        </select>

        {/* Year Selector */}
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          {Array.from({ length: 5 }, (_, index) => {
            const yearValue = (currentDate.getFullYear() - 2 + index).toString();
            return <option key={yearValue} value={yearValue}>{yearValue}</option>;
          })}
        </select>

        {/* Search by Kit Number */}
        <input type="text" placeholder="Search by Kit Number" value={kitNumber} onChange={(e) => setKitNumber(e.target.value)} />

        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

      
      </div>

      {/* Content */}
      <div className="kit-content-area">
        {loading && <p>Loading records...</p>}

        {searchResult && !loading && (
          <>
            {renewalData.length > 0 ? (
              <div className="kit-grid">
                {currentRecords.map((item) => (
                  <div key={item.id} className="kit-renewal-item">
                    <Renewal transaction={item} openModal={handleOpenModal} />
                    <button onClick={() => handleOpenEditModal(item)}>Edit</button>
                    <button onClick={() => navigate(`/manage-renewal?kit=${item.kit_number}`)}>See Kit</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No renewals found for {selectedMonth}/{selectedYear}.</p>
            )}
          </>
        )}

        {!searchResult && !loading && <p>Select a month and year or enter a kit number to search.</p>}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage >= totalPages}>Next</button>
      </div>

      {/* Modals */}
      {viewModalOpen && selectedTransaction && (
        <ViewRenewalModal isOpen={viewModalOpen} closeModal={() => setViewModalOpen(false)} transaction={selectedTransaction} />
      )}
      {editModalOpen && selectedTransaction && (
        <EditRenewalModal isOpen={editModalOpen} closeModal={() => setEditModalOpen(false)} transaction={selectedTransaction} onSave={handleSaveEdit} />
      )}
    </div>
  );
};

export default MonthlyRenewalPage;
