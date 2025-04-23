const ProgressBar = ({ currentStepIndex, totalSteps }) => {
    const progressPercentage = (currentStepIndex / totalSteps) * 100;

    return (
        <div className="w-full bg-gray-300 h-4 rounded-md mb-6">
            <div
                className="bg-green-500 h-4 rounded-md transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
