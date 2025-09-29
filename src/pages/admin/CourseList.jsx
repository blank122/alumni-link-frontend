import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    FiBarChart2,
    FiUsers,
    FiTrendingUp,
    FiPieChart
} from "react-icons/fi";

const CourseList = () => {
    const { token } = useAuth();
    const [dataCount, setDataCount] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [totalAlumni, setTotalAlumni] = useState(0);

    // Define modern color palette
    const colors = useMemo(() => [
        "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6",
        "#06B6D4", "#84CC16", "#F97316", "#6366F1", "#EC4899"
    ], []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/courses_population`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                // Convert object to array for Recharts
                const formattedData = Object.entries(response.data.data).map(([key, value], index) => ({
                    name: key,
                    population: value,
                    color: colors[index % colors.length],
                }));

                setDataCount(formattedData);

                // Calculate total alumni
                const total = formattedData.reduce((sum, item) => sum + item.population, 0);
                setTotalAlumni(total);
            } catch (error) {
                console.error("Error fetching all courses data:", error);
            } finally {
                setLoadingData(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token, colors]);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {payload[0].value} alumni
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <FiBarChart2 className="w-6 h-6 text-blue-500" />
                        </div>
                        <h1 className="text-3xl font-light text-gray-900 dark:text-white">Alumni Population Analytics</h1>
                    </div>
                    <div className="w-12 h-0.5 bg-blue-500 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Overview of alumni distribution across different courses
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    <motion.div
                        variants={cardVariants}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Alumni</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalAlumni}</p>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <FiUsers className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Courses</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{dataCount.length}</p>
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <FiPieChart className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average per Course</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                    {dataCount.length > 0 ? Math.round(totalAlumni / dataCount.length) : 0}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <FiTrendingUp className="w-6 h-6 text-purple-500" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Chart Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Alumni Distribution by Course</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Visual representation of alumni population across different academic programs
                        </p>
                    </div>

                    <div className="p-6">
                        {loadingData ? (
                            <div className="flex justify-center items-center h-80">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                                    <p className="text-gray-500 dark:text-gray-400">Loading alumni data...</p>
                                </div>
                            </div>
                        ) : dataCount.length === 0 ? (
                            <div className="flex justify-center items-center h-80">
                                <div className="text-center">
                                    <FiBarChart2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500 dark:text-gray-400">No alumni data available</p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={dataCount}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#E5E7EB"
                                            strokeOpacity={0.3}
                                        />
                                        <XAxis
                                            dataKey="name"
                                            angle={-45}
                                            textAnchor="end"
                                            height={80}
                                            tick={{ fill: "#6B7280", fontSize: 12 }}
                                            interval={0}
                                        />
                                        <YAxis
                                            tick={{ fill: "#6B7280", fontSize: 12 }}
                                            label={{
                                                value: 'Number of Alumni',
                                                angle: -90,
                                                position: 'insideLeft',
                                                offset: -10,
                                                style: { textAnchor: 'middle', fill: '#6B7280' }
                                            }}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar
                                            dataKey="population"
                                            radius={[4, 4, 0, 0]}
                                            animationDuration={1500}
                                        >
                                            {dataCount.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color}
                                                    className="transition-opacity hover:opacity-80"
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>

                    {/* Legend */}
                    {dataCount.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                            <div className="flex flex-wrap gap-4 justify-center">
                                {dataCount.slice(0, 6).map((course, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: course.color }}
                                        />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {course.name}
                                        </span>
                                    </div>
                                ))}
                                {dataCount.length > 6 && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            +{dataCount.length - 6} more
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center"
                >
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Data updated in real-time from alumni records
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default CourseList;