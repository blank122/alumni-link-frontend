import { motion } from "framer-motion";

export default function ProgressHeader({ currentStepIndex, totalSteps, title }) {
  const radius = 20; // circle size
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const progress = (currentStepIndex / totalSteps) * circumference;

  return (
    <div className="flex flex-col mb-6">
      <div className="flex items-center space-x-3">
        {/* Circle with text inside */}
        <div className="relative w-14 h-14">
          <svg
            className="w-14 h-14 transform -rotate-90"
            viewBox="0 0 60 60"
          >
            {/* Background circle */}
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke="lightgray"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress circle */}
            <motion.circle
              cx="30"
              cy="30"
              r={radius}
              stroke="green"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - progress }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          {/* Step counter inside circle */}
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
            {currentStepIndex} of {totalSteps}
          </div>
        </div>

        {/* Step Title + Next Step */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
         
        </div>
      </div>
    </div>
  );
}
