import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createAxiosInstance } from "../config/axios";
import "../styles/Wallet.css";
import { Edit, X, CheckCircle, Search, ChevronLeft, ChevronRight, Plus, Mail } from "lucide-react";
import Funding from "../components/funding/funding";
import CreateFundingModal from "../components/funding/CreateFunding";
import SuccessModal from "../components/funding/Success-Modal";
import { FormInput } from "../components/FormInput/Input";
import AppButton from "../components/AppButton/Button";
import { AppLoader } from "../components/Loader/loader";
import SearchWithButton from "../components/SearchInput/SearchInput";
import Pagination from "../components/Pagination/Pagination";
import PageHeader from "../components/PageHeader/PageHeader";
import EmptyState from "../components/EmptyState/EmptyState";

const FundingPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get("email") || "";

  const [email, setEmail] = useState(userEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fundingData, setFundingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [searchResult, setSearchResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [newFunding, setNewFunding] = useState({
    email: "",
    amount: "",
    type: "",
    payment_method: "",
    status: "pending",
    date:""
  });

  // Handle URL parameters for automatic search
  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
      handleSearch();
    }
  }, [userEmail]);

  // Reset search result state when email is cleared
  useEffect(() => {
    if (!email) {
      setSearchResult(false);
    }
  }, [email]);

  const handleSearch = async () => {
    if (!email) return;
    
    setLoading(true);
    setError("");
    setFundingData([]);
    setSearchResult(true); 

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `/api/v1/admin/user_fundings?email=${email}`

      );
    
      const sortedData = response.data.map((funding) => ({
        ...funding,
        email: funding.user_email || "N/A",
        date: funding.created_at ? new Date(funding.created_at).toLocaleString() : "N/A",
      }));
      
      setFundingData(sortedData);
      setCurrentPage(1);
    } catch (err) {
      setError("No records found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFunding = async () => {
    if (
      !newFunding.email ||
      !newFunding.amount ||
      !newFunding.type ||
      !newFunding.payment_method ||
      !newFunding.status ||
      !newFunding.date
    ) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.post("/api/v1/admin/user_fundings", {
        email: newFunding.email,
        funding: {
          amount: Number(newFunding.amount),
          payment_method: newFunding.payment_method,
          status: newFunding.status,
          date: newFunding.date
        },
      });

      setShowModal(false);
      setShowSuccessModal(true);
      setNewFunding({
        email: "",
        amount: "",
        type: "",
        payment_method: "",
        status: "pending",
        date:""
      });
      
      // If the created funding matches the current search, refresh results
      if (newFunding.email === email) {
        handleSearch();
      }
    } catch (err) {
      setError("Failed to create funding.");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFunding = fundingData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="kit-container-renewal">
      {/* Actions bar - search and create button in one line */}
     
      <div className="kit-actions-bar">
      <SearchWithButton
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter user email"
        icon={<Mail size={24} />}
        loading={loading}
        onSearch={handleSearch}
        
        withButton={true}
        buttonText="Search"
        loadingText="Searching..."
      />
        <div className="kit-action-wrapper">
        <AppButton   variant="custom"
          backgroundColor="primary"
          leftIcon={<Plus/>}
          textColor="#000"
          loading={loading}
          loadingText="Creating..."
          disabled={loading}
        onClick={() => setShowModal(true)}>
 Create Funding
          </AppButton>
         
        </div>
      </div>
    
      {/* Header stands alone */}
      <PageHeader title="Manage Funding Request"/>
   
    
      {/* Content area */}
      <div className="kit-content-area">
      
    
        {/* Loading indicator */}
        {loading && (
        <AppLoader/>
        )}
    
        {/* Show results based on search state */}
        {searchResult && !loading && (
          <>
            {currentFunding.length > 0 ? (
              <div className="kit-grid">
                {currentFunding.map((funding) => (
                  <Funding key={funding.id} transaction={funding} />
                ))}
              </div>
            ) : (
              <div className="kit-empty-state">
                <div className="kit-empty-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <h3 className="kit-empty-title">No Records Found</h3>
                <p className="kit-empty-message">We couldn't find any funding records for email: <span className="kit-highlight">{email}</span></p>
                <p className="kit-empty-suggestion">Try searching with a different email or create a new funding request.</p>
              </div>
            )}
          </>
        )}
    
        {/* Initial state shown when no search has been performed */}
        {!searchResult && !loading && (
          <EmptyState message="Enter a user email above and click Search to view funding records." icon={<Search/>}/>
          // <div className="kit-initial-state">
          //   <div className="kit-initial-icon">
          //     <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          //       <circle cx="11" cy="11" r="8"/>
          //       <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          //     </svg>
          //   </div>
          //   <h3 className="kit-initial-title">Ready to Search</h3>
          //   <p className="kit-initial-message">Enter a user email above and click Search to view funding records.</p>
          // </div>
        )}
    
        {/* Pagination */}
        {fundingData.length > itemsPerPage && (
               <Pagination
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  totalItems={fundingData.length}
                  itemsPerPage={itemsPerPage}
                  showPageNumbers={true}
                />
        )}
      </div>
    
      {/* Modals */}
      {showModal && (
        <CreateFundingModal
          newFunding={newFunding}
          setNewFunding={setNewFunding}
          handleCreateFunding={handleCreateFunding}
          closeModal={() => setShowModal(false)}
          loading={loading}
        />
      )}
    
      {showSuccessModal && (
        <SuccessModal
          message="Funding Request Created Successfully!"
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};


export default FundingPage;
