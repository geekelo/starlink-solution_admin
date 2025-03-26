import { useState, useEffect } from "react";
import { createAxiosInstance } from "../../config/axios";
import "../../styles/Request.css";
import InvoiceReminder from "../reminders/InvoiceReminder";

const Requests = () => {
  const [activeTab, setActiveTab] = useState("funding");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Success message

  const [fundingData, setFundingData] = useState([]);
  const [kits, setKits] = useState([]);
  const plans = ["Basic", "Standard", "Premium"];

  useEffect(() => {
    fetchFundingRequests();
    fetchStarlinkKits();
  }, []);

  const fetchFundingRequests = async () => {
    setLoading(true);
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        "/api/v1/admin/funding_kit_requests/pending_paid"
      );
      const sortedData = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setFundingData(sortedData);
    } catch (err) {
      setError("Failed to fetch funding requests.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStarlinkKits = async () => {
    setLoading(true);
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        "/api/v1/admin/funding_kit_requests/pending_starlink_kits"
      );
      const sortedKits = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setKits(sortedKits);
    } catch (err) {
      setError("Failed to fetch Starlink kits.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Auto-Renew Subscriptions
  const handleAutoRenew = async () => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.post("/api/v1/admin/auto_renews"); // POST request
      setMessage("Auto-renewal triggered successfully!"); // Show success message
    } catch (err) {
      setError("Failed to trigger auto-renewal."); // Show error message
    } finally {
      setLoading(false);
    }
  };
  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    setKits((prevKits) =>
      prevKits.map((kit) =>
        kit.id === id ? { ...kit, status: newStatus } : kit
      )
    );
  };

  // Function to handle plan change
  const handlePlanChange = (id, newPlan) => {
    setKits((prevKits) =>
      prevKits.map((kit) => (kit.id === id ? { ...kit, plan: newPlan } : kit))
    );
  };

  return (
    <div className="requests-section">
      {/* Auto-Renew Button */}
      <InvoiceReminder />

      {message && <p className="success-message">{message}</p>}

      <div className="tabs">
        <button
          className={activeTab === "funding" ? "active" : ""}
          onClick={() => setActiveTab("funding")}
        >
          Funding
        </button>
        <button
          className={activeTab === "kits" ? "active" : ""}
          onClick={() => setActiveTab("kits")}
        >
          Kits
        </button>
      </div>

      {loading ? (
        <p className="error-message">Loading...</p>
      ) : (
        <>
          {activeTab === "funding" && (
            <div className="funding-list">
              {fundingData.length > 0 ? (
                fundingData.map((item, index) => (
                  <div key={index} className="funding-card">
                    <p>
                      <strong>Date:</strong> {item.date}
                    </p>
                    <p>
                      <strong>Amount:</strong> {item.amount}
                    </p>
                    <p>
                      <strong>Reference:</strong> {item.reference}
                    </p>
                    <p>
                      <strong>Payment Type:</strong> {item.type}
                    </p>
                    <div className="cta">
                      <select>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      <button className="save-btn">Save</button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="req-message">No funding requests available.</p>
              )}
            </div>
          )}

          {activeTab === "kits" && (
            <div className="funding-list">
              {kits.length > 0 ? (
                kits.map((kit) => (
                  <div key={kit.id} className="funding-card">
                    <p>
                      <strong>NIN:</strong> {kit.nin}
                    </p>
                    <p>
                      <strong>Address:</strong> {kit.address}
                    </p>
                    <p>
                      <strong>Id:</strong> {kit.id}
                    </p>
                    <p>
                      <strong>Kit No:</strong> {kit.kit_number}
                    </p>
                    <p>
                      <strong>Company Name:</strong> {kit.company_name}
                    </p>

                    <p>
                      <strong>Date:</strong>
                      {new Date(kit.created_at).toLocaleDateString("en-US")}
                    </p>
                    <div className="cta">
                      <select
                        value={kit.status}
                        onChange={(e) =>
                          handleStatusChange(kit.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                      </select>
                      <select
                        value={kit.plan}
                        onChange={(e) =>
                          handlePlanChange(kit.id, e.target.value)
                        }
                      >
                        {plans.map((plan) => (
                          <option key={plan} value={plan}>
                            {plan}
                          </option>
                        ))}
                      </select>
                      <button className="save-btn">Save</button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="req-message">
                  No Starlink kit requests available.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Requests;
