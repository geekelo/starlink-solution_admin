import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  RefreshCw,
  CalendarDays,
  CheckCircle,
  FileText,
  Eye,
  Edit2,
  Delete,
} from "lucide-react";
import { InfoCard } from "../InfoCard/Card";
import { formatDate } from "../utils/date";
import EditRenewalModal from "./EditKitRenewal";
import { ViewRenewalModal } from "./ViewRenewal";
import { createAxiosInstance } from "../../config/axios";
import { toast } from "react-toastify";
import Modal from "../modal/modal";

const Renewal = ({ transaction }) => {
  const location = useLocation();
  const isManageRenewalsPath =
    location.pathname.includes("/monthly-renewals") ||
    location.pathname.includes("/renewals");

  const [modalOpen, setModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  const openModal = (type, trans) => {
    if (type === "editRenewal") {
      setSelectedTransaction(trans);
      setModalOpen(true);
    }
    if (type === "view") {
      setSelectedTransaction(trans);
      setViewModal(true);
    }
    if (type === "delete") {
      setSelectedTransaction(trans);
      setDeleteModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTransaction(null);
  };

  const closeViewModal = () => {
    setViewModal(false);
    setSelectedTransaction(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleDelete = async () => {
    if (!selectedTransaction?.id) {
      toast.error("Invalid transaction selected for deletion.");
      return;
    }

    setLoading(true);
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.delete(
        `/api/v1/admin/kit_renewals/${selectedTransaction.id}`
      );

      toast.success("Renewal deleted successfully!");
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting renewal:", error);
      toast.error("Failed to delete renewal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InfoCard
        title="Renewal"
        className="renewal"
        menuItems={[
          {
            icon: <Eye size={16} />,
            label: "View Details",
            onClick: () => openModal("view", transaction),
          },
          {
            icon: <Delete size={16} />,
            label: "Delete",
            onClick: () => openModal("delete", transaction),
          },
          ...(isManageRenewalsPath
            ? [
                {
                  icon: <Edit2 size={16} />,
                  label: "Edit Renewal",
                  onClick: () => openModal("editRenewal", transaction),
                },
              ]
            : []),
        ]}
        items={[
          {
            icon: <FileText size={16} />,
            label: "Kit Number",
            value: transaction?.reference || transaction?.kit_number || "N/A",
          },
          {
            icon: <CheckCircle size={16} />,
            label: "Status",
            value: transaction?.status || "Receipt",
            className: `status-badge ${transaction?.status?.toLowerCase()}`,
          },
          {
            icon: <RefreshCw size={16} />,
            label: "Amount",
            value: `₦${
              transaction.amount
                ? parseFloat(transaction.amount).toLocaleString()
                : "0"
            }`,
          },
          {
            icon: <CalendarDays size={16} />,
            label: "Start Date",
            value: transaction?.start_date
              ? formatDate(transaction.start_date)
              : "N/A",
          },
          {
            icon: <CalendarDays size={16} />,
            label: "Deadline",
            value: transaction?.deadline
              ? formatDate(transaction.deadline)
              : "N/A",
          },
          {
            icon: <CalendarDays size={16} />,
            label: "End Date",
            value: transaction?.end_date
              ? formatDate(transaction.end_date)
              : "N/A",
          },
          {
            icon: <CalendarDays size={16} />,
            label: "Date of renewal",
            value: transaction?.date_of_renewal
              ? formatDate(transaction.date_of_renewal)
              : "N/A",
          },
        ]}
      />

      {/* Edit Modal */}
      {modalOpen && (
        <EditRenewalModal
          isOpen={modalOpen}
          closeModal={closeModal}
          transaction={selectedTransaction}
          onSave={() => {
            closeModal();
          }}
        />
      )}

      {/* View Modal */}
      {viewModal && (
        <ViewRenewalModal
          isOpen={viewModal}
          closeModal={closeViewModal}
          transaction={selectedTransaction}
          onSave={() => {
            closeViewModal();
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <Modal
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          title="Confirm Deletion"
          size="sm"
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button className="btn btn-secondary" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          }
        >
          <p>
            Are you sure you want to delete this renewal? This action cannot be
            undone.
          </p>
        </Modal>
      )}
    </>
  );
};

export default Renewal;
