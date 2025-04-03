

import React from "react";
import {  ArrowUpCircle, CalendarDays, CheckCircle, User, CreditCard } from 'lucide-react';
import {InfoCard} from "../InfoCard/Card";
import { formatDate } from "../utils/date";

// Funding Component with Kit Card styling
const Funding = ({ transaction }) => {
  return (
    <InfoCard
    title="Funding"
    active={true}
    className="funding"
    items={[
      {
        icon: <ArrowUpCircle size={16} />,
        label: "Amount",
        value: `₦${transaction.amount ? parseFloat(transaction.amount).toLocaleString() : "0"}`
      },
      {
        icon: <User size={16} />,
        label: "Email",
        value: transaction.email || "N/A"
      },
      {
        icon: <CheckCircle size={16} />,
        label: "Status",
        value: transaction.status || "Pending",
        className: `status-badge ${transaction.status}`
      },
      {
        icon: <CreditCard size={16} />,
        label: "Reference",
        value: transaction.reference || "N/A"
      },
      {
        icon: <CalendarDays size={16} />,
        label: "Date",
        value: formatDate(transaction.date) || "N/A"
      }
    ]}
  />
  );
};

export default Funding;