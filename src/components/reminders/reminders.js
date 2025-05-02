import React, { useState } from "react";
import { Bell, RefreshCw } from "lucide-react";
import { createAxiosInstance } from "../../config/axios";
import "../../styles/Request.css";
import { ActionCard } from "../ActionCard/ActionCard";

import { toast } from "react-toastify";

const Reminders = () => {
  const [loadingReminder, setLoadingReminder] = useState(false);
  const [loadingRenew, setLoadingRenew] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const sendInvoiceReminder = async () => {
    setLoadingReminder(true);
    setError(null);
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        "api/v1/admin/send_invoice_reminders"
      );
      const msg = response?.data?.message || "Invoice reminder sent!";
      setMessage(msg);
      toast.success(msg);
    } catch (err) {
      const errorMsg = "Failed to send invoice reminder.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoadingReminder(false);
    }
  };

  const handleAutoRenew = async () => {
    setLoadingRenew(true);
    setMessage("");
    setError(null);
    try {
      const axiosInstance = createAxiosInstance();
      const res = await axiosInstance.get(
        "/api/v1/admin/kit_autorenews/auto_renew_kits"
      );
      const { message, count } = res.data;
      const successMsg = message || "Auto-renewal triggered successfully!";
      setMessage(successMsg);
      toast.success(successMsg);
    } catch (err) {
      const errorMsg = "Failed to trigger auto-renewal.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoadingRenew(false);
    }
  };

  return (
    <>
      <ActionCard
        title="INVOICE REMINDER"
        description="Send invoice reminders to all customers with pending payments"
        icon={<Bell size={32} />}
        buttonText="Send Reminders"
        onClick={sendInvoiceReminder}
        loading={loadingReminder}
      />

      <ActionCard
        title="AUTO-RENEW"
        description="Trigger automatic renewal for all eligible subscriptions"
        icon={<RefreshCw size={32} />}
        buttonText="Trigger Renewal"
        onClick={handleAutoRenew}
        loading={loadingRenew}
      />
    </>
  );
};

export default Reminders;
