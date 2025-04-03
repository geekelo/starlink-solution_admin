import { useState, useEffect, useMemo, useRef } from "react";
import { createAxiosInstance } from "../config/axios";
import {
  Package,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Edit2,
  MoreVertical,
  RefreshCw,
  MapPin,
  CreditCard,
  Building,
  Tag,
  Phone,
  User,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Repeat2,
  FolderOpenDot,
  MailIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Kits.css";
import KitModal from "../components/kits/kitModal";
import Modal from "../components/kits/transferModal";
import { FilterSelect } from "../components/FilterSelect/Filter";
import { formatDate } from "../components/utils/date";
import PageHeader from "../components/PageHeader/PageHeader";
import MetricBox from "../components/MetricsBox/MetricsBox";
import Pagination from "../components/Pagination/Pagination";
import { AppLoader } from "../components/Loader/loader";
import { InfoCard } from "../components/InfoCard/Card";

const KitPage = () => {
  const [searchType, setSearchType] = useState("kitNo");
  const [searchQuery, setSearchQuery] = useState("");
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferEmail, setTransferEmail] = useState("");

  const [formData, setFormData] = useState({
    kit_number: selectedKit?.kit_number || "",
    address: selectedKit?.address || "",
    company_name: selectedKit?.company_name || "",
    company_number: selectedKit?.company_number || "",
    nin: selectedKit?.nin || "",
    status: selectedKit?.status || "active",
    service_line_number: selectedKit?.service_line_number || "",
  });
  const kitsPerPage = 12;

  const navigate = useNavigate();
  useEffect(() => {
    const fetchKits = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get("/api/v1/admin/kit_records");

        const formattedKits = response.data
          .map((kit) => ({
            kitId: kit.id,
            kitNo: kit.kit_number,
            username: kit.owner_name,
            email: kit.owner_email,
            phoneNumber: kit.owner_phone_number,
            address: kit.address,
            companyName: kit.company_name || "N/A",
            nin: kit.nin,
            status: kit.status,
            plan: "N/A",
            serviceNo: kit.service_line_number || "N/A",
            dateAdded: kit.created_at.split("T")[0],
            createdAt: new Date(kit.created_at), // Convert to Date for sorting
          }))
          .sort((a, b) => b.createdAt - a.createdAt); // Sort from newest to oldest

        setKits(formattedKits);
      } catch (err) {
        console.error("Error fetching kits:", err);
        setError("Failed to load kits. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchKits();
  }, []);

  useEffect(() => {
    if (selectedKit) {
      setFormData({
        kit_number: selectedKit.kitNo || "",
        address: selectedKit.address || "",
        company_name: selectedKit.companyName || "",
        company_number: selectedKit.serviceNo || "",
        nin: selectedKit.nin || "",
        status: selectedKit.status.toLowerCase() || "active",
        service_line_number: selectedKit.serviceNo || "",
      });
    }
  }, [selectedKit]);

  const handleRenewKit = async (kitId) => {
    setTimeout(() => {
      console.log(`Kit with ID: ${kitId} successfully renewed!`);
      alert(`Kit with ID: ${kitId} successfully renewed!`);
    }, 1000);
  };

  const filteredKits = useMemo(() => {
    if (!Array.isArray(kits)) return [];
    if (!searchQuery) return kits;

    return kits.filter((kit) => {
      if (searchType === "dateAdded") return kit.dateAdded === searchQuery;
      if (searchType === "month") {
        const kitMonth = `${new Date(kit.dateAdded).getFullYear()}-${String(
          new Date(kit.dateAdded).getMonth() + 1
        ).padStart(2, "0")}`;
        return kitMonth === searchQuery;
      }
      if (searchType === "year") return kit.dateAdded.startsWith(searchQuery);
      if (searchType === "email") {
        return kit.email?.toLowerCase().includes(searchQuery.toLowerCase());
      }

      return kit[searchType]
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, searchType, kits]);

  const metrics = useMemo(
    () => ({
      total: filteredKits.length,
      active: filteredKits.filter((kit) => kit.status === "active").length,
      inactive: filteredKits.filter((kit) => kit.status === "inactive").length,
    }),
    [filteredKits]
  );

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (value) => {
 
    setFormData((prev) => ({ ...prev, status: value }));
  };
  const handleSave = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const res = await axiosInstance.patch(
        `/api/v1/admin/kit_records/${selectedKit.kitId}`,
        {
          starlink_kit: formData,
        }
      );
      setKits((prevKits) =>
        prevKits.map((kit) =>
          kit.kitId === selectedKit.kitId
            ? {
                ...kit,
                ...formData,
                status:
                  formData.status.charAt(0).toUpperCase() +
                  formData.status.slice(1),
              }
            : kit
        )
      );
      closeModal();
    } catch (err) {
      setError("Failed to update kit. Please try again.");
    }
  };

  const indexOfLastKit = currentPage * kitsPerPage;
  const indexOfFirstKit = indexOfLastKit - kitsPerPage;
  const currentKits = filteredKits.slice(indexOfFirstKit, indexOfLastKit);

  const goToRenewals = (kit) => {
    navigate(`/renewals?kit=${kit.kitNo}`);
  };
  const handleTransferKit = async () => {
    if (!transferEmail) {
      setError("New owner email is required.");
      return;
    }
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.post("/api/v1/admin/kit_transfers/transfer", {
        kit_number: selectedKit.kitNo,
        new_owner_email: transferEmail,
      });

      setKits((prevKits) =>
        prevKits.map((kit) =>
          kit.kitNo === selectedKit.kitNo
            ? { ...kit, email: transferEmail }
            : kit
        )
      );

      closeTransferModal();
    } catch (err) {
      setError("Failed to transfer kit. Please try again.");
    }
  };

  const openTransferModal = (kit) => {
    setSelectedKit(kit);
    setIsTransferModalOpen(true);
  };
  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
    setTransferEmail("");
  };

  const toggleDropdown = (kitId, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === kitId ? null : kitId);
  };

  // Close dropdown when clicking outside
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
  }, [dropdownRef]);
  const itemsPerPage = currentKits.length - 1;
  const indexOfLastItem = currentPage * itemsPerPage;

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
              <FilterSelect
                options={options}
                defaultValue="kitNo"
                onChange={setSearchType}
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
          value={`₦${metrics.total}`}
          loading={loading}
        />
        <MetricBox
          icon={<CheckCircle size={40} color="green" />}
          title="Active Kits"
          value={`₦${metrics.active}`}
          loading={loading}
        />
        <MetricBox
          icon={<XCircle size={40} color="#ff1500b8" />}
          title="Inactive Kits"
          value={`₦${metrics.inactive}`}
          loading={loading}
        />
      </div>
      <div className="kit-grid">
        {loading ? (
       <AppLoader/>
        ) : (
       
            <div className="kit-grid">
            {currentKits.map((kit) => (
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
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={currentKits.length}
        itemsPerPage={itemsPerPage}
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
