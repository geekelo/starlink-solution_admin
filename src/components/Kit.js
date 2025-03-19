import { useState, useEffect, useMemo } from "react";
import { createAxiosInstance } from "../config/axios";
import { Package, CheckCircle, XCircle, Search, Filter, Edit2 } from "lucide-react";
import "../styles/Kits.css";

const KitPage = () => {
  const [searchType, setSearchType] = useState("kitNo");
  const [searchQuery, setSearchQuery] = useState("");
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState(null);

  useEffect(() => {
    const fetchKits = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get("/api/v1/admin/kit_records");
        
        const formattedKits = response.data.map((kit) => ({
          kitId: kit.id,
          kitNo: kit.kit_number,
          username: kit.owner_name,
          email: kit.owner_email,
          phoneNumber: kit.owner_phone_number,
          address: kit.address,
          companyName: kit.company_name || "N/A",
          nin: kit.nin,
          status: kit.is_active ? "Active" : "Inactive",
          plan: "N/A",
          serviceNo: kit.company_number || "N/A",
          dateAdded: kit.created_at.split("T")[0],
        }));

        setKits(formattedKits);
      } catch (err) {
        setError("Failed to load kits. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchKits();
  }, []);

  const filteredKits = useMemo(() => {
    if (!searchQuery) return kits;

    return kits.filter((kit) => {
      if (searchType === "dateAdded") return kit.dateAdded === searchQuery;
      if (searchType === "month") {
        const kitMonth = `${new Date(kit.dateAdded).getFullYear()}-${String(new Date(kit.dateAdded).getMonth() + 1).padStart(2, "0")}`;
        return kitMonth === searchQuery;
      }
      if (searchType === "year") return kit.dateAdded.startsWith(searchQuery);

      return kit[searchType]?.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, searchType, kits]);

  const metrics = useMemo(() => ({
    total: filteredKits.length,
    active: filteredKits.filter((kit) => kit.status === "Active").length,
    inactive: filteredKits.filter((kit) => kit.status === "Inactive").length,
  }), [filteredKits]);

  const openModal = (kit) => {
    setSelectedKit({ ...kit });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedKit(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedKit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.put(`/api/v1/admin/kit_records/${selectedKit.kitId}`, selectedKit);
      setKits((prevKits) => prevKits.map((kit) => (kit.kitId === selectedKit.kitId ? selectedKit : kit)));
      closeModal();
    } catch (err) {
      setError("Failed to update kit. Please try again.");
    }
  };

  return (
    <div className="kit-container">
      <div className="kit-nav">
        <h2 className="kit-header">Kit Management</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="search-filter">
          <div className="filter-box">
            <Filter size={24} color="#b6bbc1" />
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="custom-select">
              <option value="kitNo">Kit No</option>
              <option value="dateAdded">Date Added</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="username">User</option>
            </select>
          </div>

          <div className="search-box">
            <Search size={24} color="#b6bbc1" />
            {searchType === "dateAdded" ? (
              <input type="date" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            ) : searchType === "month" ? (
              <input type="month" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            ) : searchType === "year" ? (
              <input type="number" min="2000" max={new Date().getFullYear()} placeholder="Enter Year" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            ) : (
              <input type="text" placeholder={`Search by ${searchType}`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            )}
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="kit-metrics">
        <div className="kitmetric-box">
          <div className="metric-icon">
            <Package size={40} color="#b6bbc1" />
            <h4>Total Kits</h4>
          </div>
          <p>{metrics.total}</p>
        </div>

        <div className="kitmetric-box">
          <div className="metric-icon">
            <CheckCircle size={40} color="green" />
            <h4>Active Kits</h4>
          </div>
          <p>{metrics.active}</p>
        </div>

        <div className="kitmetric-box">
          <div className="metric-icon">
            <XCircle size={40} color="#ff1500b8" />
            <h4>Inactive Kits</h4>
          </div>
          <p>{metrics.inactive}</p>
        </div>
      </div>

      <div className="kit-grid">
        {loading ? <p>Loading kits...</p> : filteredKits.map((kit) => (
          <div key={kit.kitId} className={`kit-card ${kit.status.toLowerCase()}`}>
            <h3>Kit No: {kit.kitNo}</h3>
            <p><strong>Address:</strong> {kit.address}</p>
            <p><strong>NIN:</strong> {kit.nin}</p>
            <p><strong>Company:</strong> {kit.companyName}</p>
            <p><strong>Status:</strong> {kit.status}</p>
            <p><strong>Plan:</strong> {kit.plan}</p>
            <p><strong>Service No:</strong> {kit.serviceNo}</p>
            <p><strong>Username:</strong> {kit.username}</p>
            <p><strong>Date:</strong> {kit.dateAdded}</p>
            <button className="edit-btn" onClick={() => openModal(kit)}>
              <Edit2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitPage;
