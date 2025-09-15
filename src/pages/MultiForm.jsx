/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import PersonalInfoStep from "./register/PersonalInfoStep";
import AddressInfoStep from "./register/AddressInfoStep";
import EducationalBackgroundInfo from "./register/EducationalBackgroundInfo";
import EmploymentAddressStep from "./register/EmployeeAddressInfoStep";
import EmploymentStatus from "./register/EmployeementStatus";
import EmploymentInfoStep from "./register/EmploymentInfoStep";
import AccountInfoStep from "./register/AccountInfoStep";
import ReviewStep from "./register/ReviewStep";
import { useNavigate } from "react-router-dom";
import SkillsAndCertifications from "./register/SkillsAndCertifications";
import DataPrivacyModal from "../components/DataPrivacy";
import BasicInfoStep from "./register/BasicInfoStep";
import EducationAndSkillsStep from "./register/EducationAndSkillsStep";

const MultiForm = () => {
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
        alm_id: "", //pwede alumni id or student id
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
        //technical skills logs
        technical_skills_logs: [], // Store selected skills
        soft_skills_logs: [], // Store selected skills
        custom_tech_skills: [],
        custom_soft_skills: [],

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
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [hasAgreedToPrivacy, setHasAgreedToPrivacy] = useState(false);

    const handleChange = (e) => {
        const { name, type } = e.target;

        if (type === "file") {
            setUserData({ ...userData, [name]: e.target.files[0] });
        } else {
            setUserData({ ...userData, [name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();

            // Handle all regular fields including array fields
            Object.entries(userData).forEach(([key, value]) => {
                // Handle array fields (technical_skills_logs and soft_skills_logs)
                if (key === "technical_skills_logs" || key === "soft_skills_logs") {
                    if (Array.isArray(value)) {
                        value.forEach((item) => formData.append(`${key}[]`, item));
                    } else if (value) { // Handle case where it might be a single value
                        formData.append(`${key}[]`, value);
                    }
                }
                // Handle file uploads
                else if (key === "cert_file" && value instanceof File) {
                    formData.append(key, value);
                }
                // Skip custom skills here - we'll handle them separately
                else if (key !== "custom_tech_skills" && key !== "custom_soft_skills") {
                    formData.append(key, value);
                }
            });

            // Handle custom skills by converting them to JSON strings
            if (userData.custom_tech_skills?.length > 0) {
                formData.append('custom_tech_skills', JSON.stringify(userData.custom_tech_skills));
            }
            if (userData.custom_soft_skills?.length > 0) {
                formData.append('custom_soft_skills', JSON.stringify(userData.custom_soft_skills));
            }

            // Log properly formatted data for debugging
            const logData = {
                ...userData,
                cert_file: userData.cert_file?.name || 'No file',
                custom_tech_skills: userData.custom_tech_skills,
                custom_soft_skills: userData.custom_soft_skills
            };
            console.log("Data to be sent to the server:", logData);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register-alumni-dummy`
                , {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                    },
                    body: formData,
                });

            const text = await response.text();
            try {
                const data = JSON.parse(text);
                console.log("Server Response:", data);
                navigate('/')
                alert("Registration Successful!");
            } catch (err) {
                console.error("Unexpected response format:", text);
                alert("Unexpected response from server.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const validateStep = () => {
        let newErrors = {};
        const phoneRegex = /^(09|\+639)\d{9}$/;
        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        //registration
        if (step === 1) {
            if (!userData.alm_first_name) newErrors.alm_first_name = "First Name is required";
            if (!userData.alm_last_name) newErrors.alm_last_name = "Last Name is required";
            if (!userData.alm_gender) newErrors.alm_gender = "Gender is required";
            if (!userData.alm_contact_number) newErrors.alm_contact_number = "Contact Number is required";
            if (!phoneRegex.test(userData.alm_contact_number)) {
                newErrors.alm_contact_number = "Contact Number is not a valid Philippines mobile number format";
            }
            if (!userData.add_full_address) newErrors.add_full_address = "Full Address is required";
            if (!userData.add_lat) newErrors.add_lat = "Latitude is required";
            if (!userData.add_long) newErrors.add_long = "Longitude is required";
        }

        //education
        else if (step === 2) {
            if (!userData.alm_id) newErrors.alm_id = "Alumni ID or Student ID needed";
            if (!userData.course_id) newErrors.course_id = "Program is Needed";
            if (!userData.year_graduated) newErrors.year_graduated = "Year Graduated is required";
            if (!userData.cert_serial_no) newErrors.cert_serial_no = "Certifcation Serial No is required";
            if (!userData.cert_name) newErrors.cert_name = "Certification Name is required";
            if (!userData.cert_awarded) newErrors.cert_awarded = "Certifcation Awarded Date is required";
            if (!userData.cert_file) newErrors.cert_file = "Certification File is required";
        }

        //employment status
        else if (step === 3) {
            if (!userData.emp_status) newErrors.emp_status = "Employment status is required";
            if (!userData.company_name) newErrors.company_name = "Company Name is required";
            if (!userData.job_title) newErrors.job_title = "Job title is required";
            if (!userData.start_date) newErrors.start_date = "Year Started is required";
            if (!userData.emp_full_address) newErrors.emp_full_address = "Full Address is required";
            if (!userData.emp_lat) newErrors.emp_lat = "Latitude is required";
            if (!userData.emp_long) newErrors.emp_long = "Longitude is required";
        }
        //account info
        else if (step === 4) {
            if (!userData.email) newErrors.email = "Email is required";
            if (!userData.password) newErrors.password = "Password is required";
            else if (!strongPasswordRegex.test(userData.password)) {
                newErrors.password =
                    "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
            }
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

    const getVisibleSteps = () => {
        const commonSteps = [1, 2, 3, 4];
        const employedSteps = [5, 6, 7];
        const finalSteps = [8, 9];
        if (userData.emp_status === "0" || userData.emp_status === "1") {
            return [...commonSteps, ...finalSteps];
        }
        return [...commonSteps, ...employedSteps, ...finalSteps];
    };

    const visibleSteps = getVisibleSteps();
    const currentStepIndex = visibleSteps.indexOf(step) + 1;
    const totalSteps = visibleSteps.length;
    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-100">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

                    {step === 1 && <BasicInfoStep userData={userData} handleChange={handleChange} errors={errors}
                        currentStepIndex={currentStepIndex} totalSteps={totalSteps} setUserData={setUserData} />}
                    {step === 2 && <EducationAndSkillsStep userData={userData} setUserData={setUserData}
                        handleChange={handleChange} errors={errors}
                        currentStepIndex={currentStepIndex} totalSteps={totalSteps}
                        onSkillsUpdate={(field, value) => {
                            setUserData(prev => ({
                                ...prev,
                                [field]: value
                            }));
                        }} />}
                    {step === 3 && <EducationalBackgroundInfo userData={userData}
                        handleChange={handleChange} errors={errors}
                        currentStepIndex={currentStepIndex} totalSteps={totalSteps}
                    />}
                    {step === 4 && <SkillsAndCertifications
                        userData={userData}
                        handleChange={handleChange}
                        errors={errors}
                        currentStepIndex={currentStepIndex}
                        totalSteps={totalSteps}
                        onSkillsUpdate={(field, value) => {
                            setUserData(prev => ({
                                ...prev,
                                [field]: value
                            }));
                        }}
                    />}
                    {step === 5 && <EmploymentStatus userData={userData} handleChange={handleChange} errors={errors}
                        currentStepIndex={currentStepIndex} totalSteps={totalSteps} />}
                    {step === 6 && <EmploymentInfoStep userData={userData} handleChange={handleChange} errors={errors}
                        currentStepIndex={currentStepIndex} totalSteps={totalSteps} />}
                    {step === 7 && <EmploymentAddressStep userData={userData} setUserData={setUserData} handleChange={handleChange} errors={errors}
                        currentStepIndex={currentStepIndex} totalSteps={totalSteps} />}
                    {step === 8 && <AccountInfoStep userData={userData} handleChange={handleChange} errors={errors}
                        currentStepIndex={currentStepIndex} totalSteps={totalSteps} />}
                    {step === 9 && <ReviewStep userData={userData}
                        currentStepIndex={currentStepIndex} totalSteps={totalSteps} />}
                    <div className="flex justify-between mt-6 w-full">
                        {/* Back Button (invisible on step 1 instead of disappearing) */}
                        {step > 1 ? (
                            <button
                                onClick={prevStep}
                                className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition"
                            >
                                Back
                            </button>
                        ) : (
                            <div className="px-6 py-2 invisible">Back</div>
                        )}

                        {/* Next or Submit Button */}
                        {step < 9 ? (
                            <button
                                onClick={nextStep}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    if (hasAgreedToPrivacy) {
                                        handleSubmit();
                                    } else {
                                        alert("You must agree to the Data Privacy Policy before submitting.");
                                        setShowPrivacyModal(true);
                                    }
                                }}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 flex items-center transition"
                                disabled={loading}
                            >
                                {loading && <span className="loader mr-2"></span>}
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiForm;
