import { useState, useEffect } from "react";
import { createAxiosInstance } from "../config/axios";
import "../styles/Wallet.css";
import EditKitRenewalModal from "../components/renewal/EditKitRenewal";
import { AppLoader } from "../components/Loader/loader";
import PageHeader from "../components/PageHeader/PageHeader";
import { Search } from "lucide-react";
import { formatDate } from "../components/utils/date";

const InvoicesPage = () => {
  const [kitNumber, setKitNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [editModalData, setEditModalData] = useState(null);

  // Fetch invoices on page load
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    setError("");

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(`/api/v1/admin/kit_renewals`);

      // Filter only records with status "invoice"
      const invoiceData = response.data.filter(item => item.status.toLowerCase() === "invoice");

      if (invoiceData.length > 0) {
        setInvoices(invoiceData);
        setFilteredInvoices(invoiceData);
      } else {
        setError("No invoice records found.");
      }
    } catch (err) {
      setError("Error fetching invoices.");
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  const handleSearch = () => {
    if (!kitNumber.trim()) {
      setFilteredInvoices(invoices); // Reset to all invoices if search is empty
    } else {
      const searchResults = invoices.filter(item => item.kit_number.includes(kitNumber));
      setFilteredInvoices(searchResults);
    }
  };

  const handleEditClick = (item) => {
    setEditModalData(item);
  };

  const handleUpdateRecord = async (updatedData) => {
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.put(`/api/v1/admin/kit_renewals/${updatedData.id}`, updatedData);
      setEditModalData(null);
      fetchInvoices();
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  return (
    <div className="kit-container-renewal">
      <PageHeader title="Invoices" />
      <div className="kit-actions-bar">
        <div className="kit-search-wrapper">
          <div className="kit-search-input-container">
            <Search size={24} color="#b6bbc1" className="kit-search-icon" />
            <input
              type="text"
              className="kit-search-input"
              placeholder="Enter kit number"
              value={kitNumber}
              onChange={(e) => setKitNumber(e.target.value)}
            />
          </div>
          <button className="kit-search-button" onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      <div className="kit-header-wrapper">
        <h2 className="kit-header-title">Total Invoices: {filteredInvoices.length}</h2>
      </div>

      <div className="kit-content-area">
        {loading && <AppLoader />}
        {!loading && (
          <>
            {filteredInvoices.length > 0 ? (
              <div className="kit-grid">
                {filteredInvoices.map((item) => (
                  <div className="kit-card" key={item.id}>
                    <h4>Kit: {item.kit_number}</h4>
                    <p>Amount: ₦{item.amount}</p>
                    <p>Month: {item.month}</p>
                    <p>Year: {item.year}</p>
                    <p>Credit Admin: {item.credit_admin ? "Yes" : "No"}</p>
                    <p>Start Date: {formatDate(item.start_date)}</p>
                    <p>End Date: {formatDate(item.end_date)}</p>
                    <p>Deadline: {formatDate(item.deadline)}</p>
                    <p>Prorated: {item.prorated ? "Yes" : "No"}</p>
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="kit-empty-state">
                <h3>No Invoices Found</h3>
                <p>Try searching with a different kit number.</p>
              </div>
            )}
          </>
        )}
      </div>

      {editModalData && (
  <EditKitRenewalModal
    isOpen={!!editModalData} // Ensure it's a boolean
    closeModal={() => setEditModalData(null)} // Properly close modal
    transaction={editModalData} // Pass data to edit
    onSave={handleUpdateRecord} // Handle save
  />
)}


    </div>
  );
};

export default InvoicesPage;
