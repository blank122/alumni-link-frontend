import { useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { motion } from 'framer-motion';
import {
  FaUserTimes, FaBriefcase, FaCheckCircle
} from 'react-icons/fa';
import StatsCard from '../../components/StatsCard';
import { useAlumniData, useAccountCounts } from '../../hooks/AlumniData';
import AlumniSubmission from '../../components/admin/AlumniSubmission';
import { 
  FiUser, 
  FiMail, 
  FiCalendar,
  FiEye,
  FiClock,
  FiCheckCircle,
  FiXCircle
} from "react-icons/fi";
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

const AlumniTableRow = ({ item, onView, index }) => {
  const statusConfig = {
    1: { 
      text: "Pending", 
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300",
      icon: FiClock
    },
    2: { 
      text: "Approved", 
      color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      icon: FiCheckCircle
    },
    0: { 
      text: "Rejected", 
      color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
      icon: FiXCircle
    }
  };

  const status = statusConfig[item.status] || statusConfig[1];
  const StatusIcon = status.icon;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
    >
      {/* Date */}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <FiCalendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {new Date(item.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </td>

      {/* Name */}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            {item.alumni?.alm_first_name?.[0] || 'N'}{item.alumni?.alm_last_name?.[0] || 'A'}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white truncate">
              {item.alumni?.alm_first_name || "N/A"} {item.alumni?.alm_last_name || "N/A"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              Alumni Applicant
            </p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <FiMail className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-300 truncate">
            {item.email || "N/A"}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <StatusIcon className="w-4 h-4 flex-shrink-0" />
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
            {status.text}
          </span>
        </div>
      </td>

      {/* Action */}
      <td className="px-6 py-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onView(item)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium text-sm"
        >
          <FiEye className="w-4 h-4" />
          <span>View Details</span>
        </motion.button>
      </td>
    </motion.tr>
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