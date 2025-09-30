import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FiUser, 
    FiMail, 
    FiPhone, 
    FiCalendar,
    FiUsers,
    FiChevronDown,
    FiChevronUp
} from "react-icons/fi";

const AdminsTable = ({ admins, loading }) => {
    const [visibleCount, setVisibleCount] = useState(5);

    const handleToggle = () => {
        setVisibleCount(visibleCount >= admins.length ? 5 : admins.length);
    };

    const visibleAdmins = admins.slice(0, visibleCount);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const rowVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    if (loading) {
        return (
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
            >
                <div className="flex justify-center items-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-500 dark:text-gray-400">Loading admin data...</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                            <FiUsers className="w-6 h-6 text-indigo-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Admin Accounts
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {admins.length} admin{admins.length !== 1 ? 's' : ''} registered
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                #
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                <div className="flex items-center space-x-2">
                                    <FiUser className="w-4 h-4" />
                                    <span>Name</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                <div className="flex items-center space-x-2">
                                    <FiMail className="w-4 h-4" />
                                    <span>Email</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                <div className="flex items-center space-x-2">
                                    <FiPhone className="w-4 h-4" />
                                    <span>Contact</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                <div className="flex items-center space-x-2">
                                    <FiCalendar className="w-4 h-4" />
                                    <span>Created At</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        <AnimatePresence>
                            {admins.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <FiUsers className="w-12 h-12 text-gray-400 mb-4" />
                                            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                                                No admin accounts yet
                                            </p>
                                            <p className="text-gray-400 dark:text-gray-500 text-sm">
                                                Admin accounts will appear here once created
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                visibleAdmins.map((admin, index) => (
                                    <motion.tr
                                        key={admin.id}
                                        variants={rowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: index * 0.1 }}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400">
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                    {admin.alumni.alm_first_name[0]}{admin.alumni.alm_last_name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">
                                                        {admin.alumni.alm_first_name} {admin.alumni.alm_last_name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Administrator
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <FiMail className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-700 dark:text-gray-300">{admin.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <FiPhone className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    {admin.alumni.alm_contact_number || (
                                                        <span className="text-gray-400 italic">Not provided</span>
                                                    )}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin.created_at ? (
                                                <div className="flex items-center space-x-2">
                                                    <FiCalendar className="w-4 h-4 text-gray-400" />
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                                        {new Date(admin.created_at).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic">Unknown</span>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Toggle Button */}
            {admins.length > 5 && (
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                    <div className="flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleToggle}
                            className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors font-medium"
                        >
                            {visibleCount >= admins.length ? (
                                <>
                                    <FiChevronUp className="w-4 h-4" />
                                    <span>Show Less</span>
                                </>
                            ) : (
                                <>
                                    <FiChevronDown className="w-4 h-4" />
                                    <span>Show All ({admins.length} admins)</span>
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            )}

            {/* Summary Footer */}
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>
                        Showing {Math.min(visibleCount, admins.length)} of {admins.length} admin{admins.length !== 1 ? 's' : ''}
                    </span>
                    {admins.length > 0 && (
                        <span className="text-xs">
                            Last updated: {new Date().toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default AdminsTable;