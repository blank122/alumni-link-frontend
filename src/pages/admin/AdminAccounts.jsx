import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

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

  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const {  token } = useAuth();

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
    <div className="container mx-auto py-8 grid gap-8 md:grid-cols-2">
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="shadow-xl border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Create Admin Account</h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {[
              { id: "alm_first_name", label: "First Name" },
              { id: "alm_last_name", label: "Last Name" },
              { id: "alm_gender", label: "Gender" },
              { id: "alm_contact_number", label: "Contact Number" },
              { id: "email", label: "Email", type: "email" },
              { id: "password", label: "Password", type: "password" },
            ].map(({ id, label, type = "text" }) => (
              <div key={id} className="grid gap-2">
                <label htmlFor={id} className="text-sm font-medium">
                  {label}
                </label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  value={form[id]}
                  onChange={handleChange}
                  required
                  className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Existing Admins */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="shadow-xl border rounded-lg p-6 h-full">
          <h2 className="text-xl font-bold mb-4">Existing Admin Accounts</h2>
          <div className="space-y-2 max-h-[600px] overflow-auto">
            {admins.length === 0 ? (
              <p className="text-sm text-gray-500">No admin accounts yet.</p>
            ) : (
              admins.map((admin) => (
                <div key={admin.id} className="border p-2 rounded-lg">
                  <p className="font-medium">
                    {admin.alm_first_name} {admin.alm_last_name}
                  </p>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}


export default AdminAccountPage;