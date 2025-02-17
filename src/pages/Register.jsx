
import Navbar from "../components/layouts/Navbar";
import { useState } from "react";

const Register = () => {
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

    // Next Step
    const nextStep = () => {
        setStep(step + 1);
    };

    // Previous Step
    const prevStep = () => {
        setStep(step - 1);
    };

    // Step Components
    const Step1 = () => (
        <div>
            <h2>Personal Details</h2>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
            <button onClick={nextStep}>Next</button>
        </div>
    );

    const Step2 = () => (
        <div>
            <h2>Address Information</h2>
            <input type="text" name="address" placeholder="Address" onChange={handleChange} value={formData.address} />
            <input type="text" name="city" placeholder="City" onChange={handleChange} value={formData.city} />
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Next</button>
        </div>
    );

    const Step3 = () => (
        <div>
            <h2>Account Details</h2>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
            <button onClick={prevStep}>Back</button>
            <button onClick={() => alert("Form Submitted!")}>Submit</button>
        </div>
    );
    return (
        <div>
            <Navbar />
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
        </div>

    );
};
export default Register;
