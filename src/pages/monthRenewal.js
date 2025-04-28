import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../config/axios";
import "../styles/Wallet.css";
import { toast } from "react-toastify";
import Renewal from "../components/renewal/Renewal";
import { ViewRenewalModal } from "../components/renewal/ViewRenewal";
import EditRenewalModal from "../components/renewal/EditKitRenewal";
import { AppLoader } from "../components/Loader/loader";
import PageHeader from "../components/PageHeader/PageHeader";
import { FormSelect } from "../components/FormSelect";
import Pagination from "../components/Pagination/Pagination";
import EmptyState from "../components/EmptyState/EmptyState";
import { Package, Search } from "lucide-react";
import SearchWithButton from "../components/SearchInput/SearchInput";
import MetricBox from "../components/MetricsBox/MetricsBox";

const MonthlyRenewalPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [renewalData, setRenewalData] = useState([]);
  const [searchResult, setSearchResult] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [kitNumber, setKitNumber] = useState("");

  // Default selected month and year
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentYear = currentDate.getFullYear().toString();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const totalPages = Math.ceil(renewalData.length / recordsPerPage) || 1;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = renewalData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Open Edit Modal
  const handleOpenEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  // Open View Modal
  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setViewModalOpen(true);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedMonth, selectedYear, kitNumber]);

  const handleSearch = async () => {
    setLoading(true);
    setSearchResult(true);
    setError("");
    setRenewalData([]);
    setCurrentPage(1);

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get("/api/v1/admin/kit_renewals");
      const renewals = response.data;

      if (renewals && renewals.length > 0) {
        const filteredRenewals = renewals.filter((item) => {
          if (!item.date_of_renewal) return false;
          const itemDate = new Date(item.date_of_renewal);
          const itemMonth = (itemDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          const itemYear = itemDate.getFullYear().toString();

          return selectedMonth === "All"
            ? itemYear === selectedYear
            : itemMonth === selectedMonth && itemYear === selectedYear;
        });

        const finalFilteredRenewals = kitNumber
          ? filteredRenewals.filter((item) =>
              item.kit_number.includes(kitNumber)
            )
          : filteredRenewals;

        const sortedRenewals = finalFilteredRenewals.sort(
          (a, b) => new Date(b.date_of_renewal) - new Date(a.date_of_renewal)
        );
        if (sortedRenewals.length > 0) {
          toast.success("Renewals fetched successfully.");
          setRenewalData(sortedRenewals);
        } else {
          const noDataMsg = `No renewals found for ${selectedMonth}/${selectedYear}.`;
          setError(noDataMsg);
          toast.error(noDataMsg);
        }
      } else {
        setError("No renewal records found.");
        toast.error("No renewal records found.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching renewal records.");
      toast.error("Error fetching renewal records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kit-container-renewal">
      <PageHeader
        title="Monthly Renewals"
        rightElement={
          <div className="kit-select">
            <FormSelect
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="All">All</option>
              {Array.from({ length: 12 }, (_, index) => {
                const monthValue = (index + 1).toString().padStart(2, "0");
                return (
                  <option key={index} value={monthValue}>
                    {new Date(2025, index).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                );
              })}
            </FormSelect>
            <FormSelect
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {Array.from({ length: 5 }, (_, index) => {
                const yearValue = (
                  currentDate.getFullYear() -
                  2 +
                  index
                ).toString();
                return (
                  <option key={yearValue} value={yearValue}>
                    {yearValue}
                  </option>
                );
              })}
            </FormSelect>
          </div>
        }
      />

      {/* Actions Bar */}
      <div className="kit-actions-bar">
        {/* Search by Kit Number */}
        <SearchWithButton
          type="text"
          value={kitNumber}
          onChange={(e) => setKitNumber(e.target.value)}
          placeholder="Search by Kit Number"
          icon={<Search size={24} />}
          withButton={false}
          style={{ maxWidth: "600px" }}
        />
      </div>

      <div className="kit-grid-box kit-box">
        <MetricBox
          icon={<Package size={40} color="#b6bbc1" />}
          title={`Total Renewals`}
          value={renewalData.length}
          loading={loading}
        />
      </div>

      {/* Content */}
      <div className="kit-content-area">
        {loading && <AppLoader />}

        {searchResult && !loading && (
          <>
            {renewalData.length > 0 ? (
              <div className="kit-grid">
                {currentRecords.map((item) => (
                  <div key={item.id} className="kit-renewal-item">
                    <Renewal transaction={item} openModal={handleOpenModal} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                message={`No renewals found for ${selectedMonth}/${selectedYear}.`}
              />
            )}
          </>
        )}

        {!searchResult && !loading && (
          <EmptyState
            icon={<Search />}
            message="Select a month and year or enter a kit number to search."
          />
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={renewalData.length}
        itemsPerPage={recordsPerPage}
        showPageNumbers={true}
      />

      {/* Modals */}
      {viewModalOpen && selectedTransaction && (
        <ViewRenewalModal
          isOpen={viewModalOpen}
          closeModal={() => setViewModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
      {editModalOpen && selectedTransaction && (
        <EditRenewalModal
          isOpen={editModalOpen}
          closeModal={() => setEditModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default MonthlyRenewalPage;
