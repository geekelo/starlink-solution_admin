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
import {InfoCard} from "../InfoCard/Card";

import { formatDate } from "../utils/date";

const Renewal = ({ transaction, openModal }) => {
  const location = useLocation();
  const isManageRenewalsPath = location.pathname.includes("/monthly-renewals");

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
       
        ...(isManageRenewalsPath ? [ {
          icon: <Eye size={16} />,
          label: "View Details",
          onClick: handleViewClick
        },{
          icon: <Edit2 size={16} />,
          label: "Edit",
          onClick: handleEditClick
        }, ] : [])
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
            ? formatDate(transaction.date)
            : transaction?.date_of_renewal
            ? formatDate(transaction.date_of_renewal)
            : "N/A"
        }
      ]}
    />
  );
};



export default Renewal;
