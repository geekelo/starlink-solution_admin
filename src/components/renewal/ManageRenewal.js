import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createAxiosInstance } from "../../config/axios";
import "../../styles/Wallet.css";
import KitRenewalModal from "./KitRenewalModal";
import Renewal from "./Renewal";
import EditKitRenewalModal from "./EditKitRenewal";
import { Search } from "lucide-react";
import { ViewRenewalModal } from "./ViewRenewal";

const RenewalPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialKitNumber = queryParams.get("kit") || ""; // Get 'kit' from URL

  const [kitNumber, setKitNumber] = useState(initialKitNumber);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [renewalData, setRenewalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    if (initialKitNumber) {
      handleSearch(initialKitNumber); // Automatically search on load
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

  return (
    <div className="kit-container-renewal">
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
    </div>
  );
};

export default RenewalPage;
