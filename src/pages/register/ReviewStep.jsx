/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const ReviewStep = ({ userData }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-xl w-[420px] mx-auto border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
    >
        <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
            Review Your Information
        </h2>

        <div className="space-y-5">
            {/* Personal Details */}
            <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Personal Details</h3>
                <p className="text-gray-600"><strong>Name:</strong> <span className="text-gray-800">{userData.alm_first_name} {userData.alm_last_name}</span></p>
                <p className="text-gray-600"><strong>Email:</strong> <span className="text-gray-800">{userData.email}</span></p>
                <p className="text-gray-600"><strong>Gender:</strong> <span className="text-gray-800">{userData.alm_gender}</span></p>
                <p className="text-gray-600"><strong>Contact:</strong> <span className="text-gray-800">{userData.alm_contact_number}</span></p>
            </div>

            {/* Address */}
            <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Address</h3>
                <p className="text-gray-600"><strong>Full Address:</strong> <span className="text-gray-800">{userData.add_full_address}</span></p>
                <p className="text-gray-600"><strong>Coordinates:</strong> <span className="text-gray-800">{userData.add_lat}, {userData.add_long}</span></p>
            </div>

            {/* Education */}
            <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Education</h3>
                <p className="text-gray-600"><strong>Highest Level:</strong> <span className="text-gray-800">{userData.educ_highest_level}</span></p>
                <p className="text-gray-600"><strong>Year Graduated:</strong> <span className="text-gray-800">{userData.year_graduated}</span></p>
                <p className="text-gray-600"><strong>Masters Degree:</strong> <span className="text-gray-800">{userData.masters_type || "N/A"}</span></p>
                <p className="text-gray-600"><strong>School Taken:</strong> <span className="text-gray-800">{userData.masters_institution || "N/A"}</span></p>
            </div>

            {/* Employment */}
            <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Employment</h3>
                <p className="text-gray-600"><strong>Status:</strong> <span className="text-gray-800">{userData.emp_status}</span></p>
                <p className="text-gray-600"><strong>Company:</strong> <span className="text-gray-800">{userData.company_name}</span></p>
                <p className="text-gray-600"><strong>Job Title:</strong> <span className="text-gray-800">{userData.job_title}</span></p>
                <p className="text-gray-600"><strong>Start Date:</strong> <span className="text-gray-800">{userData.start_date}</span></p>
                <p className="text-gray-600"><strong>Company Address:</strong> <span className="text-gray-800">{userData.emp_full_address}</span></p>
                <p className="text-gray-600"><strong>Coordinates:</strong> <span className="text-gray-800">{userData.emp_lat}, {userData.emp_long}</span></p>
            </div>
        </div>


    </motion.div>
);

export default ReviewStep;
