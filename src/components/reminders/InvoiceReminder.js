import React, { useState } from "react";
import { Bell } from "lucide-react";
import { createAxiosInstance } from "../../config/axios";
import "../../styles/Request.css";

const InvoiceReminder = () => {
  const [loadingReminder, setLoadingReminder] = useState(false);
  const [loadingRenew, setLoadingRenew] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // Success message

  // Send Invoice Reminder
  const sendInvoiceReminder = async () => {
    setLoadingReminder(true);
    setError(null);
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post("api/v1/admin/send_invoice_reminders");
      setMessage(response.data.message || "Invoice Reminder Sent!");
    } catch (err) {
      setError("Failed to send invoice reminder.");
    } finally {
      setLoadingReminder(false);
    }
  };

  // Handle Auto-Renew Subscriptions
  const handleAutoRenew = async () => {
    setLoadingRenew(true);
    setMessage("");
    setError(null);
    try {
      const axiosInstance = createAxiosInstance();
     const res = await axiosInstance.post("/api/v1/admin/auto_renews"); // POST request
      console.log(res)
      setMessage("Auto-renewal triggered successfully!"); // Show success message
    } catch (err) {
      setError("Failed to trigger auto-renewal.");
    } finally {
      setLoadingRenew(false);
    }
  };

  return (
    <div className="invoice">
    
      {/* Buttons Container */}
      <div className="auto-renew-container">
        <button onClick={sendInvoiceReminder} disabled={loadingReminder} className="auto-renew-btn">
          {loadingReminder ? "Sending..." : "Invoice Reminder"} <Bell size={14} />
        </button>

        <button onClick={handleAutoRenew} disabled={loadingRenew} className="auto-renew-btn">
          {loadingRenew ? "Processing..." : "Auto-Renew Subscriptions"}
        </button>
      </div>
    </div>
  );
};

export default InvoiceReminder;
