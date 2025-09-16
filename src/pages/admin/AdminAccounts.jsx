import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { FaPlus } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminAccountPage = () => {
  const [form, setForm] = useState({
    alm_first_name: "",
    alm_last_name: "",
    alm_gender: "",
    alm_contact_number: "",
    email: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const { token } = useAuth();

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/admin-accounts`, { headers });
      setAdmins(res.data.data || res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch admin accounts");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in form) {
      if (!form[key]) {
        toast.error("Please fill out all fields");
        return;
      }
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/admin/admin-accounts`, form, { headers });
      toast.success("Admin account created! Check your email for processing status.");
      setForm({
        alm_first_name: "",
        alm_last_name: "",
        alm_gender: "",
        alm_contact_number: "",
        email: "",
        password: "",
      });
      fetchAdmins();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Error creating admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Accounts</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaPlus /> Create Admin
        </button>
      </div>

      {/* Admins Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-gray-500 text-center">
                  No admin accounts yet.
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr
                  key={admin.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-gray-600">{admin.email}</td> 
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Create Admin Account</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "alm_first_name", label: "First Name" },
                { id: "alm_last_name", label: "Last Name" },
                { id: "alm_gender", label: "Gender" },
                { id: "alm_contact_number", label: "Contact Number" },
                { id: "email", label: "Email", type: "email" },
                { id: "password", label: "Password", type: "password" },
              ].map(({ id, label, type = "text" }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    value={form[id]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}


export default AdminAccountPage;