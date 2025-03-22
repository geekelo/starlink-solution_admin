import React, { useState } from "react";
import { Bell } from "lucide-react";
import { createAxiosInstance } from "../../config/axios";

const InvoiceReminder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendInvoiceReminder = async () => {
    setLoading(true);
    setError(null);
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post("api/v1/admin/send_invoice_reminders");
      alert(response.data.message || "Invoice Reminder Sent!");
    } catch (err) {
      setError("Failed to send invoice reminder.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invoice">
      <h3 className="request-header">Requests</h3>
      {error && <p className="error">{error}</p>}
      <button onClick={sendInvoiceReminder} disabled={loading} className="reminder-btn">
        {loading ? "Sending..." : "Invoice Reminder"} <Bell size={14} />
      </button>
    </div>
  );
};

export default InvoiceReminder;
