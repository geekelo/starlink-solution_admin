import { useState, useEffect } from "react";
import { createAxiosInstance } from "../config/axios";
import "../styles/Request.css";
import { Bell } from "lucide-react";

const Requests = () => {
  const [activeTab, setActiveTab] = useState("funding");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const response = await axiosInstance.get("/api/v1/admin/funding_kit_requests/pending_paid");
      setFundingData(response.data);
      console.log(fundingData)
    } catch (err) {
      setError("Failed to fetch funding requests.");
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  

  const fetchStarlinkKits = async () => {
    setLoading(true);
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get("/api/v1/admin/funding_kit_requests/pending_starlink_kits");
      setKits(response.data);
      console.log(kits)
    } catch (err) {
      setError("Failed to fetch Starlink kits.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setKits((prevKits) =>
      prevKits.map((kit) => (kit.id === id ? { ...kit, status: newStatus } : kit))
    );
  };

  const handlePlanChange = (id, newPlan) => {
    setKits((prevKits) =>
      prevKits.map((kit) => (kit.id === id ? { ...kit, plan: newPlan } : kit))
    );
  };

  return (
    <div className="requests-section">
      <div className="invoice">
        <h3 className="request-header">Requests</h3>
        <button onClick={() => alert("Invoice Reminder Sent")} disabled={loading}>
         Invoice Reminder <Bell size={14} />
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="tabs">
        <button className={activeTab === "funding" ? "active" : ""} onClick={() => setActiveTab("funding")}>
          Funding
        </button>
        <button className={activeTab === "kits" ? "active" : ""} onClick={() => setActiveTab("kits")}>
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
                    <p><strong>Date:</strong> {item.date}</p>
                    <p><strong>Amount:</strong> {item.amount}</p>
                    <p><strong>Reference:</strong> {item.reference}</p>
                    <p><strong>Payment Type:</strong> {item.type}</p>
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
                <p  className="req-message">No funding requests available.</p>
              )}
            </div>
          )}

          {activeTab === "kits" && (
            <div className="funding-list">
              {kits.length > 0 ? (
                kits.map((kit) => (
                  <div key={kit.id} className="funding-card">
                    <p><strong>NIN:</strong> {kit.nin}</p>
                    <p><strong>Address:</strong> {kit.address}</p>
                    <p><strong>Id:</strong> {kit.id}</p>
                    <p><strong>Kit No:</strong> {kit.kit_number}</p>
                    <p><strong>Company Name:</strong> {kit.company_name}</p>
                    <p><strong>Starlink_Plan_Id:</strong>{kit.starlink_plan_id}</p>
                    <p><strong>Starlink_User_Id:</strong>{kit.starlink_user_id}</p>
                    <p><strong>Date:</strong>{formatDate(kit.created_at)}</p>
                    <div className="cta">
                      <select value={kit.status} onChange={(e) => handleStatusChange(kit.id, e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                      </select>
                      <select value={kit.plan} onChange={(e) => handlePlanChange(kit.id, e.target.value)}>
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
                <p  className="req-message">No Starlink kit requests available.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Requests;
