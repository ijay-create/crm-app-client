import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CustomerModal from "../components/CustomerModal";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customers";
import "../styles/customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // =========================
  // LOAD CUSTOMERS
  // =========================
  const loadCustomers = async (pageNumber = 1) => {
    try {
      const res = await fetchCustomers(pageNumber);

      setCustomers(res.data?.data || []);
      setTotalPages(res.data?.totalPages || 1);
      setPage(res.data?.page || pageNumber);
    } catch (error) {
      console.error("Load Customers Error:", error);
    }
  };

  useEffect(() => {
    loadCustomers(page);
  }, [page]);

  // =========================
  // SAVE CUSTOMER
  // =========================
  const handleSave = async (data) => {
    try {
      if (editData) {
        await updateCustomer(editData.id, data);
      } else {
        await createCustomer(data);
      }

      setEditData(null);
      setOpen(false);

      loadCustomers(page);
    } catch (error) {
      console.error("Save Customer Error:", error);
    }
  };

  // =========================
  // DELETE CUSTOMER
  // =========================
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this customer?"
      );

      if (!confirmed) return;

      await deleteCustomer(id);

      loadCustomers(page);
    } catch (error) {
      console.error("Delete Customer Error:", error);
    }
  };

  // =========================
  // SEARCH + FILTER
  // =========================
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      c.email
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      c.status === filter;

    return matchesSearch && matchesFilter;
  });

  // =========================
  // EXPORT CSV
  // =========================
  const handleExport = () => {
    window.open(
      "http://localhost:5000/api/export/customers",
      "_blank"
    );
  };

  return (
    <MainLayout>
      <div className="customers-page">

        {/* HEADER */}
        <div className="customers-header">
          <h1>Customers</h1>

          <div className="controls">

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option value="all">All</option>
              <option value="lead">Leads</option>
              <option value="active">Active</option>
              <option value="inactive">
                Inactive
              </option>
            </select>

            <button
              onClick={() => {
                setEditData(null);
                setOpen(true);
              }}
            >
              + Add Customer
            </button>

            <button onClick={handleExport}>
              Export CSV
            </button>

          </div>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.fullName}</td>

                    <td>{c.email}</td>

                    <td>{c.company}</td>

                    <td>
                      <span
                        className={`status ${c.status}`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          setEditData(c);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(c.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination">

          <button
            disabled={page <= 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() =>
              setPage((prev) => prev + 1)
            }
          >
            Next
          </button>

        </div>

        {/* MODAL */}
        <CustomerModal
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setEditData(null);
          }}
          onSave={handleSave}
          editData={editData}
        />

      </div>
    </MainLayout>
  );
};

export default Customers;