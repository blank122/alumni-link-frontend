/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import ProgressBar from "../user/Components/ProgressBar";

const courseNames = {
    1: "Bachelor of Science in Information Technology",
    2: "Bachelor of Science in Computer Science",
    3: "Bachelor of Science in Information Systems",
    4: "Bachelor of Library and Information Science",
    5: "Bachelor of Science in Entertainment and Multimedia Computing - Digital Animation",
    6: "Bachelor of Science in Entertainment and Multimedia Computing - Game Development",
    7: "Bachelor of Arts in Multimedia Arts"
};

const employmentData = {
    0: "Unemployed",
    1: "Freelance",
    2: "Employed",
};


const technicalSkills =
{
    1: "Programming & Software Development",
    2: "Database Management & Information Systems",
    3: "Web & Mobile Development ",
    4: "Networking & Cybersecurity",
    5: "Cloud Computing & DevOps",
    6: "Data Science & AI",
    7: "Software Engineering & SDLC",
    8: "Game Development & Animation",
    9: "Multimedia & Digital Content Creation",
    10: "Human-Computer Interaction (HCI) & UI/UX",
    11: "E-Learning & EdTech",
    12: "Information Retrieval & Digital Libraries",
    13: "Business & Enterprise Computing",
    14: "Game AI & Physics Simulation",
    15: "Augmented & Virtual Reality (AR/VR)",
}

const softSkills =
{
    1: "Problem-Solving",
    2: "Critical Thinking",
    3: "Communication Skills ",
    4: "Collaboration & Teamwork",
    5: "Adaptability & Flexibility",
    6: "Time Management",
    7: "Creativity & Innovation",
    8: "Attention to Detail",
    9: "Emotional Intelligence (EQ)",
    10: "Ethical & Professional Responsibility",
}



const ReviewStep = ({ userData, currentStepIndex, totalSteps }) => (
    <motion.div
        className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg w-full max-w-4xl mx-auto border border-gray-100 max-h-[80vh] overflow-y-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
    >
        <div className="w-full max-w-3xl">
            <ProgressBar currentStepIndex={currentStepIndex} totalSteps={totalSteps} />
        </div>
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Review Your Information
            </h2>
            <p className="text-gray-500">Please verify all details before submission</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
                {/* Personal Details */}
                <div className="p-5 rounded-xl">
                    <div className="flex items-center mb-3">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700">Personal Details</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Full Name</p>
                            <p className="text-gray-800 font-medium">{userData.alm_first_name} {userData.alm_last_name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Email Address</p>
                            <p className="text-gray-800 font-medium">{userData.email}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Gender</p>
                                <p className="text-gray-800 font-medium">{userData.alm_gender}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Contact Number</p>
                                <p className="text-gray-800 font-medium">{userData.alm_contact_number}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="p-5 rounded-xl">
                    <div className="flex items-center mb-3">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700">Address</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Full Address</p>
                            <p className="text-gray-800 font-medium">{userData.add_full_address}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Coordinates</p>
                            <p className="text-gray-800 font-mono text-sm bg-gray-100 p-2 rounded">{userData.add_lat}, {userData.add_long}</p>
                        </div>
                    </div>
                </div>
                {/* Skills */}

                <div className="p-5 rounded-xl">
                    <div className="flex items-center mb-3">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                            </svg>

                        </div>
                        <p className="text-sm text-gray-500 font-medium">Technical Skills</p>
                    </div>
                    <div className="space-y-3">
                        {userData.technical_skills_logs.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-800">
                                {userData.technical_skills_logs.map((skill, index) => (
                                    <li key={index}>
                                        {technicalSkills[skill] || "Unknown Skill"}
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-gray-800 font-medium">N/A</p>}
                    </div>
                    <div className="flex items-center mb-3">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-5-4m-6 6v-2a4 4 0 00-5-4H2v2a4 4 0 004 4h6zM9 10a4 4 0 110-8 4 4 0 010 8zm6 4a4 4 0 100-8 4 4 0 000 8z" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Soft Skills</p>
                    </div>
                    <div className="space-y-3">
                        {userData.soft_skills_logs.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-800">
                                {userData.soft_skills_logs.map((skill, index) => (
                                    <li key={index}>
                                        {softSkills[skill] || "Unknown Skill"}
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-sm text-gray-500 font-medium">N/A</p>}
                    </div>
                </div>

            </div>

            {/* Right Column */}
            <div className="space-y-6">
                {/* Education */}
                <div className="p-5 rounded-xl">
                    <div className="flex items-center mb-3">
                        <div className="bg-purple-100 p-2 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700">Education</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Degree Program</p>
                            <p className="text-gray-800 font-medium">{courseNames[userData.course_id] || userData.course_id}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Year Graduated</p>
                                <p className="text-gray-800 font-medium">{userData.year_graduated}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Masters Degree</p>
                                <p className="text-gray-800 font-medium">{userData.masters_type || "N/A"}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Institution</p>
                            <p className="text-gray-800 font-medium">{userData.masters_institution || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Employment */}
                <div className="p-5 rounded-xl">
                    <div className="flex items-center mb-3">
                        <div className="bg-amber-100 p-2 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700">Employment</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Employment Status</p>
                            <p className="text-gray-800 font-medium">{employmentData[userData.emp_status] || userData.emp_status}</p>
                        </div>
                        {userData.emp_status == 2 && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Company</p>
                                        <p className="text-gray-800 font-medium">{userData.company_name || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Job Title</p>
                                        <p className="text-gray-800 font-medium">{userData.job_title || "N/A"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Start Date</p>
                                    <p className="text-gray-800 font-medium">{userData.start_date || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Company Address</p>
                                    <p className="text-gray-800 font-medium">{userData.emp_full_address || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Coordinates</p>
                                    <p className="text-gray-800 font-mono text-sm bg-gray-100 p-2 rounded">{userData.emp_lat || "N/A"}, {userData.emp_long || "N/A"}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Certificates and Skills */}
                <div className="p-5 rounded-xl">
                    <div className="flex items-center mb-3">
                        <div className="bg-sky-100 p-2 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700">Certificates & Skills</h3>
                    </div>

                    <div className="space-y-3">
                        {/* Certificate */}
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Certificate Serial No.</p>
                            <p className="text-gray-800 font-medium">{userData.cert_serial_no || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Certificate Name</p>
                            <p className="text-gray-800 font-medium">{userData.cert_name || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Awarded Date</p>
                            <p className="text-gray-800 font-medium">{userData.cert_awarded || "N/A"}</p>
                        </div>
                        {/* <div>
                            <p className="text-sm text-gray-500 font-medium">Certificate File</p>
                            <p className="text-gray-800 font-medium">{userData.cert_file ? (
                                <a href={userData.cert_file} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                                    View Certificate
                                </a>
                            ) : "N/A"}</p>
                        </div> */}


                    </div>
                </div>

            </div>
        </div>
    </motion.div>
);

export default ReviewStep;