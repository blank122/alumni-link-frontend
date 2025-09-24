import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { FaPlus, FaUserShield } from "react-icons/fa";
import { User, Mail, Lock, Phone, X, Plus, Mars, Venus, Calendar } from "lucide-react"
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
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
            <FaUserShield className="text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              Admin Accounts
              <span className="px-2 py-1 text-sm font-semibold bg-gray-200 text-gray-700 rounded-md">
                {admins.length}
              </span>
            </h2>
            <p className="text-sm text-gray-500">
              Manage system administrators and access control
            </p>
          </div>
        </div>

        {/* Right Side */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
        >
          <FaPlus className="text-lg" />
          <span className="font-medium">Create Admin</span>
        </button>
      </div>


      {/* Admins Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">#</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <User size={16} /> Name
                </div>
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Mail size={16} /> Email
                </div>
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Phone size={16} /> Contact
                </div>
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> Created At
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-gray-500 text-center italic flex flex-col items-center gap-2"
                >
                  <User className="w-10 h-10 text-gray-400" />
                  No admin accounts yet.
                </td>
              </tr>
            ) : (
              admins.map((admin, index) => (
                <tr
                  key={admin.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition`}
                >
                  <td className="px-6 py-4 text-gray-500 font-medium">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800 font-semibold">
                    {admin.alumni.alm_first_name} {admin.alumni.alm_last_name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{admin.email}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {admin.alumni.alm_contact_number || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {admin.created_at ? (
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                        {new Date(admin.created_at).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Plus size={18} /> Create Admin Account
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name */}
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="alm_first_name"
                    value={form.alm_first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Last Name */}
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="alm_last_name"
                    value={form.alm_last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Gender */}
                <div className="flex gap-3">
                  {[
                    { id: "Male", icon: <Mars size={16} /> },
                    { id: "Female", icon: <Venus size={16} /> },
                  ].map((g) => (
                    <label
                      key={g.id}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition ${form.alm_gender === g.id
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      <input
                        type="radio"
                        name="alm_gender"
                        value={g.id}
                        checked={form.alm_gender === g.id}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {g.icon} {g.id}
                    </label>
                  ))}
                </div>

                {/* Contact Number */}
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="alm_contact_number"
                    value={form.alm_contact_number}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}


    </div>
  );
}


export default AdminAccountPage;