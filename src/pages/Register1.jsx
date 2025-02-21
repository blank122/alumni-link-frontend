/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import { motion } from "framer-motion";
import PersonalInfoStep from "./register/PersonalInfoStep";
import AddressInfoStep from "./register/AddressInfoStep";
import EducationalBackgroundInfo from "./register/EducationalBackgroundInfo";
import EmploymentAddressStep from "./register/EmployeeAddressInfoStep";


// const ProgressBar = ({ step }) => {
//     const progress = (step / 4) * 100;
//     return (
//         <div className="w-96 mx-auto mb-4">
//             <div className="h-2 bg-gray-300 rounded-full">
//                 <motion.div
//                     className="h-2 bg-blue-500 rounded-full"
//                     initial={{ width: 0 }}
//                     animate={{ width: `${progress}%` }}
//                     transition={{ duration: 0.5 }}
//                 />
//             </div>
//         </div>
//     );
// };

//checks first if for employment status
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

const ReviewStep = ({ userData }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div>
            <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
            <p><strong>Name:</strong> {userData.alm_first_name} {userData.alm_last_name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Gender:</strong> {userData.alm_gender}</p>
            <p><strong>Contact:</strong> {userData.alm_contact_number}</p>
            <p><strong>Address:</strong> {userData.add_full_address}</p>
            <p><strong>Address Latitude:</strong> {userData.add_lat}</p>
            <p><strong>Address Longitude:</strong> {userData.add_long}</p>
            <p><strong>Education:</strong> {userData.educ_highest_level}</p>
            <p><strong>Year Graduated:</strong> {userData.year_graduated}</p>

            <p><strong>Masters Degree:</strong> {userData.masters_type}</p>
            <p><strong>School Taken:</strong> {userData.masters_institution}</p>

            <p><strong>Employment Status:</strong> {userData.emp_status}</p>
            <p><strong>Company Name:</strong> {userData.company_name}</p>
            <p><strong>Job Title:</strong> {userData.job_title}</p>
            <p><strong>Start Date:</strong> {userData.start_date}</p>
            <p><strong>Company Address:</strong> {userData.emp_full_address}</p>
            <p><strong>Compay Address Latitude:</strong> {userData.emp_lat}</p>
            <p><strong>Company Address Longitude:</strong> {userData.emp_long}</p>
            <p><strong>Password:</strong> **** (hidden for security)</p>
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
        educ_highest_level: "",
        year_graduated: "",
        //is attending masters degree
        masters_type: "",
        masters_institution: "",
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

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register-alumni-dummy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            alert("Registration Successful!");
            console.log("Server Response:", data);

            // Reset form after successful registration
            setUserData({
                alm_first_name: "",
                alm_last_name: "",
                alm_gender: "",
                alm_contact_number: "",
                add_full_address: "",
                add_long: "",
                add_lat: "",
                educ_highest_level: "",
                year_graduated: "",
                masters_type: "",
                masters_institution: "",
                emp_status: "",
                company_name: "",
                job_title: "",
                start_date: "",
                emp_full_address: "",
                emp_long: "",
                emp_lat: "",
                email: "",
                password: "",
            });
            setStep(1);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong!");
        }
        // console.log('submitted on work');
        // alert("Submittion on working pa dols");

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
            if (!userData.educ_highest_level) newErrors.educ_highest_level = "Education level is required";
            if (!userData.year_graduated) newErrors.year_graduated = "Year Graduated is required";

        }
        //employment status
        else if (step === 4) {
            if (!userData.emp_status) newErrors.emp_status = "Employment status is required";
        }
        else if (step === 5) {
            if (!userData.company_name) newErrors.company_name = "Company Name is required";
            if (!userData.job_title) newErrors.job_title = "Job title is required";
            if (!userData.start_date) newErrors.start_date = "Year Started is required";
        }

        //address info
        else if (step === 6) {
            if (!userData.emp_full_address) newErrors.emp_full_address = "Full Address is required";
            if (!userData.emp_lat) newErrors.emp_lat = "Latitude is required";
            if (!userData.emp_long) newErrors.emp_long = "Longitude is required";

        }
        //account info
        else if (step === 7) {
            if (!userData.email) newErrors.email = "Email is required";
            if (!userData.password) newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
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
                {step === 4 && <EmploymentStatus userData={userData} handleChange={handleChange} errors={errors} />}
                {step === 5 && <EmploymentInfoStep userData={userData} handleChange={handleChange} errors={errors} />}
                {step === 6 && <EmploymentAddressStep userData={userData} setUserData={setUserData} handleChange={handleChange} errors={errors} />}
                {step === 7 && <AccountInfoStep userData={userData} handleChange={handleChange} errors={errors} />}
                {step === 8 && <ReviewStep userData={userData} />}

                <div className="flex justify-between mt-4">

                    {step > 1 && <button onClick={prevStep} className="px-4 py-2 bg-gray-400 text-white rounded">Back</button>}
                    {step < 8 ? (
                        <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
                    ) : (
                        <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
                    )}
                </div>
            </div>
        </div>

    );
};

export default MultiStepForm;
