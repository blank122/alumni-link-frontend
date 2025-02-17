/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layouts/Navbar";

const ProgressBar = ({ step }) => {
    const progress = (step / 4) * 100;
    return (
        <div className="w-96 mx-auto mb-4">
            <div className="h-2 bg-gray-300 rounded-full">
                <motion.div
                    className="h-2 bg-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
    );
};

const PersonalInfoStep = ({ userData, handleChange, nextStep, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} value={userData.name} className="w-full p-2 border rounded mb-1" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={userData.email} className="w-full p-2 border rounded mb-1" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <button onClick={nextStep} className="w-full py-2 bg-blue-500 text-white rounded mt-4">Next</button>
    </motion.div>
);

const AddressInfoStep = ({ userData, handleChange, nextStep, prevStep, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-xl font-semibold mb-4">Address Information</h2>
        <input type="text" name="address" placeholder="Street Address" onChange={handleChange} value={userData.address} className="w-full p-2 border rounded mb-1" />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        <input type="text" name="city" placeholder="City" onChange={handleChange} value={userData.city} className="w-full p-2 border rounded mb-1" />
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">Back</button>
            <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
    </motion.div>
);

const AccountInfoStep = ({ userData, handleChange, nextStep, prevStep, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <input type="password" name="password" placeholder="Create Password" onChange={handleChange} value={userData.password} className="w-full p-2 border rounded mb-1" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">Back</button>
            <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
    </motion.div>
);

const ReviewStep = ({ userData, prevStep, handleSubmit }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Address:</strong> {userData.address}</p>
        <p><strong>City:</strong> {userData.city}</p>
        <p><strong>Password:</strong> **** (hidden for security)</p>

        <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">Edit</button>
            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
        </div>
    </motion.div>
);

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({ name: "", email: "", address: "", city: "", password: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateStep = () => {
        let newErrors = {};
        if (step === 1 && !userData.name) newErrors.name = "Full Name is required";
        if (step === 1 && !userData.email) newErrors.email = "Email is required";
        if (step === 2 && !userData.address) newErrors.address = "Address is required";
        if (step === 2 && !userData.city) newErrors.city = "City is required";
        if (step === 3 && !userData.password) newErrors.password = "Password is required";
        return newErrors;
    };

    const nextStep = () => {
        const validationErrors = validateStep();
        if (Object.keys(validationErrors).length > 0) setErrors(validationErrors);
        else setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = async () => {
        // try {
        //     const response = await fetch("https://your-api-url.com/register", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(userData),
        //     });

        //     const data = await response.json();
        //     alert("Registration Successful!");
        //     console.log("Server Response:", data);
        // } catch (error) {
        //     console.error("Error submitting form:", error);
        //     alert("Something went wrong!");
        // }
        console.log('submitted on work');
        alert("Submittion on working pa dols");

    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
                <ProgressBar step={step} />
                {step === 1 && <PersonalInfoStep userData={userData} handleChange={handleChange} nextStep={nextStep} errors={errors} />}
                {step === 2 && <AddressInfoStep userData={userData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={errors} />}
                {step === 3 && <AccountInfoStep userData={userData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={errors} />}
                {step === 4 && <ReviewStep userData={userData} prevStep={prevStep} handleSubmit={handleSubmit} />}
            </div>
        </div>

    );
};

export default MultiStepForm;
