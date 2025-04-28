import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Calendar,
  FileText,
  Save,
  MoreVertical,
  Eye,
  Edit2,
  X,
  Copy,
} from "lucide-react";
import { InfoCard } from "../InfoCard/Card";
import { formatDate } from "../utils/date";
import { createAxiosInstance } from "../../config/axios";

import { toast } from "react-toastify";
const KitCard = ({ kit, plans, fetchStarlinkKits }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(kit.status);
  const [isSaving, setIsSaving] = useState(false); 
  const [selectedPlan, setSelectedPlan] = useState(kit.plan);

  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const isManageRenewalsPath = true; // This would be determined by your router in a real app

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleViewClick = () => {
    console.log("View details for kit:", kit.id);
    setShowDropdown(false);
    setShowModal(true);
  };

  const handleEditClick = () => {
    setShowDropdown(false);
    setShowModal(true);
  };

  const handleSave = async () => {
    setIsSaving(true); 
    try {
      const axiosInstance = createAxiosInstance();
      const payload = {
        starlink_kit: {
          status,
          starlink_plan_id: selectedPlan,
        },
      };

      const response = await axiosInstance.patch(
        `/api/v1/admin/funding_kit_requests/${kit.id}/update_kit_status`,
        payload
      );

      console.log("Update successful", response.data);

      const { message, funding } = response.data;
      toast.success(`${message}`);
      setShowModal(false);
      alert("Kit updated successfully");
    } catch (error) {
      console.error("Error updating kit:", error);
      alert("Failed to update kit. Please try again.");
    } finally {
      setIsSaving(false); 
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

  const kitItems = [
    {
      icon: <FileText size={16} />,
      label: "NIN",
      value: kit.nin,
    },
    {
      icon: <FileText size={16} />,
      label: "Address",
      value: kit.address,
    },
    {
      icon: <Box size={16} />,
      label: "Kit No",
      value: kit.kit_number,
    },
    {
      icon: <FileText size={16} />,
      label: "Company Name",
      value: kit.company_name,
    },
    {
      icon: <Calendar size={16} />,
      label: "Date",
      value: formatDate(kit.created_at),
    },
  ];
  // Status options for the select dropdown
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  // Convert plans array to options format
  const planOptions = plans.map((plan) => ({
    value: plan.id,
    label: plan.name,
  }));
  return (
    <InfoCard
      title="New Kits"
      items={kitItems}
      menuItems={[]}
      icon={<Copy />}
      className="renewal kit-card"
      active={status === "approved"}
      showAppButton={true}
      onAppButtonClick={handleSave}

      appButtonLabel={isSaving ? "Saving..." : "Approve"}  
      appButtonDisabled={isSaving} 
      statusOptions={statusOptions}
      status={status}
      setStatus={setStatus}
      placeholder="Select status"
      label="Status"
      planOptions={planOptions}
      selectedPlan={selectedPlan}
      setSelectedPlan={setSelectedPlan}
    />
  );
};

export default KitCard;
