/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/layouts/Navbar";
import PersonalInfoStep from "./register/PersonalInfoStep";
import AddressInfoStep from "./register/AddressInfoStep";
import EducationalBackgroundInfo from "./register/EducationalBackgroundInfo";
import EmploymentAddressStep from "./register/EmployeeAddressInfoStep";
import EmploymentStatus from "./register/EmployeementStatus";
import EmploymentInfoStep from "./register/EmploymentInfoStep";

import ReviewStep from "./register/ReviewStep";
import { useNavigate } from "react-router-dom";
import SkillsAndCertifications from "./register/SkillsAndCertifications";

const MultiStepForm = () => {

    const addTechnicalSkill = (skill) => {
        if (skill && !userData.technical_skills_logs.includes(skill)) {
            setUserData({
                ...userData,
                technical_skills_logs: [...userData.technical_skills_logs, skill],
            });
        }
    };

    const removeTechnicalSkill = (skill) => {
        setUserData({
            ...userData,
            technical_skills_logs: userData.technical_skills_logs.filter(s => s !== skill),
        });
    };

    const addSoftSkill = (skill) => {
        if (skill && !userData.soft_skills_logs.includes(skill)) {
            setUserData({
                ...userData,
                soft_skills_logs: [...userData.soft_skills_logs, skill],
            });
        }
    };

    const removeSoftSkill = (skill) => {
        setUserData({
            ...userData,
            soft_skills_logs: userData.soft_skills_logs.filter(s => s !== skill),
        });
    };


    const [softSkills, setSoftSkills] = useState([]);
    const [loadingSoft, setLoadingSoftSkills] = useState(true);
    const [techSkills, setTechSkills] = useState([]);
    const [loadingTech, setLoadingTechSkills] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/soft-skills", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                setSoftSkills(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching soft skills:", error);
            } finally {
                setLoadingSoftSkills(false);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/technical-skills", {
                    headers: {
                        Accept: "application/json",

                    },
                });
                setTechSkills(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching technical skills:", error);
            } finally {
                setLoadingTechSkills(false);
            }
        };
        fetchData();
    }, []);


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
        //technical skills logs
        technical_skills_logs: [], // Store selected skills
        soft_skills_logs: [], // Store selected skills

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
        const { name, type } = e.target;

        if (type === "file") {
            setUserData({ ...userData, [name]: e.target.files[0] });
        } else {
            setUserData({ ...userData, [name]: e.target.value });
        }
    };


    const handleSubmit = async () => {
        setLoading(true); // Show loading indicator

        try {
            const formData = new FormData();

            Object.entries(userData).forEach(([key, value]) => {
                // Ensure technical_skills_logs and soft_skills_logs are arrays
                if (key === "technical_skills_logs" || key === "soft_skills_logs") {
                    if (Array.isArray(value)) {
                        value.forEach((item) => formData.append(`${key}[]`, item)); // Append each value in the array
                    } else if (typeof value === "string") {
                        value.split(",").forEach((item) => formData.append(`${key}[]`, item.trim()));
                    }
                } else {
                    formData.append(key, value);
                }
            });

            // Log properly formatted data
            const jsonObject = {};
            formData.forEach((value, key) => {
                if (jsonObject[key]) {
                    jsonObject[key] = [].concat(jsonObject[key], value); // Convert to an array
                } else {
                    jsonObject[key] = value;
                }
            });

            console.log("Data to be sent to the server:", JSON.stringify(jsonObject, null, 2));

            const response = await fetch("http://127.0.0.1:8000/api/register-alumni-dummy", {
                method: "POST",
                headers: {
                    "Accept": "application/json", // Ensure Laravel accepts JSON responses
                },
                body: formData, // Send FormData
            });

            const text = await response.text(); // Read response as text first
            try {
                const data = JSON.parse(text);
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
            setLoading(false);
        }
    };




    const validateStep = () => {
        let newErrors = {};
        const phoneRegex = /^(09|\+639)\d{9}$/;

        //registration
        if (step === 1) {
            if (!userData.alm_first_name) newErrors.alm_first_name = "First Name is required";
            if (!userData.alm_last_name) newErrors.alm_last_name = "Last Name is required";
            if (!userData.alm_gender) newErrors.alm_gender = "Gender is required";
            if (!userData.alm_contact_number) newErrors.alm_contact_number = "Contact Number is required";
            if (!phoneRegex.test(userData.alm_contact_number)) {
                newErrors.alm_contact_number = "Contact Number is not a valid Philippines mobile number format";
            }
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
                {step === 4 && <SkillsAndCertifications userData={userData}
                    handleChange={handleChange}
                    techSkills={techSkills}
                    addTechnicalSkill={addTechnicalSkill}
                    removeTechnicalSkill={removeTechnicalSkill}
                    loadingTech={loadingTech}

                    softSkills={softSkills}
                    addSoftSkill={addSoftSkill}
                    removeSoftSkill={removeSoftSkill}
                    loadingSoft={loadingSoft}
                    errors={errors} />}

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
