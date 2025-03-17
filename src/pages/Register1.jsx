/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import { motion } from "framer-motion";
import PersonalInfoStep from "./register/PersonalInfoStep";
import AddressInfoStep from "./register/AddressInfoStep";
import EducationalBackgroundInfo from "./register/EducationalBackgroundInfo";
import EmploymentAddressStep from "./register/EmployeeAddressInfoStep";

import ReviewStep from "./register/ReviewStep";
import { useNavigate } from "react-router-dom";
import SkillsAndCertifications from "./register/SkillsAndCertifications";

const EmploymentInfoStep = ({ userData, handleChange, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div>
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
const EmploymentStatus = ({ userData, handleChange, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div>
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

const AccountInfoStep = ({ userData, handleChange, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div>
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <input type="text" name="email" placeholder="Email" onChange={handleChange} value={userData.email} className="w-full p-2 border rounded mb-1" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input type="password" name="password" placeholder="Create Password" onChange={handleChange} value={userData.password} className="w-full p-2 border rounded mb-1" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
    </motion.div>

);

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        //personal info
        alm_first_name: "",
        alm_last_name: "",
        alm_gender: "",
        alm_contact_number: "",
        //address
        add_full_address: "",
        add_long: "",
        add_lat: "",
        //education
        course_id: "",
        year_graduated: "",
        //is attending masters degree
        masters_type: "",
        masters_institution: "",
        //certifications
        cert_serial_no: "",
        cert_name: "",
        cert_awarded: "",
        cert_file: "",
        //employment status
        emp_status: "",
        //employment details
        company_name: "",
        job_title: "",
        start_date: "",
        //employment address
        emp_full_address: "",
        emp_long: "",
        emp_lat: "",
        //accounts
        email: "",
        password: "",

    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook for redirection

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true); // Show loading indicator
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register-alumni-dummy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const text = await response.text(); // Read response as text first

            try {
                const data = JSON.parse(text); // Attempt to parse JSON
                console.log("Server Response:", data);
                alert("Registration Successful!");

                navigate("/"); // Redirect after success
            } catch (err) {
                console.error("Unexpected response format:", text);
                alert("Unexpected response from server.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };


    const validateStep = () => {
        let newErrors = {};
        //registration
        if (step === 1) {
            if (!userData.alm_first_name) newErrors.alm_first_name = "First Name is required";
            if (!userData.alm_last_name) newErrors.alm_last_name = "Last Name is required";
            if (!userData.alm_gender) newErrors.alm_gender = "Gender is required";
            if (!userData.alm_contact_number) newErrors.alm_contact_number = "Contact Number is required";
        }
        //address info
        else if (step === 2) {
            if (!userData.add_full_address) newErrors.add_full_address = "Full Address is required";
            if (!userData.add_lat) newErrors.add_lat = "Latitude is required";
            if (!userData.add_long) newErrors.add_long = "Longitude is required";

        }
        //education
        else if (step === 3) {
            if (!userData.course_id) newErrors.course_id = "Program is Needed";
            if (!userData.year_graduated) newErrors.year_graduated = "Year Graduated is required";
        }
        //certifications
        else if (step === 4) {
            if (!userData.cert_serial_no) newErrors.cert_serial_no = "Certifcation Serial No is required";
            if (!userData.cert_name) newErrors.cert_name = "Certification Name is required";
            if (!userData.cert_awarded) newErrors.cert_awarded = "Certifcation Awarded Date is required";
            if (!userData.cert_file) newErrors.cert_file = "Certification File is required";
        }
        //employment status
        else if (step === 5) {
            if (!userData.emp_status) newErrors.emp_status = "Employment status is required";
        }
        else if (step === 6) {
            if (!userData.company_name) newErrors.company_name = "Company Name is required";
            if (!userData.job_title) newErrors.job_title = "Job title is required";
            if (!userData.start_date) newErrors.start_date = "Year Started is required";
        }

        //address info
        else if (step === 7) {
            if (!userData.emp_full_address) newErrors.emp_full_address = "Full Address is required";
            if (!userData.emp_lat) newErrors.emp_lat = "Latitude is required";
            if (!userData.emp_long) newErrors.emp_long = "Longitude is required";

        }
        //account info
        else if (step === 8) {
            if (!userData.email) newErrors.email = "Email is required";
            if (!userData.password) newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (!validateStep()) return;

        // Skip Steps 5 & 6 if user is Unemployed (0) or Freelance (1)
        if (step === 5 && (userData.emp_status === "0" || userData.emp_status === "1")) {
            setStep(8); // Jump directly to AccountInfoStep
        } else {
            setStep(step + 1);
        }
    };


    const prevStep = () => {
        if (step === 8 && (userData.emp_status === "0" || userData.emp_status === "1")) {
            setStep(5); // Jump back to Step 4 if employment was skipped
        } else {
            setStep(step - 1);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
                {/* <ProgressBar step={step} /> */}

                {step === 1 && <PersonalInfoStep userData={userData} handleChange={handleChange} errors={errors} />}
                {step === 2 && <AddressInfoStep userData={userData} setUserData={setUserData}
                    handleChange={handleChange} errors={errors} />}
                {step === 3 && <EducationalBackgroundInfo userData={userData} handleChange={handleChange} errors={errors} />}
                {step === 4 && <SkillsAndCertifications userData={userData} handleChange={handleChange} errors={errors} />}

                {step === 5 && <EmploymentStatus userData={userData} handleChange={handleChange} errors={errors} />}
                {step === 6 && <EmploymentInfoStep userData={userData} handleChange={handleChange} errors={errors} />}
                {step === 7 && <EmploymentAddressStep userData={userData} setUserData={setUserData} handleChange={handleChange} errors={errors} />}
                {step === 8 && <AccountInfoStep userData={userData} handleChange={handleChange} errors={errors} />}
                {step === 9 && <ReviewStep userData={userData} />}

                <div className="flex justify-between mt-4">
                    {step > 1 && (
                        <button onClick={prevStep} className="px-4 py-2 bg-gray-400 text-white rounded">
                            Back
                        </button>
                    )}

                    {step < 9 ? (
                        <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
                            disabled={loading}
                        >
                            {loading && <span className="loader mr-2"></span>}
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    )}
                </div>
            </div>
        </div>

    );
};

export default MultiStepForm;
