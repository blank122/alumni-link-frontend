/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import { motion } from "framer-motion";


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

const PersonalInfoStep = ({ userData, handleChange, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <input type="text" name="alm_first_name" placeholder="First Name" onChange={handleChange} value={userData.alm_first_name} className="w-full p-2 border rounded mb-1" />
            {errors.alm_first_name && <p className="text-red-500 text-sm">{errors.alm_first_name}</p>}

            <input type="text" name="alm_last_name" placeholder="Last Name" onChange={handleChange} value={userData.alm_last_name} className="w-full p-2 border rounded mb-1" />
            {errors.alm_last_name && <p className="text-red-500 text-sm">{errors.alm_last_name}</p>}
            <select name="alm_gender" onChange={handleChange} value={userData.alm_gender} className="w-full p-2 border rounded mb-1">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            {errors.alm_gender && <p className="text-red-500 text-sm">{errors.alm_gender}</p>}

            <input type="text" name="alm_contact_number" placeholder="Contact Number" onChange={handleChange} value={userData.alm_contact_number} className="w-full p-2 border rounded mb-1" />
            {errors.alm_contact_number && <p className="text-red-500 text-sm">{errors.alm_contact_number}</p>}
        </div>
    </motion.div>

);

const AddressInfoStep = ({ userData, handleChange, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-xl font-semibold mb-4">Address Information</h2>
        <input type="text" name="add_full_address" placeholder="full address" onChange={handleChange} value={userData.add_full_address} className="w-full p-2 border rounded mb-1" />
        {errors.add_full_address && <p className="text-red-500 text-sm">{errors.add_full_address}</p>}

        <input type="text" name="add_lat" placeholder="latitude" onChange={handleChange} value={userData.add_lat} className="w-full p-2 border rounded mb-1" />
        {errors.add_lat && <p className="text-red-500 text-sm">{errors.add_lat}</p>}

        <input type="text" name="add_long" placeholder="longitude" onChange={handleChange} value={userData.add_long} className="w-full p-2 border rounded mb-1" />
        {errors.add_long && <p className="text-red-500 text-sm">{errors.add_long}</p>}

    </motion.div>
);

const EducationalBackgroundInfo = ({ userData, handleChange, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div>
            <h2 className="text-xl font-semibold mb-4">Educational Background</h2>
            <input type="text" name="educ_highest_level" placeholder="Highest Level of Education" onChange={handleChange} value={userData.educ_highest_level} className="w-full p-2 border rounded mb-1" />
            {errors.educ_highest_level && <p className="text-red-500 text-sm">{errors.educ_highest_level}</p>}

            <input type="text" name="year_graduated" placeholder="Year Graduated" onChange={handleChange} value={userData.year_graduated} className="w-full p-2 border rounded mb-1" />
            {errors.year_graduated && <p className="text-red-500 text-sm">{errors.year_graduated}</p>}
        </div>
    </motion.div>

);
//checks first if for employment status
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
            <select name="emp_status" onChange={handleChange} value={userData.alm_gender} className="w-full p-2 border rounded mb-1">
                <option value="">Employment Status</option>
                <option value="0">Unemployed</option>
                <option value="1">Freelance</option>
                <option value="2">Employed</option>
            </select>
            {errors.emp_status && <p className="text-red-500 text-sm">{errors.emp_status}</p>}
        </div>
    </motion.div>

);
const EmploymentInfoStep = ({ userData, handleChange, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div>
            <h2 className="text-xl font-semibold mb-4">Employment Status</h2>
            <input type="text" name="alm_first_name" placeholder="First Name" onChange={handleChange} value={userData.alm_first_name} className="w-full p-2 border rounded mb-1" />
            {errors.alm_first_name && <p className="text-red-500 text-sm">{errors.alm_first_name}</p>}

            <input type="text" name="alm_last_name" placeholder="Last Name" onChange={handleChange} value={userData.alm_last_name} className="w-full p-2 border rounded mb-1" />
            {errors.alm_last_name && <p className="text-red-500 text-sm">{errors.alm_last_name}</p>}
            {/* might add a function that detects the value of the employment status if it is less than 2 (which is employed the user will go to the review phase to check his form submittions) */}
            <select name="emp_status" onChange={handleChange} value={userData.alm_gender} className="w-full p-2 border rounded mb-1">
                <option value="">Employment Status</option>
                <option value="0">Unemployed</option>
                <option value="1">Freelance</option>
                <option value="2">Employed</option>
            </select>
            {errors.alm_gender && <p className="text-red-500 text-sm">{errors.alm_gender}</p>}

            <input type="text" name="alm_contact_number" placeholder="Contact Number" onChange={handleChange} value={userData.alm_contact_number} className="w-full p-2 border rounded mb-1" />
            {errors.alm_contact_number && <p className="text-red-500 text-sm">{errors.alm_contact_number}</p>}
        </div>
    </motion.div>

);
//employment address step
const EmploymentAddressStep = ({ userData, handleChange, errors }) => (
    <motion.div
        className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-xl font-semibold mb-4">Address Information</h2>
        <input type="text" name="emp_full_address" placeholder="full address" onChange={handleChange} value={userData.add_full_address} className="w-full p-2 border rounded mb-1" />
        {errors.add_full_address && <p className="text-red-500 text-sm">{errors.add_full_address}</p>}

        <input type="text" name="emp_lat" placeholder="latitude" onChange={handleChange} value={userData.add_lat} className="w-full p-2 border rounded mb-1" />
        {errors.add_lat && <p className="text-red-500 text-sm">{errors.add_lat}</p>}

        <input type="text" name="emp_long" placeholder="longitude" onChange={handleChange} value={userData.add_long} className="w-full p-2 border rounded mb-1" />
        {errors.add_long && <p className="text-red-500 text-sm">{errors.add_long}</p>}

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
            <p><strong>Latitude:</strong> {userData.add_lat}</p>
            <p><strong>Longitude:</strong> {userData.add_long}</p>
            <p><strong>Education:</strong> {userData.educ_highest_level}</p>
            <p><strong>Password:</strong> **** (hidden for security)</p>
        </div>
    </motion.div>
);

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        alm_first_name: "",
        alm_last_name: "",
        alm_gender: "",
        alm_contact_number: "",
        add_full_address: "",
        add_long: "",
        add_lat: "",
        educ_highest_level: "",
        year_graduated: "",
        email: "",
        password: "",

    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
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
        //account info
        else if (step === 4) {
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
                {step === 2 && <AddressInfoStep userData={userData} handleChange={handleChange} errors={errors} />}
                {step === 3 && <EducationalBackgroundInfo userData={userData} handleChange={handleChange} errors={errors} />}
                {step === 4 && <AccountInfoStep userData={userData} handleChange={handleChange} errors={errors} />}
                {step === 5 && <ReviewStep userData={userData} />}

                <div className="flex justify-between mt-4">

                    {step > 1 && <button onClick={prevStep} className="px-4 py-2 bg-gray-400 text-white rounded">Back</button>}
                    {step < 5 ? (
                        <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
                    ) : (
                        <button className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
                    )}
                </div>
            </div>
        </div>

    );
};

export default MultiStepForm;
