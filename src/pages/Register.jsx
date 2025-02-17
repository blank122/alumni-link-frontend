/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import { motion } from "framer-motion";

// 📌 Progress Bar Component
const ProgressBar = ({ step }) => {
    const progress = (step / 3) * 100; // 3 Steps → Convert to %
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
// 📌 Step 1: Personal Information
const PersonalInfoStep = ({ userData, handleChange, nextStep }) => (
    <div className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={userData.name}
            className="w-full p-2 border rounded mb-3"
        />
        <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={userData.email}
            className="w-full p-2 border rounded mb-3"
        />
        <button onClick={nextStep} className="w-full bg-blue-500 text-white py-2 rounded">
            Next
        </button>
    </div>
);

// 📌 Step 2: Address Information
const AddressInfoStep = ({ userData, handleChange, nextStep, prevStep }) => (
    <div className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Address Information</h2>
        <input
            type="text"
            name="address"
            placeholder="Street Address"
            onChange={handleChange}
            value={userData.address}
            className="w-full p-2 border rounded mb-3"
        />
        <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={userData.city}
            className="w-full p-2 border rounded mb-3"
        />
        <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
                Back
            </button>
            <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
                Next
            </button>
        </div>
    </div>
);

// 📌 Step 3: Account Information
const AccountInfoStep = ({ userData, handleChange, prevStep, handleSubmit }) => (
    <div className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <input
            type="password"
            name="password"
            placeholder="Create Password"
            onChange={handleChange}
            value={userData.password}
            className="w-full p-2 border rounded mb-3"
        />
        <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">
                Back
            </button>
            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
                Submit
            </button>
        </div>
    </div>
);

// 📌 Multi-Step Form Component
const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        password: "",
    });

    // 📌 Handles form input changes
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // 📌 Navigation Functions
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // 📌 Submit Data to Backend
    const handleSubmit = async () => {
        try {
            const response = await fetch("https://your-api-url.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            alert("Registration Successful!");
            console.log("Server Response:", data);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
                <ProgressBar step={step} />
                {step === 1 && <PersonalInfoStep userData={userData} handleChange={handleChange} nextStep={nextStep} />}
                {step === 2 && <AddressInfoStep userData={userData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
                {step === 3 && <AccountInfoStep userData={userData} handleChange={handleChange} prevStep={prevStep} handleSubmit={handleSubmit} />}
            </div>
        </div>

    );
};

export default MultiStepForm;
