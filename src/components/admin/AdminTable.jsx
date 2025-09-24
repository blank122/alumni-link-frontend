import { useState } from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";

const AdminsTable = ({ admins }) => {
    const [visibleCount, setVisibleCount] = useState(5); // show first 5 by default

    const handleToggle = () => {
        if (visibleCount >= admins.length) {
            // currently showing all, collapse to 5
            setVisibleCount(5);
        } else {
            // currently showing 5, expand to all
            setVisibleCount(admins.length);
        }
    };

    const visibleAdmins = admins.slice(0, visibleCount);

    return (
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
                        visibleAdmins.map((admin, index) => (
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

            {/* Toggle See More / See Less Button */}
            {admins.length > 5 && (
                <div className="px-6 py-4 text-center">
                    <button
                        onClick={handleToggle}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        {visibleCount >= admins.length ? "See Less" : "See More"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminsTable;
