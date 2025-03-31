import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createAxiosInstance } from "../../config/axios";
import "../../styles/Wallet.css";
import KitRenewalModal from "./KitRenewalModal";
import Renewal from "./Renewal";
import { Search } from "lucide-react";

const RenewalPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialKitNumber = queryParams.get("kit") || ""; 

  const [kitNumber, setKitNumber] = useState(initialKitNumber);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [renewalData, setRenewalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchResult, setSearchResult] = useState(false);

  // Form data for the modal
  const [formData, setFormData] = useState({
    kit_number: "",
    status: "",
    kit_renewal: {
      amount: "",
      month: "",
      year: "",
      credit_admin: "",
      start_date: "",
      end_date: "",
      deadline: "",
    },
    date_of_renewal: "",
  });

  useEffect(() => {
    if (initialKitNumber) {
      handleSearch(initialKitNumber);
    }
  }, [initialKitNumber]);

  const handleSearch = async (kitNo = kitNumber) => {
    if (!kitNo) return;
    setLoading(true);
    setSearchResult(true);
    setError("");
    setRenewalData([]);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(`/api/v1/admin/kit_renewals?kit_number=${kitNo}`);

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

  // Handle input changes for the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("kit_renewal.")) {
      const field = name.split(".")[1]; // Extract nested field name
      setFormData((prevData) => ({
        ...prevData,
        kit_renewal: {
          ...prevData.kit_renewal,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle create record (API call)
  const handleCreateRecord = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.post("/api/v1/admin/kit_renewals", formData);
      setShowModal(false);
      handleSearch(kitNumber); // Refresh list after creation
    } catch (error) {
      console.error("Error creating renewal:", error);
    }
  };

  return (
    <div className="kit-container-renewal">
      <button className="kit-create-button" onClick={() => setShowModal(true)}>
        Create Renewal
      </button>

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
          <button className="kit-search-button" onClick={() => handleSearch()} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      <div className="kit-header-wrapper">
        <h2 className="kit-header-title">Manage Kit Renewals</h2>
      </div>

      <div className="kit-content-area">
        {loading && (
          <div className="kit-loading-container">
            <div className="kit-spinner-large"></div>
            <p>Loading records...</p>
          </div>
        )}

        {searchResult && !loading && (
          <>
            {renewalData.length > 0 ? (
              <div className="kit-grid">
                {renewalData.map((item) => (
                  <Renewal key={item.id} transaction={item} />
                ))}
              </div>
            ) : (
              <div className="kit-empty-state">
                <h3>No Records Found</h3>
                <p>Try searching with a different kit number.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Renewal Modal */}
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
