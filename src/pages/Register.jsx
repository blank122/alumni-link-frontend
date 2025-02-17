/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "../components/layouts/Navbar";

const Step1 = ({ formData, handleChange, nextStep }) => (
    <div>
        <h2>Personal Details</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
        <button onClick={nextStep}>Next</button>
    </div>
);

const Step2 = ({ formData, handleChange, nextStep, prevStep }) => (
    <div>
        <h2>Address Information</h2>
        <input type="text" name="address" placeholder="Address" onChange={handleChange} value={formData.address} />
        <input type="text" name="city" placeholder="City" onChange={handleChange} value={formData.city} />
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
    </div>
);

const Step3 = ({ formData, handleChange, prevStep }) => (
    <div>
        <h2>Account Details</h2>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
        <button onClick={prevStep}>Back</button>
        <button onClick={() => alert("Form Submitted!")}>Submit</button>
    </div>
);

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        password: "",
    });

    // Function to handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Navigation Functions
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div>
            <Navbar />
            {step === 1 && <Step1 formData={formData} handleChange={handleChange} nextStep={nextStep} />}
            {step === 2 && <Step2 formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
            {step === 3 && <Step3 formData={formData} handleChange={handleChange} prevStep={prevStep} />}
        </div>
    );
};

export default MultiStepForm;
