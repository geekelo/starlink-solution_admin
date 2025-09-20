import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/User.css";
import {
  Calendar,
  Edit2,
  Filter,
  Mail,
  Package,
  Phone,
  PhoneIncoming,
  Search,
  UserRoundX,
  UsersRound,
  Wallet,
  WalletCards,
  WalletMinimal,
} from "lucide-react";
import { fetchUsers, updateUser } from "../redux/slice/userSlice";
import { formatDate } from "../components/utils/date";
import PageHeader from "../components/PageHeader/PageHeader";
import EmptyState from "../components/EmptyState/EmptyState";
import Pagination from "../components/Pagination/Pagination";
import MetricBox from "../components/MetricsBox/MetricsBox";
import { AppLoader } from "../components/Loader/loader";
import { InfoCard } from "../components/InfoCard/Card";
import { Select } from "../components/Select/Select";
import UserEditModal from "../components/Users/UserEditModal";
import AddKitModal from "../components/kits/createKitModal";

const Users = () => {
  const [searchType, setSearchType] = useState("name");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isKitModalOpen, setIsKitModalOpen] = useState(false);
  const [kitUserId, setKitUserId] = useState(null);
  const [kitUserEmail, setKitUserEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { users, loading, meta, error: fetchError } = useSelector((state) => state.users);
  
  const navigate = useNavigate();
  const usersPerPage = 12;

  // Separate filters state for API calls
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone_number: "",
    whatsapp_number: "",
    wallet_id: "",
  });

  // Initial fetch when component mounts
  useEffect(() => {
    dispatch(fetchUsers({ page: 1, per_page: usersPerPage, filters: {} }));
  }, [dispatch, usersPerPage]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    const formData = {
      email: selectedUser.email,
      phone_number: selectedUser.phone,
      name: selectedUser.name,
      whatsapp_number: selectedUser.whatsapp,
      email_confirmed: selectedUser.emailConfirmed ?? false,
      whatsapp_number_confirmed: selectedUser.whatsappConfirmed ?? false,
    };

    const result = await dispatch(updateUser({ userId: selectedUser.id, formData }));
    if (result.type === 'users/updateUser/fulfilled') {
      setIsModalOpen(false);
      // Refresh the current page data
      dispatch(fetchUsers({ page: currentPage, per_page: usersPerPage, filters }));
    }
  };

  // Handle filter input changes - only keep one filter at a time
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // Clear all filters and set only the current one
    setFilters({
      name: "",
      email: "",
      phone_number: "",
      whatsapp_number: "",
      wallet_id: "",
      [name]: value, // Only set the current filter
    });
  };

  // Apply filters - calls API with filters
  const handleApply = () => {
    setCurrentPage(1); // Reset to first page when applying filters
    dispatch(fetchUsers({ page: 1, per_page: usersPerPage, filters }));
  };

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchUsers({ page, per_page: usersPerPage, filters }));
  };

  // User metrics
  const metrics = useMemo(() => {
    return {
      total: meta?.total_records || 0,
    };
  }, [meta?.total_records]);

  // Use users directly from Redux (server-side filtered and paginated)
  const currentUsers = users || [];

  // Debug logging
  console.log("[User.js] Debug info:", {
    users,
    currentUsers,
    loading,
    meta,
    usersLength: currentUsers?.length
  });

  // Handle search type change - clear all filters when changing type
  const handleSearchTypeChange = (value) => {
    setSearchType(value);
    // Clear all filters when changing search type
    setFilters({
      name: "",
      email: "",
      phone_number: "",
      whatsapp_number: "",
      wallet_id: "",
    });
  };

  // Search options for filtering
  const searchOptions = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "phone_number", label: "Phone Number" },
    { value: "whatsapp_number", label: "WhatsApp Number" },
    { value: "wallet_id", label: "Wallet ID" },
  ];
  return (
    <div className="kit-container">
      <PageHeader
        title="User Management"
        rightElement={
          <div className="search-filter">
            <Select
              options={searchOptions}
              defaultValue="name"
              onChange={handleSearchTypeChange}
              placeholder="Select filter type"
              icon={<Filter size={16} />}
            />
   
            <div className="search-box">
              <Search size={24} color="#b6bbc1" />
              <input
                type="text"
                name={searchType}
                placeholder={`Search by ${searchOptions.find(opt => opt.value === searchType)?.label}`}
                value={filters[searchType] || ""}
                onChange={handleFilterChange}
              />
            </div>

            <button className="apply-btn" onClick={handleApply}>
              Apply
            </button>
          </div>
        }
      />

      <div className="kit-nav">
        {fetchError && (
          <div className="error-message" style={{ 
            background: '#fee', 
            border: '1px solid #fcc', 
            padding: '10px', 
            borderRadius: '4px',
            margin: '10px 0',
            color: '#c33'
          }}>
            <strong>Error loading users:</strong> {fetchError}
          </div>
        )}
      </div>

      <div className="kit-metrics">
        <MetricBox
          icon={<UsersRound size={40} color="#4c6ef5" />}
          title="Total Users"
          value={metrics.total}
          loading={loading}
        />
      </div>

      <div className="kit-grid">
        {loading ? (
          <AppLoader />
        ) : currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <InfoCard
              key={user.id}
              title={user.name}
              items={[
                { icon: <Mail size={16} />, label: "Email", value: user.email },
                { icon: <Phone size={16} />, label: "Phone", value: user.phone },
                { icon: <PhoneIncoming size={16} />, label: "WhatsApp", value: user.whatsapp },
                { icon: <WalletMinimal size={16} />, label: "Wallet ID", value: user.walletID },
                { icon: <WalletCards size={16} />, label: "Wallet Balance", value: user.walletBalance },
                { icon: <Package size={16} />, label: "No Of Kits", value: user.kitsOwned },
                { icon: <Calendar size={16} />, label: "Date", value: formatDate(user.dateAdded) },
              ]}
              menuItems={[
                {
                  icon: <Edit2 size={16} />,
                  label: "Edit",
                  onClick: () => handleEditClick(user),
                },
                {
                  icon: <Wallet size={16} />,
                  label: "Fundings",
                  onClick: () => navigate(`/funding?email=${user.email}`),
                },
                {
                  icon: <Package size={16} />,
                  label: "Add Kit",
                  onClick: () => {
                    setKitUserId(user.id);
                    setKitUserEmail(user.email);
                    setIsKitModalOpen(true);
                  },
                },
              ]}
              className="active"
            />
          ))
        ) : (
          <EmptyState message="No users found." icon={<UserRoundX />} />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalItems={meta?.total_records || 0}
        itemsPerPage={usersPerPage}
        showPageNumbers={true}
      />

      <UserEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onChange={setSelectedUser}
        onSave={handleSave}
      />

      <AddKitModal
        isOpen={isKitModalOpen}
        onClose={() => setIsKitModalOpen(false)}
        userId={kitUserId}
        userEmail={kitUserEmail}
        onSuccess={() => {
          dispatch(fetchUsers({ page: currentPage, per_page: usersPerPage, filters }));
          setIsKitModalOpen(false);
        }}
      />
    </div>
  );
};

export default Users;
