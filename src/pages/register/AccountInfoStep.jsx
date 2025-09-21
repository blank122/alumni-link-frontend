/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import ProgressHeader from "../../components/ProgressHeader";

const AccountInfoStep = ({ userData, handleChange, errors, currentStepIndex, totalSteps }) => {
    // Strong password regex:
    // - At least 8 characters
    // - At least one uppercase
    // - At least one lowercase
    // - At least one number
    // - At least one special character
    // Validation checks
    const validations = {
        length: userData.password?.length >= 8,
        uppercase: /[A-Z]/.test(userData.password || ""),
        lowercase: /[a-z]/.test(userData.password || ""),
        number: /[0-9]/.test(userData.password || ""),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(userData.password || ""),
    };
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <ProgressHeader
                    currentStepIndex={currentStepIndex}
                    totalSteps={totalSteps}
                    title="Account Information"
                />

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
                {/* Password Guide */}
                <div className="mt-2 text-sm">
                    <p className="font-medium">Password must contain:</p>
                    <ul className="list-disc pl-5">
                        <li className={validations.length ? "text-green-600" : "text-gray-600"}>
                            At least 8 characters
                        </li>
                        <li className={validations.uppercase ? "text-green-600" : "text-gray-600"}>
                            At least one uppercase letter
                        </li>
                        <li className={validations.lowercase ? "text-green-600" : "text-gray-600"}>
                            At least one lowercase letter
                        </li>
                        <li className={validations.number ? "text-green-600" : "text-gray-600"}>
                            At least one number
                        </li>
                        <li className={validations.special ? "text-green-600" : "text-gray-600"}>
                            At least one special character
                        </li>
                    </ul>
                </div>
            </div>


        </motion.div>
    );
};

export default AccountInfoStep;
