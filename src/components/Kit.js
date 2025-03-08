import { useState, useEffect } from "react";
import { kits } from "../assets/Kit";
import { Package, CheckCircle, XCircle, Search, Filter, Edit2 } from "lucide-react";
import "../styles/Kits.css";

const KitPage = () => {
  const [searchType, setSearchType] = useState("kitId");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredKits, setFilteredKits] = useState(kits);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredKits(kits);
      return;
    }

    const filtered = kits.filter((kit) => {
      let fieldValue = kit.dateAdded;

      if (searchType === "dateAdded") {
        return fieldValue === searchQuery;
      }

      if (searchType === "month") {
        const kitDate = new Date(kit.dateAdded);
        const formattedMonth = `${kitDate.getFullYear()}-${String(kitDate.getMonth() + 1).padStart(2, "0")}`;
        return searchQuery === formattedMonth;
      }

      if (searchType === "year") {
        return kit.dateAdded.startsWith(searchQuery);
      }

      fieldValue = kit[searchType];
      if (typeof fieldValue !== "string") {
        fieldValue = fieldValue.toString();
      }

      return fieldValue.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredKits(filtered);
  }, [searchQuery, searchType]);

  const totalKits = filteredKits.length;
  const activeKits = filteredKits.filter(kit => kit.status === "Active").length;
  const inactiveKits = filteredKits.filter(kit => kit.status === "Inactive").length;

  useEffect(() => {
    setSearchQuery("");
  }, [searchType]);

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

  const handleSave = () => {
    setFilteredKits((prevKits) => prevKits.map(kit => kit.kitId === selectedKit.kitId ? selectedKit : kit));
    closeModal();
  };

  return (
    <div className="kit-container">
      <div className="kit-nav">
        <h2 className="kit-header">Kit Management</h2>

        <div className="search-filter">
          <div className="filter-box">
            <Filter size={24} color="#b6bbc1" />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="custom-select"
            >
              <option value="kitId">Kit ID</option>
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
{/* Metrics Section - Updates Based on Filters */}
<div className="kit-metrics">
        <div className="kitmetric-box">
          <div className="metric-icon">
            <Package size={40} color="#b6bbc1" />
            <h4>Total Kits</h4>
          </div>
          <p>{totalKits}</p>
        </div>

        <div className="kitmetric-box">
          <div className="metric-icon">
            <CheckCircle size={40} color="green" />
            <h4>Active Kits</h4>
          </div>
          <p>{activeKits}</p>
        </div>

        <div className="kitmetric-box">
          <div className="metric-icon">
            <XCircle size={40} color="#ff1500b8" />
            <h4>Inactive Kits</h4>
          </div>
          <p>{inactiveKits}</p>
        </div>
      </div>


      <div className="kit-grid">
        {filteredKits.map((kit) => (
          <div key={kit.kitId} className={`kit-card ${kit.status.toLowerCase()}`}>
            <h3>Kit No: {kit.kitNo}</h3>
            <p><strong>Kit ID:</strong> {kit.kitId}</p>
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

      {isModalOpen && selectedKit && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Kit: {selectedKit.kitNo}</h3>
            <button className="close-btn" onClick={closeModal}>X</button>
            <form>
              <label>Kit No:</label>
              <input type="text" name="kitNo" value={selectedKit.kitNo} onChange={handleChange} />
              <label>Company Name:</label>
              <input type="text" name="companyName" value={selectedKit.companyName} onChange={handleChange} />
              <label>Address:</label>
              <input type="text" name="address" value={selectedKit.address} onChange={handleChange} />
              <label>NIN:</label>
              <input type="text" name="nin" value={selectedKit.nin} onChange={handleChange} />
              <label>Plan:</label>
              <input type="text" name="plan" value={selectedKit.plan} onChange={handleChange} />
              <label>Service No:</label>
              <input type="text" name="serviceNo" value={selectedKit.serviceNo} onChange={handleChange} />
              <label>Date Added:</label>
              <input type="date" name="dateAdded" value={selectedKit.dateAdded} onChange={handleChange} />
              <label>Status:</label>
              <select name="status" value={selectedKit.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button type="button" onClick={handleSave}>Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitPage;
