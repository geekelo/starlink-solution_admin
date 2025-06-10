import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../config/axios";
import "../styles/User.css";
import {
  Calendar,
  Edit2,
  Mail,
  Package,
  Phone,
  PhoneIncoming,
  UserRoundX,
  UsersRound,
  Wallet,
  WalletCards,
  WalletMinimal,
} from "lucide-react";
import { formatDate } from "../components/utils/date";
import PageHeader from "../components/PageHeader/PageHeader";
import SearchWithButton from "../components/SearchInput/SearchInput";
import EmptyState from "../components/EmptyState/EmptyState";
import Pagination from "../components/Pagination/Pagination";
import MetricBox from "../components/MetricsBox/MetricsBox";
import { AppLoader } from "../components/Loader/loader";
import { InfoCard } from "../components/InfoCard/Card";
import UserEditModal from "../components/Users/UserEditModal";
import AddKitModal from "../components/kits/createKitModal";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isKitModalOpen, setIsKitModalOpen] = useState(false);
  const [kitUserId, setKitUserId] = useState(null);
  const [kitUserEmail, setKitUserEmail] = useState("");

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const usersPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get("/api/v1/admin/user_records");

      const formattedUsers = response.data
        .map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone_number,
          whatsapp: user.whatsapp_number,
          walletID: user.wallet_id || "N/A",
          walletBalance: user.wallet_balance || 0,
          otp: user.kits_owned,
          createdAt: user.created_at ? new Date(user.created_at) : null,
        }))
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      setUsers(formattedUsers);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    try {
      const axiosInstance = createAxiosInstance();
      const updatedData = {
        starlink_user: {
          email: selectedUser.email,
          phone_number: selectedUser.phone,
          name: selectedUser.name,
          whatsapp_number: selectedUser.whatsapp,
          email_confirmed: selectedUser.email_confirmed ?? false,
          whatsapp_number_confirmed: selectedUser.whatsapp_number_confirmed ?? false,
        },
      };

      await axiosInstance.patch(`/api/v1/admin/user_records/${selectedUser.id}`, updatedData);
      setIsModalOpen(false);
      alert("User updated successfully!");
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err.message);
      alert("Failed to update user. Please try again.");
    }
  };

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return users.filter((user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (user.createdAt && user.createdAt.toISOString().toLowerCase().includes(query)) ||
      (user.phone && user.phone.includes(query)) ||
      (user.whatsapp && user.whatsapp.includes(query)) ||
      (user.walletID && user.walletID.includes(query))
    );
  }, [searchQuery, users]);

  const currentUsers = useMemo(() => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  }, [filteredUsers, currentPage]);

  const toggleDropdown = (userId, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

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
  return (
    <div className="kit-container">
      <PageHeader
        title="User Management"
        rightElement={
          <SearchWithButton
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Name, Email, Phone, WhatsApp, Wallet ID, or OTP"
            icon={<Mail size={24} />}
            withButton={false}
            style={{ maxWidth: "600px" }}
          />
        }
      />

      {error && <p className="error-message">{error}</p>}

      <div className="kit-metrics">
        <MetricBox
          icon={<UsersRound size={40} color="#4c6ef5" />}
          title="Total Users"
          value={users.length}
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
                { icon: <Package size={16} />, label: "No Of Kits", value: user.otp },
                { icon: <Calendar size={16} />, label: "Date", value: user.createdAt ? formatDate(user.createdAt) : "N/A" },
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
        onPageChange={setCurrentPage}
        totalItems={filteredUsers.length}
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
          fetchUsers();
          setIsKitModalOpen(false);
        }}
      />
    </div>
  );
};

export default Users;
