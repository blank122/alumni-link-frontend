/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import ProgressBar from "../user/Components/ProgressBar";

const AccountInfoStep = ({ userData, handleChange, errors, currentStepIndex, totalSteps }) => {
    // Strong password regex:
    // - At least 8 characters
    // - At least one uppercase
    // - At least one lowercase
    // - At least one number
    // - At least one special character

    return (
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
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>

                {/* Email */}
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={userData.email}
                    className="w-full p-2 border rounded mb-1"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                {/* Password */}
                <input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    onChange={handleChange}
                    value={userData.password}
                    className="w-full p-2 border rounded mb-1"
                />
        
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
        </motion.div>
    );
};

export default AccountInfoStep;
