import { motion } from "framer-motion";
import ProgressBar from "../user/Components/ProgressBar";

const EmploymentInfoStep = ({ userData, handleChange, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div>
            <div className="w-full max-w-3xl">
                <ProgressBar currentStepIndex={currentStepIndex} totalSteps={totalSteps} />
            </div>
            <h2 className="text-xl font-semibold mb-4">Employment Information</h2>
            <input type="text" name="company_name" placeholder="Company Name" onChange={handleChange} value={userData.company_name} className="w-full p-2 border rounded mb-1" />
            {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name}</p>}

            <input type="text" name="job_title" placeholder="Job Title" onChange={handleChange} value={userData.job_title} className="w-full p-2 border rounded mb-1" />
            {errors.job_title && <p className="text-red-500 text-sm">{errors.job_title}</p>}


            <input type="date" name="start_date" placeholder="Start Date" onChange={handleChange} value={userData.start_date} className="w-full p-2 border rounded mb-1" />
            {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date}</p>}
        </div>
    </motion.div>

);

export default EmploymentInfoStep;
