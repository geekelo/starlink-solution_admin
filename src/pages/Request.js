import { useState, useEffect } from "react";
import { createAxiosInstance } from "../config/axios";
import "../styles/Request.css";
import InvoiceReminder from "../components/reminders/InvoiceReminder";
import KitCard from "../components/request/KitCard";
import FundingCard from "../components/request/FundCard";
import { Box, HandCoins } from "lucide-react";

const Requests = () => {
  const [activeTab, setActiveTab] = useState("funding");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Success message

  const [fundingData, setFundingData] = useState([]);
  const [kits, setKits] = useState([]);
  const [plans, setPlans] = useState([]); // Store Starlink plans from API

  useEffect(() => {
    fetchFundingRequests();
    fetchStarlinkKits();
    fetchStarlinkPlans(); // Fetch available plans
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
      setKits(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (err) {
      setError("Failed to fetch Starlink kits.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStarlinkPlans = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get("/api/v1/starlink_plans");
      setPlans(response.data); // Store the plans in state
    } catch (err) {
      setError("Failed to fetch Starlink plans.");
    }
  };
  return (
    <div className="requests-section">
      <InvoiceReminder />
      {message && <p className="success-message">{message}</p>}
      
      <div className="tabs">
        <button
          className={activeTab === "funding" ? "active" : ""}
          onClick={() => setActiveTab("funding")}
        >
         
          <HandCoins size={18} />
          <span>Funding</span>
        </button>
        <button
          className={activeTab === "kits" ? "active" : ""}
          onClick={() => setActiveTab("kits")}
        >
          <Box size={18} />
          <span>Kits</span>
        </button>
      </div>
      
      {loading ? (
         <div className="kit-loading-container">
         <div className="kit-spinner-large"></div>
        
       </div>
      ) : (
        <>
          {activeTab === "funding" && (
            <div className="funding-list">
              {fundingData.length > 0 ? (
                fundingData.map((item, index) => (
                  <FundingCard key={index} item={item} />
                ))
              ) : (
                <p className="req-message">No funding requests available.</p>
              )}
            </div>
          )}
          
          {activeTab === "kits" && (
            <div className="kit-grid">
              {kits.length > 0 ? (
                kits.map((kit) => (
                  <KitCard key={kit.id} kit={kit} plans={plans} />
                ))
              ) : (
                <p className="req-message">No Starlink kit requests available.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
  // return (
  //   <div className="requests-section">
  //     <InvoiceReminder />
  //     {message && <p className="success-message">{message}</p>}

  //     <div className="tabs">
  //       <button
  //         className={activeTab === "funding" ? "active" : ""}
  //         onClick={() => setActiveTab("funding")}
  //       >
  //         Funding
  //       </button>
  //       <button
  //         className={activeTab === "kits" ? "active" : ""}
  //         onClick={() => setActiveTab("kits")}
  //       >
  //         Kits
  //       </button>
  //     </div>

  //     {loading ? (
  //       <p className="error-message">Loading...</p>
  //     ) : (
  //       <>
  //         {activeTab === "funding" && (
  //           <div className="funding-list">
  //             {fundingData.length > 0 ? (
  //               fundingData.map((item, index) => (
  //                 <div key={index} className="funding-card">
  //                   <p><strong>Date:</strong> {new Date(item.created_at).toLocaleDateString("en-US")}</p>
  //                   <p><strong>Amount:</strong> {item.amount}</p>
  //                   <p><strong>Reference:</strong> {item.reference}</p>
  //                   <p><strong>Payment Type:</strong> {item.type}</p>
  //                   <div className="cta">
  //                     <select>
  //                       <option value="Pending">Pending</option>
  //                       <option value="Approved">Approved</option>
  //                       <option value="Rejected">Rejected</option>
  //                     </select>
  //                     <button className="save-btn">Save</button>
  //                   </div>
  //                 </div>
  //               ))
  //             ) : (
  //               <p className="req-message">No funding requests available.</p>
  //             )}
  //           </div>
  //         )}

  //         {activeTab === "kits" && (
  //           <div className="kit-grid">
  //             {kits.length > 0 ? (
  //               kits.map((kit) => (
  //                 <div key={kit.id} className="funding-card">
  //                   <p><strong>NIN:</strong> {kit.nin}</p>
  //                   <p><strong>Address:</strong> {kit.address}</p>
  //                   <p><strong>Id:</strong> {kit.id}</p>
  //                   <p><strong>Kit No:</strong> {kit.kit_number}</p>
  //                   <p><strong>Company Name:</strong> {kit.company_name}</p>
  //                   <p><strong>Date:</strong> {new Date(kit.created_at).toLocaleDateString("en-US")}</p>
  //                   <div className="cta">
  //                     <select value={kit.status}>
  //                       <option value="pending">Pending</option>
  //                       <option value="approved">Approved</option>
  //                     </select>
  //                     <select value={kit.plan}>
  //                       {plans.map((plan) => (
  //                         <option key={plan.id} value={plan.id}>
  //                           {plan.name} {/* Display name, but value is ID */}
  //                         </option>
  //                       ))}
  //                     </select>
  //                     <button className="save-btn">Save</button>
  //                   </div>
  //                 </div>
  //               ))
  //             ) : (
  //               <p className="req-message">No Starlink kit requests available.</p>
  //             )}
  //           </div>
  //         )}
  //       </>
  //     )}
  //   </div>
  // );
};

export default Requests;