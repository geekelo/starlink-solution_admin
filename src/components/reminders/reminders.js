import React, { useState } from "react";
import { Bell, RefreshCw } from "lucide-react";
import { createAxiosInstance } from "../../config/axios";
import "../../styles/Request.css";
import { ActionCard } from "../ActionCard/ActionCard";

const Reminders = () => {
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
