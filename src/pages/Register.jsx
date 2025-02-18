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
        <input type="text" name="name" placeholder="First Name" onChange={handleChange} value={userData.alm_first_name} className="w-full p-2 border rounded mb-1" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <input type="email" name="email" placeholder="Last Name" onChange={handleChange} value={userData.alm_last_name} className="w-full p-2 border rounded mb-1" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <input type="text" name="name" placeholder="Gender" onChange={handleChange} value={userData.gender} className="w-full p-2 border rounded mb-1" />
        {errors.name && <p className="text-red-500 text-sm">{errors.gender}</p>}
        <input type="number" name="contact_number" placeholder="Contact Number" onChange={handleChange} value={userData.alm_contact_number} className="w-full p-2 border rounded mb-1" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <button onClick={nextStep} className="w-full py-2 bg-blue-500 text-white rounded mt-4">Next</button>
    </motion.div>
);

const AddressInfoStep = ({ addressData, handleChange, nextStep, prevStep, setAddressErrors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-xl font-semibold mb-4">Address Information</h2>
        <input type="text" name="address" placeholder="full address" onChange={handleChange} value={addressData.add_full_address} className="w-full p-2 border rounded mb-1" />
        {setAddressErrors.add_full_address && <p className="text-red-500 text-sm">{setAddressErrors.add_full_address}</p>}

        <input type="text" name="latitude" placeholder="latitude" onChange={handleChange} value={addressData.add_lat} className="w-full p-2 border rounded mb-1" />
        {setAddressErrors.city && <p className="text-red-500 text-sm">{setAddressErrors.add_lat}</p>}

        <input type="text" name="longitude" placeholder="longitude" onChange={handleChange} value={addressData.add_long} className="w-full p-2 border rounded mb-1" />
        {setAddressErrors.city && <p className="text-red-500 text-sm">{setAddressErrors.add_long}</p>}

        <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded">Back</button>
            <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
    </motion.div>
);

const EducationalBackgroundInfo = ({ educBackgroundData, handleChange, nextStep, prevStep, setEducBrackgroundData }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-xl font-semibold mb-4">Address Information</h2>
        <input type="text" name="bs_deg" placeholder="Bachelors Degree" onChange={handleChange} value={educBackgroundData.bs_deg} className="w-full p-2 border rounded mb-1" />
        {setEducBrackgroundData.bs_deg && <p className="text-red-500 text-sm">{setEducBrackgroundData.bs_deg}</p>}

        <input type="date" name="year_graduated" placeholder="Year Graduated" onChange={handleChange} value={educBackgroundData.year_graduated} className="w-full p-2 border rounded mb-1" />
        {setEducBrackgroundData.year_graduated && <p className="text-red-500 text-sm">{setEducBrackgroundData.year_graduated}</p>}

        <input type="text" name="masters_deg" placeholder="Master Degree" onChange={handleChange} value={educBackgroundData.masters_deg} className="w-full p-2 border rounded mb-1" />
        {setEducBrackgroundData.masters_deg && <p className="text-red-500 text-sm">{setEducBrackgroundData.masters_deg}</p>}

        <input type="text" name="masters_deg_school" placeholder="Master Degree School" onChange={handleChange} value={educBackgroundData.masters_deg_school} className="w-full p-2 border rounded mb-1" />
        {setEducBrackgroundData.masters_deg_school && <p className="text-red-500 text-sm">{setEducBrackgroundData.masters_deg_school}</p>}

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
    const [userData, setUserData] = useState({ alm_first_name: "", alm_last_name: "", alm_gender: "", alm_contact_number: "" });
    const [addressData, setAddressData] = useState({ add_lat: "", add_long: "", add_full_address: "" });
    const [educBackgroundData, setEducBrackgroundData] = useState({ bs_deg: "", year_graduated: "", masters_deg: "", masters_deg_school: "" });


    const [errors, setErrors] = useState({});
    const [addressErrors, setAddressErrors] = useState({});
    const [educBackgroundDataErrors, setEducBackgroundDataErrors] = useState({});

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        //address
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
        setAddressErrors({ ...addressErrors, [e.target.name]: "" });
        //educational background
        setEducBrackgroundData({ ...educBackgroundData, [e.target.name]: e.target.value });
        setEducBackgroundDataErrors({ ...educBackgroundDataErrors, [e.target.name]: "" });
    };

    const validateStep = () => {
        let newErrors = {};
        //personal info
        if (step === 1 && !userData.alm_first_name) newErrors.alm_first_name = "First Name is required";
        if (step === 1 && !userData.alm_last_name) newErrors.alm_last_name = "Last Name is required";
        if (step === 1 && !userData.gender) newErrors.gender = "Gender is required";
        if (step === 1 && !userData.alm_contact_number) newErrors.alm_contact_number = "Contact number is required";
        // if (step === 1 && !userData.email) newErrors.email = "Email is required";
        //address error
        if (step === 2 && !addressData.add_lat) newErrors.add_lat = "Address latitude is required";
        if (step === 2 && !addressData.add_long) newErrors.add_long = "Address longitude is required";
        if (step === 2 && !addressData.add_full_address) newErrors.add_full_address = "Full address is required";

        //account
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
                {step === 2 && <AddressInfoStep addressData={addressData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={addressErrors} />}
                {step === 3 && <EducationalBackgroundInfo educBackgroundData={educBackgroundData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={educBackgroundDataErrors} />}

                {step === 4 && <AccountInfoStep userData={userData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={errors} />}
                {step === 5 && <ReviewStep userData={userData} prevStep={prevStep} handleSubmit={handleSubmit} />}
            </div>
        </div>

    );
};

export default MultiStepForm;
