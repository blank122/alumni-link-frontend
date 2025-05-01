import { motion } from 'framer-motion';

const StatsCard = ({ icon: Icon, title, value, isLoading, bgColor = 'bg-gray-300' }) => (
  <motion.div
    className={`p-8 ${bgColor} shadow-lg rounded-xl flex flex-col items-center w-full max-w-md`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center space-x-4">
      <div className="text-4xl text-gray-700">
        <Icon />
      </div>
      <div>
        <p className="text-gray-800 text-lg">{title}</p>
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <p className="text-3xl font-extrabold text-gray-900">{value ?? 0}</p>
        )}
      </div>
    </div>
  </motion.div>
);

export default StatsCard;