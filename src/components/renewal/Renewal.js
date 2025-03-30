import React, { useState, useRef, useEffect } from "react";
import {
  RefreshCw,
  CalendarDays,
  CheckCircle,
  FileText,
  MoreVertical,
  Eye,
  Edit2,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import InfoCard from "../InfoCard/Card";


const Renewal = ({ transaction, openModal }) => {
  const location = useLocation();
  const isManageRenewalsPath = location.pathname.includes("/manage-renewal");

  const handleEditClick = () => {
    openModal("edit", transaction);
  };

  const handleViewClick = () => {
    openModal("view", transaction);
  };

  return (
    <InfoCard
      title="Renewal"
      className="renewal"
      menuItems={[
        {
          icon: <Eye size={16} />,
          label: "View Details",
          onClick: handleViewClick
        },
        ...(isManageRenewalsPath ? [{
          icon: <Edit2 size={16} />,
          label: "Edit",
          onClick: handleEditClick
        }] : [])
      ]}
      items={[
        {
          icon: <FileText size={16} />,
          label: "Kit Number",
          value: transaction?.reference || transaction?.kit_number || "N/A"
        },
        {
          icon: <CheckCircle size={16} />,
          label: "Status",
          value: transaction?.status || "Receipt",
          className: `status-badge ${transaction?.status?.toLowerCase()}`
        },
        {
          icon: <RefreshCw size={16} />,
          label: "Amount",
          value: `₦${transaction.amount 
            ? parseFloat(transaction.amount).toLocaleString() 
            : "0"}`
        },
        {
          icon: <CalendarDays size={16} />,
          label: "Date",
          value: transaction?.date
            ? new Date(transaction.date).toLocaleDateString()
            : transaction?.date_of_renewal
            ? new Date(transaction.date_of_renewal).toLocaleDateString()
            : "N/A"
        }
      ]}
    />
  );
};



export default Renewal;
