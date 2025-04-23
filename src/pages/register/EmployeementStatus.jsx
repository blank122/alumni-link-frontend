import { motion } from "framer-motion";
import ProgressBar from "../user/Components/ProgressBar";

const EmploymentStatus = ({ userData, handleChange, errors }) => (
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
            <h2 className="text-xl font-semibold mb-4">Employment Status</h2>

            {/* might add a function that detects the value of the employment status if it is less than 2 (which is employed the user will go to the review phase to check his form submittions) */}
            <select name="emp_status" onChange={handleChange} value={userData.emp_status} className="w-full p-2 border rounded mb-1">
                <option value="">Employment Status</option>
                <option value="0">Unemployed</option>
                <option value="1">Freelance</option>
                <option value="2">Employed</option>
            </select>
            {errors.emp_status && <p className="text-red-500 text-sm">{errors.emp_status}</p>}
        </div>
    </motion.div>

);

export default EmploymentStatus;

