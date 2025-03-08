import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigate back to the previous page
    };
    return (
        <div className="unauthorized-container">
            <h1>🚫 Access Denied</h1>
            <p>You do not have permission to view this page.</p>
            <button onClick={goBack} className="btn">Go Back</button>

        </div>
    );
};

export default Unauthorized;
