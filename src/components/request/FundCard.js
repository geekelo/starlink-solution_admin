import React, { useState, useRef, useEffect } from "react";
import {
  DollarSign,
  Calendar,
  FileText,
  Box,
  Save,
  MoreVertical,
  Eye,
  Edit2,
  X,
  Wallet2,
  User,
  BadgeCheck,
  Barcode,
  CheckCircle,
  CreditCard,
  IdCard,
} from "lucide-react";
import { formatDate } from "../utils/date";
import { InfoCard } from "../InfoCard/Card";
import { createAxiosInstance } from "../../config/axios";

import { toast } from "react-toastify";

const FundingCard = ({ item }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [selectedAmount, setSelectedAmount] = useState(item?.amount)

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleViewClick = () => {
    console.log("View details for:", item);
    setShowDropdown(false);
    setShowModal(true);
  };

  const handleEditClick = () => {
    console.log("Edit:", item);
    setShowDropdown(false);
    setShowModal(true);
  };
  const handleSave = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const payload = {
        starlink_wallet_funding: {
          status: status.toLowerCase(),
          amount: Number(selectedAmount),
        },
      };

      const response = await axiosInstance.patch(
        `/api/v1/admin/funding_kit_requests/${item.id}/update_funding_request`,
        payload
      );
     const {message, funding} = response.data
      toast.success(`${message}`);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating funding:", error);
      alert("Failed to update funding.");
    }
  };


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        event.target.className !== "modal-overlay"
      ) {
        // Don't close if clicking inside the modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    // Prepare the items array for InfoCard
    const cardItems = [
      {
        icon: <IdCard size={16} />,
        label: "Transaction",
        value: item.transaction_id
      },
      {
        icon: <DollarSign size={16} />,
        label: "Amount",
        value: new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.amount)
      },
      {
        icon: <BadgeCheck size={16} />,
        label: "Paid",
        value: item.paid
      },
      {
        icon: <Calendar size={16} />,
        label: "Date of Request",
        value: formatDate(item.created_at)
      },
      {
        icon: <User size={16} />,
        label: "Name",
        value: item.user_name
      },
      {
        icon: <User size={16} />,
        label: "Email",
        value: item.user_email
      },
      {
        icon: <Wallet2 size={16} />,
        label: "Wallet Id",
        value: item.wallet_id
      },
      {
        icon: <Barcode size={16} />,
        label: "Wallet Balance",
        value: new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.wallet_balance)
      }
    ];
    const handleStatusChange = (value) => {
      setStatus(value);
    };
    // Status options for the select dropdown
    const statusOptions = [
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" }
    ];

  return (
    <InfoCard
    title="Funding Request"
    items={cardItems}
    menuItems={[]} 
    className="funding-request-card"
    showAppButton={true}
    onAppButtonClick={handleSave}
    appButtonLabel="Save Changes"
    statusOptions={statusOptions}
    status={status}
    inputValue={selectedAmount}
    inputLabel="Amount"
    setSelectedAmount={setSelectedAmount}
    setStatus={setStatus}
    placeholder="Select status"
    label="Status"
  />

  );
};

export default FundingCard;
