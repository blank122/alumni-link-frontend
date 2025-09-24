import { motion } from 'framer-motion';
import ChartLoading from "../components/ChartLoading";

const StatsCard = ({ icon: Icon, title, value, isLoading, bgColor = 'bg-gray-300' }) => (
  <motion.div
    className={`p-6 ${bgColor} shadow-md rounded-xl flex flex-col items-center w-full max-w-md cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300`}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center space-x-4">
      <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-inner text-gray-700 text-3xl">
        <Icon />
      </div>
      <div className="text-center sm:text-left">
        <p className="text-gray-800 text-lg font-semibold">{title}</p>
        {isLoading ? (
          <ChartLoading message="Loading Data..." />
        ) : (
          <p className="text-3xl font-extrabold text-gray-900">{value ?? 0}</p>
        )}
      </div>
    </div>
  </motion.div>
);

export default StatsCard;
