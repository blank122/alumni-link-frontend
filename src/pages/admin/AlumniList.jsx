import { useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { motion } from 'framer-motion';
import {
  FaUserTimes, FaBriefcase, FaCheckCircle
} from 'react-icons/fa';
import StatsCard from '../../components/StatsCard';
import { useAlumniData, useAccountCounts } from '../../hooks/AlumniData';
import AlumniSubmission from '../../components/admin/AlumniSubmission';

const AlumniList = () => {
  const { token } = useAuth();
  const { account, loading } = useAlumniData(token);
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const {
    pendingCount,
    approvedCount,
    loadingPending,
    loadingApproved
  } = useAccountCounts(token);

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <StatsCard
          icon={FaUserTimes}
          title="Pending Accounts"
          value={pendingCount}
          isLoading={loadingPending}
          bgColor="bg-gray-300"
        />

        <StatsCard
          icon={FaBriefcase}
          title="Approved Accounts"
          value={approvedCount}
          isLoading={loadingApproved}
          bgColor="bg-orange-200"
        />
      </div>

      <AlumniTable
        accounts={account}
        loading={loading}
        onView={(accountData) => {
          setSelectedAccount(accountData);
          setOpen(true);
        }}
      />

      {/* Modal */}
      {open && selectedAccount && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto">
            <AlumniSubmission
              userData={selectedAccount.alumni}
              onClose={() => setOpen(false)}
              accountID={selectedAccount.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};


const AlumniTable = ({ accounts, loading, onView }) => (
  <motion.div
    className="mt-6 p-4 bg-white shadow-md rounded-lg"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Alumni Accounts Data</h2>
    {loading ? (
      <p className="text-gray-500">Loading alumni data...</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Registration Date</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length > 0 ? (
              accounts.map((item) => (
                <AlumniTableRow
                  key={item.id}
                  item={item}
                  onView={onView}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No Account data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
  </motion.div>
);

const AlumniTableRow = ({ item, onView }) => {
  const statusText = item.status === 1 ? "Pending" : item.status === 2 ? "Approved" : "Rejected";

  console.log(
    "🔍 item inside AlumniTableRow:",
    JSON.stringify(item, null, 2)
  );
  return (
    <tr className="border-b bg-gray-100 hover:bg-gray-200 transition">
      <td className="px-6 py-4 text-gray-700">
        {new Date(item.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-gray-700">
        {item.alumni?.alm_first_name || "N/A"} {item.alumni?.alm_last_name || "N/A"}
      </td>
      <td className="px-6 py-4 text-gray-700">{item.email || "N/A"}</td>
      <td className="px-6 py-4 text-gray-700">{statusText}</td>
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => onView(item)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          View Application
        </button>
      </td>
    </tr>
  );
};


const ActionButton = ({ actionType, itemId, isProcessing, onClick, color, className = '' }) => {
  const colorClasses = {
    green: 'bg-green-500 hover:bg-green-600',
    red: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <button
      onClick={() => onClick(itemId, actionType)}
      className={`px-4 py-2 text-white rounded-md transition ${className} ${isProcessing ? "bg-gray-400 cursor-not-allowed" : colorClasses[color]
        }`}
      disabled={isProcessing}
    >
      {isProcessing ? "Processing..." : actionType}
    </button>
  );
};



export default AlumniList;