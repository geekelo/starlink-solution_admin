import { useState, useEffect, useMemo } from "react";
import {
  Package,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Edit2,
  RefreshCw,
  MapPin,
  CreditCard,
  Building,
  Tag,
  Phone,
  User,
  CalendarDays,
  Repeat2,
  FolderOpenDot,
  MailIcon,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Kits.css";
import KitModal from "../components/kits/kitModal";
import Modal from "../components/kits/transferModal";
import { formatDate } from "../components/utils/date";
import PageHeader from "../components/PageHeader/PageHeader";
import MetricBox from "../components/MetricsBox/MetricsBox";
import Pagination from "../components/Pagination/Pagination";
import { AppLoader } from "../components/Loader/loader";
import { InfoCard } from "../components/InfoCard/Card";
import { Select } from "../components/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { fetchKits, renewKit, transferKit, updateKit, deleteKit } from "../redux/slice/kitSlice";

const KitPage = () => {
  const [searchType, setSearchType] = useState("kitNo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferEmail, setTransferEmail] = useState("");
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const { kits, loading, meta, error: fetchError } = useSelector((state) => state.kits);
  
  const navigate = useNavigate();
  
  const kitsPerPage = 12;
  
  // Separate filters state for API calls
  const [filters, setFilters] = useState({
    status: "",
    kit_number: "",
    owner_name: "",
    owner_email: "",
    address: "",
    date_added: "",
    month_added: "",
    year_added: "",
  });
  
  
  // Sync selectedKit to formData
  const [formData, setFormData] = useState({
    kit_number: "",
    address: "",
    company_name: "",
    company_number: "",
    nin: "",
    status: "active",
    service_line_number: "",
  });
  
  useEffect(() => {
    if (selectedKit) {
      setFormData({
        kit_number: selectedKit.kitNo || "",
        address: selectedKit.address || "",
        company_name: selectedKit.companyName || "",
        company_number: selectedKit.serviceNo || "",
        nin: selectedKit.nin || "",
        status: selectedKit.status?.toLowerCase() || "active",
        service_line_number: selectedKit.serviceNo || "",
      });
    }
  }, [selectedKit]);
  
  // Initial fetch when component mounts
  useEffect(() => {
    dispatch(fetchKits({ page: 1, per_page: kitsPerPage, filters: {} }));
  }, [dispatch, kitsPerPage]);
  
  // Kit status metrics - now using server-side data
  const metrics = useMemo(() => {
    if (!Array.isArray(kits)) return { total: 0, active: 0, inactive: 0 };
    
    return {
      total: meta?.total_records || 0,
      active: kits.filter((kit) => kit.status === "active").length,
      inactive: kits.filter((kit) => kit.status === "inactive").length,
    };
  }, [kits, meta?.total_records]);
  
  // Use kits directly from Redux (server-side filtered and paginated)
  const currentKits = kits || [];
  
  // Debug logging
  console.log("[Kit.js] Debug info:", {
    kits,
    currentKits,
    loading,
    meta,
    kitsLength: currentKits?.length
  });
  
  // Kit Actions
  const openModal = (kit) => {
    setSelectedKit({ ...kit });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedKit(null);
  };
  
  const openTransferModal = (kit) => {
    setSelectedKit(kit);
    setIsTransferModalOpen(true);
  };
  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
    setTransferEmail("");
    setError("");
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };
  const handleSave = () => {
  const res =  dispatch(updateKit({ kitId: selectedKit.kitId, formData }));
  console.log(res)
    closeModal();
  };
  const handleRenewKit = (kitId) => {
   const res = dispatch(renewKit(kitId));
    console.log(res)
  };
  const handleTransferKit = () => {
    if (!transferEmail.trim()) {
      setError("New owner email is required.");
      return;
    }
   const res= dispatch(transferKit({ kitNo: selectedKit.kitNo, newEmail: transferEmail }));
    console.log(res)
    closeTransferModal();
  };

  const handleDeleteKit = async (kitId) => {
    const confirmed = window.confirm("Are you sure you want to delete this kit? This action cannot be undone.");
    if (confirmed) {
      const result = await dispatch(deleteKit(kitId));
      if (result.type === 'kits/deleteKit/fulfilled') {
        // Refresh the current page data
        dispatch(fetchKits({ page: currentPage, per_page: kitsPerPage, filters }));
      }
    }
  };
  const goToRenewals = (kit) => {
    navigate(`/renewals?kit=${kit.kitNo}`);
  };

  // Handle filter input changes - only keep one filter at a time
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // Clear all filters and set only the current one
    setFilters({
      status: "",
      kit_number: "",
      owner_name: "",
      owner_email: "",
      address: "",
      date_added: "",
      month_added: "",
      year_added: "",
      [name]: value, // Only set the current filter
    });
  };

  // Handle status filter change - only keep one filter at a time
  const handleStatusFilterChange = (value) => {
    // Clear all filters and set only the status filter
    setFilters({
      status: value,
      kit_number: "",
      owner_name: "",
      owner_email: "",
      address: "",
      date_added: "",
      month_added: "",
      year_added: "",
    });
  };

  // Apply filters - calls API with filters
  const handleApply = () => {
    setCurrentPage(1); // Reset to first page when applying filters
    dispatch(fetchKits({ page: 1, per_page: kitsPerPage, filters }));
  };

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchKits({ page, per_page: kitsPerPage, filters }));
  };
  
  
  // Handle search type change - clear all filters when changing type
  const handleSearchTypeChange = (value) => {
    setSearchType(value);
    // Clear all filters when changing search type
    setFilters({
      status: "",
      kit_number: "",
      owner_name: "",
      owner_email: "",
      address: "",
      date_added: "",
      month_added: "",
      year_added: "",
    });
  };

  // Search options - updated to match backend filter capabilities
  const options = [
    { value: "kitNo", label: "Kit Number" },
    { value: "username", label: "Owner Name" },
    { value: "email", label: "Owner Email" },
    { value: "address", label: "Address" },
    { value: "dateAdded", label: "Date Added" },
    { value: "month", label: "Month Added" },
    { value: "year", label: "Year Added" },
  ];
  
  

  return (
    <div className="kit-container">
           <PageHeader
          title="Kit Management"
          rightElement={
            <div className="search-filter">
              <Select
                options={options}
                defaultValue="kitNo"
                onChange={handleSearchTypeChange}
                placeholder="Select filter type"
                icon={<Filter size={16} />}
              />

              <div className="search-box">
                <Search size={24} color="#b6bbc1" />
                {searchType === "dateAdded" ? (
                  <input
                    type="date"
                    name="date_added"
                    value={filters.date_added || ""}
                    onChange={handleFilterChange}
                  />
                ) : searchType === "month" ? (
                  <input
                    type="number"
                    name="month_added"
                    min="1"
                    max="12"
                    placeholder="Enter Month (1-12)"
                    value={filters.month_added || ""}
                    onChange={handleFilterChange}
                  />
                ) : searchType === "year" ? (
                  <input
                    type="number"
                    name="year_added"
                    min="2000"
                    max={new Date().getFullYear()}
                    placeholder="Enter Year"
                    value={filters.year_added || ""}
                    onChange={handleFilterChange}
                  />
                ) : searchType === "kitNo" ? (
                  <input
                    type="text"
                    name="kit_number"
                    placeholder="Search by Kit Number"
                    value={filters.kit_number || ""}
                    onChange={handleFilterChange}
                  />
                ) : searchType === "username" ? (
                  <input
                    type="text"
                    name="owner_name"
                    placeholder="Search by Owner Name"
                    value={filters.owner_name || ""}
                    onChange={handleFilterChange}
                  />
                ) : searchType === "email" ? (
                  <input
                    type="email"
                    name="owner_email"
                    placeholder="Search by Owner Email"
                    value={filters.owner_email || ""}
                    onChange={handleFilterChange}
                  />
                ) : (
                  <input
                    type="text"
                    name="address"
                    placeholder="Search by Address"
                    value={filters.address || ""}
                    onChange={handleFilterChange}
                  />
                )}
              </div>
              
              <Select
                options={[
                  { value: "", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "pending", label: "Pending" },
                  { value: "paid", label: "Paid" },
                ]}
                defaultValue=""
                onChange={handleStatusFilterChange}
                placeholder="Filter by status"
                icon={<Filter size={16} />}
              />

              <button className="apply-btn" onClick={handleApply}>
                Apply
              </button>
            </div>
          }
        />
      <div className="kit-nav">
        {(error || fetchError) && (
          <div className="error-message" style={{ 
            background: '#fee', 
            border: '1px solid #fcc', 
            padding: '10px', 
            borderRadius: '4px',
            margin: '10px 0',
            color: '#c33'
          }}>
            <strong>Error loading kits:</strong> {error || fetchError}
          </div>
        )}
      </div>

      {/* Metrics Section */}
      <div className="kit-grid kit-box">
        <MetricBox
          icon={<Package size={40} color="#b6bbc1" />}
          title="Total Kits"
          value={`${metrics.total}`}
          loading={loading}
        />
        <MetricBox
          icon={<CheckCircle size={40} color="green" />}
          title="Active Kits"
          value={`${metrics.active}`}
          loading={loading}
        />
        <MetricBox
          icon={<XCircle size={40} color="#ff1500b8" />}
          title="Inactive Kits"
          value={`${metrics.inactive}`}
          loading={loading}
        />
      </div>
      <div className="kit-grid">
        {loading ? (
       <AppLoader/>
        ) : currentKits && currentKits.length > 0 ? (
          currentKits.map((kit) => (
              <InfoCard
                key={kit.kitId}
                title={`Kit No: ${kit.kitNo}`}
                items={[
                  {
                    icon: <MapPin size={16} />,
                    label: 'Address',
                    value: kit.address
                  },
                  {
                    icon: <CreditCard size={16} />,
                    label: 'NIN',
                    value: kit.nin
                  },
                  {
                    icon: <Building size={16} />,
                    label: 'Company',
                    value: kit.companyName
                  },
                  {
                    icon: kit.status === "active" ? <CheckCircle size={16} /> : <XCircle size={16} />,
                    label: 'Status',
                    value: kit.status,
                    className: `status-badge ${kit.status}`
                  },
                  {
                    icon: <Tag size={16} />,
                    label: 'Plan',
                    value: kit.plan
                  },
                  {
                    icon: <Phone size={16} />,
                    label: 'Service No',
                    value: kit.serviceNo
                  },
                  {
                    icon: <User size={16} />,
                    label: 'Owner\'s Name',
                    value: kit.username
                  },
                  {
                    icon: <MailIcon size={16} />,
                    label: 'Owner\'s Email',
                    value: kit.email
                  },
                  {
                    icon: <CalendarDays size={16} />,
                    label: 'Date',
                    value: formatDate(kit.dateAdded)
                  }
                ]}
                menuItems={[
                  {
                    icon: <Edit2 size={16} />,
                    label: 'Edit',
                    onClick: () => openModal(kit)
                  },
                  {
                    icon: <RefreshCw size={16} />,
                    label: 'Renewals',
                    onClick: () => goToRenewals(kit)
                  },
                  {
                    icon: <FolderOpenDot size={16} />,
                    label: 'Transfer',
                    onClick: () => openTransferModal(kit)
                  },
                  {
                    icon: <Repeat2 size={16} />,
                    label: 'Renew',
                    onClick: () => handleRenewKit(kit.kitId)
                  },
                  {
                    icon: <Trash2 size={16} />,
                    label: 'Delete',
                    onClick: () => handleDeleteKit(kit.kitId),
                    className: 'delete-menu-item'
                  }
                ]}
                className={kit.status.toLowerCase()}
              />
            ))
        ) : (
          <div className="empty-state">
            <Package size={48} color="#b6bbc1" />
            <p>No kits found</p>
            <small>Try adjusting your filters or add some kits</small>
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalItems={meta?.total_records || 0}
        itemsPerPage={kitsPerPage}
        showPageNumbers={true}
      />

      <KitModal
        isOpen={isModalOpen}
        formData={formData}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleSave={handleSave}
        closeModal={closeModal}
        error={error}
      />
      <Modal
        title="Transfer Kit"
        isOpen={isTransferModalOpen}
        onClose={closeTransferModal}
      >
        {error && <p className="error-message">{error}</p>}

        <label className="user-modal-label">New Owner's Email:</label>
        <input
          type="email"
          className="user-modal-input"
          value={transferEmail}
          onChange={(e) => setTransferEmail(e.target.value)}
          placeholder="Enter new owner's email"
        />
        <div className="user-modal-actions">
          <button
            className="user-modal-button save"
            onClick={handleTransferKit}
          >
            Transfer
          </button>
          <button
            className="user-modal-button cancel"
            onClick={closeTransferModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default KitPage;
