import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createAxiosInstance } from "../config/axios";
import "../styles/Wallet.css";
import KitRenewalModal from "../components/renewal/KitRenewalModal";
import Renewal from "../components/renewal/Renewal";
import EditKitRenewalModal from "../components/renewal/EditKitRenewal";
import { Search } from "lucide-react";
import { ViewRenewalModal } from "../components/renewal/ViewRenewal";

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
const [searchResult, setSearchResult] = useState(false)
const [viewModalOpen, setViewModalOpen] = useState(false);
const [editModalOpen, setEditModalOpen] = useState(false);
const [selectedTransaction, setSelectedTransaction] = useState(null);
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
    setSearchResult(true)
    setError("");
    setRenewalData([]);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `/api/v1/admin/kit_renewals?kit_number=${kitNumber}`
      );

      if (response.data.length > 0) {
        const sortedData = response.data.sort(
          (a, b) => new Date(b.date_of_renewal) - new Date(a.date_of_renewal)
        );
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

    await axiosInstance[method](url, {
        ...formData,
        kit_number: formData.kit_number,
      });
      handleSearch();

      setShowModal(false);
    } catch (error) {
      setError("Failed to save the record. Please try again.");
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (!kitNumber) {
      setSearchResult(false);
    }
  }, [kitNumber]);

  const handleEditRecord = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.patch(
        `/api/v1/admin/kit_renewals/${selectedRecordId}`,
        formData
      );
      alert("Renewal updated successfully!");
      setShowModal(false);
      setEditMode(false);
      handleSearch(); // Refresh data
    } catch (err) {
      setError("Failed to update renewal. Please try again.");
    }
  };
  const openModal = (type, transaction = null) => {
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
        return {
          ...prev,
          kit_renewal: { ...prev.kit_renewal, [field]: value },
        };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };
  const handleOpenModal = (type, transaction) => {
    setSelectedTransaction(transaction);
    
    if (type === "view") {
      setViewModalOpen(true);
    } else if (type === "edit") {
      setEditModalOpen(true);
    }
  };

  return (
    
<div className="kit-container-renewal">
  {/* Actions bar - search and create button in one line */}
  <div className="kit-actions-bar">
    <div className="kit-search-wrapper">
      <div className="kit-search-input-container ">
        <Search size={24} color="#b6bbc1" className="kit-search-icon"/>
        <input
          type="text"
          className="kit-search-input"
          placeholder="Enter kit number"
          value={kitNumber || ""}
          onChange={(e) => setkitNumber(e.target.value)}
        />
      </div>
      <button
        className="kit-search-button"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
    <div className="kit-action-wrapper">
      <button
        className="kit-create-button"
        onClick={() => openModal("invoice")}
      >
        Create Renewal
      </button>
    </div>
  </div>

  {/* Header stands alone */}
  <div className="kit-header-wrapper">
    <h2 className="kit-header-title">Manage Kit Renewals</h2>
  </div>

  {/* Content area */}
  <div className="kit-content-area">
    {error && <p className="kit-error-message">{error}</p>}

    {/* Loading indicator now appears below search results */}
    {loading && (
      <div className="kit-loading-container">
        <div className="kit-spinner-large"></div>

      </div>
    )}

    {/* Show results only after a search has been performed (searchResultflag) */}
    {searchResult && !loading && (
      <>
        {renewalData.length > 0 ? (
          <div className="kit-grid">
            {renewalData.map((item) => (
              <Renewal key={item.id} transaction={item}   openModal={handleOpenModal}  />
            ))}
          </div>
        ) : (
          <div className="kit-empty-state">
            <div className="kit-empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <h3 className="kit-empty-title">No Records Found</h3>
            <p className="kit-empty-message">We couldn't find any renewals for kit number: <span className="kit-highlight">{kitNumber}</span></p>
            <p className="kit-empty-suggestion">Try searching with a different kit number or create a new renewal.</p>
          </div>
        )}
      </>
    )}

    {/* Initial state shown when no search has been performed */}
    {!searchResult && !loading && (
      <div className="kit-initial-state">
        <div className="kit-initial-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
        <h3 className="kit-initial-title">Ready to Search</h3>
        <p className="kit-initial-message">Enter a kit number above and click Search to view renewal records.</p>
      </div>
    )}
  </div>
  {viewModalOpen && selectedTransaction && (
        <ViewRenewalModal
          isOpen={viewModalOpen}
          closeModal={() => setViewModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
  {editModalOpen && selectedTransaction && (
    <EditKitRenewalModal
    isOpen={editModalOpen}
    closeModal={() => setEditModalOpen(false)}
    transaction={selectedTransaction}
    onSave={handleEditRecord}
      // recordType={recordType}
      // formData={formData}
      // handleInputChange={handleInputChange}
      // handleCreateRecord={editMode ? handleEditRecord : handleCreateRecord}
      // editMode={editMode}
    />
  )}
</div>
    // <div className="wallet-container">
    //   <div className="wallet-nav">
    //     <h2 className="wallet-header">Manage Kit Renewals</h2>
    //     <div className="funding-search-container">
    //       <div className="funding-search-bar">
    //         <input
    //           type="text"
    //           className="funding-search-input"
    //           placeholder="Enter kit number"
    //           value={kitNumber || ""}
    //           onChange={(e) => setkitNumber(e.target.value)}
    //         />
    //         <button
    //           className="funding-search-button"
    //           onClick={handleSearch}
    //           disabled={loading}
    //         >
    //           {loading ? "Searching..." : "Search"}
    //         </button>
    //       </div>
    //       <div className="renew-flex">
    //         <button
    //           className="create-funds-button"
    //           onClick={() => openModal("invoice")}
    //         >
    //           Create Renewal
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {error && <p className="error-message">{error}</p>}

    //   {renewalData.length > 0 ? (
    //     renewalData.map((item) => (
    //       <Renewal key={item.id} transaction={item} openModal={openModal} />
    //     ))
    //   ) : (
    //     <p className="error-message">No records found.</p>
    //   )}

    //   {showModal && (
    //     <EditKitRenewalModal
    //       showModal={showModal}
    //       setShowModal={setShowModal}
    //       recordType={recordType}
    //       formData={formData}
    //       handleInputChange={handleInputChange}
    //       handleCreateRecord={editMode ? handleEditRecord : handleCreateRecord}
    //       editMode={editMode}
    //     />
    //   )}
    // </div>
  );
};

export default RenewalPage;
