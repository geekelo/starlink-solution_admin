import { useState, useEffect, useMemo, useRef } from "react";
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
import { fetchKits, renewKit, transferKit, updateKit } from "../redux/slice/kitSlice";

const KitPage = () => {
  const [searchType, setSearchType] = useState("kitNo");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferEmail, setTransferEmail] = useState("");
  const [error, setError] = useState("");
  const kitsPerPage = 10; // Changed from 12 to 10 to match API default

  const { kits, loading, meta } = useSelector((state) => state.kits);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Separate filters state for API calls
  const [filters, setFilters] = useState({
    status: "",
    kit_number: "",
    owner_name: "",
    owner_email: "",
    date_added: "",
    month: "",
    year: "",
  });

  // Form data for editing kits
  const [formData, setFormData] = useState({
    kit_number: "",
    address: "",
    company_name: "",
    company_number: "",
    nin: "",
    status: "active",
    service_line_number: "",
  });

  // Initial fetch when component mounts
  useEffect(() => {
    dispatch(fetchKits({ page: 1, per_page: kitsPerPage }));
  }, [dispatch]);

  // Sync selectedKit to formData
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
  
  // Filter kits based on local search (this is for client-side filtering)
  const filteredKits = useMemo(() => {
    if (!Array.isArray(kits)) return [];

    const filtered = kits.filter((kit) => {
      const query = searchQuery.toLowerCase();
      if (!searchQuery) return true;

      if (searchType === "dateAdded") return kit.dateAdded === searchQuery;
      if (searchType === "month") {
        const kitMonth = `${new Date(kit.dateAdded).getFullYear()}-${String(
          new Date(kit.dateAdded).getMonth() + 1
        ).padStart(2, "0")}`;
        return kitMonth === searchQuery;
      }
      if (searchType === "year") return kit.dateAdded?.startsWith(searchQuery);
      if (searchType === "email") return kit.email?.toLowerCase().includes(query);

      return kit[searchType]?.toString().toLowerCase().includes(query);
    });

    // Sort by newest date
    return filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }, [searchQuery, searchType, kits]);

  // Kit status metrics
  const metrics = useMemo(() => ({
    total: filteredKits.length,
    active: filteredKits.filter((kit) => kit.status === "active").length,
    inactive: filteredKits.filter((kit) => kit.status === "inactive").length,
  }), [filteredKits]);
  
  // Use filtered kits for display
  const currentKits = filteredKits;
  
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
  
  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle status filter change
  const handleStatusFilterChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      status: value,
    }));
  };

  // Apply filters - calls API with filters
  const handleApply = () => {
    dispatch(fetchKits({ page: 1, per_page: kitsPerPage, filters }));
    setCurrentPage(1); // Reset to first page when applying filters
  };

  // Handle form data changes for editing
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle status select change in edit modal
  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };
  
  const handleSave = () => {
    const res = dispatch(updateKit({ kitId: selectedKit.kitId, formData }));
    console.log(res);
    closeModal();
  };
  
  const handleRenewKit = (kitId) => {
    const res = dispatch(renewKit(kitId));
    console.log(res);
  };
  
  const handleTransferKit = () => {
    if (!transferEmail.trim()) {
      setError("New owner email is required.");
      return;
    }
    const res = dispatch(transferKit({ kitNo: selectedKit.kitNo, newEmail: transferEmail }));
    console.log(res);
    closeTransferModal();
  };
  
  const goToRenewals = (kit) => {
    navigate(`/renewals?kit=${kit.kitNo}`);
  };
  
  // Dropdown toggle
  const toggleDropdown = (kitId, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === kitId ? null : kitId);
  };
  
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".menu-dots")
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchKits({ page, per_page: kitsPerPage, filters }));
  };
  
  // Search options
  const options = [
    { value: "kitNo", label: "Kit No" },
    { value: "dateAdded", label: "Date Added" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
    { value: "username", label: "User" },
    { value: "email", label: "Email" },
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
              onChange={(value) => setSearchType(value)}
              placeholder="Select filter type"
              icon={<Filter size={16} />}
            />
   
            <div className="search-box">
              <Search size={24} color="#b6bbc1" />
              {searchType === "dateAdded" ? (
                <input
                  type="date"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              ) : searchType === "month" ? (
                <input
                  type="month"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              ) : searchType === "year" ? (
                <input
                  type="number"
                  min="2000"
                  max={new Date().getFullYear()}
                  placeholder="Enter Year"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  placeholder={`Search by ${searchType}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
        {error && <p className="error-message">{error}</p>}
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
        ) : (
          <div className="kit-grid">
            {currentKits?.map((kit) => (
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
                    onClick: () => {
                      openModal(kit);
                      setActiveDropdown(null);
                    }
                  },
                  {
                    icon: <RefreshCw size={16} />,
                    label: 'Renewals',
                    onClick: () => {
                      goToRenewals(kit);
                      setActiveDropdown(null);
                    }
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
                  }
                ]}
                className={kit.status.toLowerCase()}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Pagination Controls */}
      <Pagination
        currentPage={meta?.current_page}
        onPageChange={handlePageChange} // Fixed: Now calls API with new page
        totalItems={meta?.total_records}
        itemsPerPage={kitsPerPage}
        showPageNumbers={true}
      />

      <KitModal
        isOpen={isModalOpen}
        formData={formData}
        handleChange={handleFormChange} // Fixed: Now uses separate handler
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