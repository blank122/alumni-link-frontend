/* eslint-disable no-unused-vars */
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMemo } from "react";

const CourseList = () => {
    const { token } = useAuth();
    const [dataCount, setDataCount] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    // Define colors for each course
    const colors = useMemo(() => ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFAA33"], []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/courses_population`
                    , {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    });

                // Convert object to array for Recharts
                const formattedData = Object.entries(response.data.data).map(([key, value], index) => ({
                    name: key,
                    population: value,
                    color: colors[index % colors.length], // Assign a color dynamically
                }));

                setDataCount(formattedData);
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

    return (
        <div className="flex flex-col h-screen p-6 bg-gray-50">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-gray-800">📊 Alumni Population by Course</h1>
                <p className="text-gray-500 mt-1">Overview of student distribution per course</p>
            </div>

            {/* Chart Card */}
            <div className="flex-1 bg-white shadow-xl rounded-2xl p-6">
                {loadingData ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500 animate-pulse">Loading data...</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={dataCount}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} />
                            <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: "rgba(156,163,175,0.1)" }}
                                contentStyle={{
                                    backgroundColor: "white",
                                    borderRadius: "12px",
                                    border: "1px solid #E5E7EB",
                                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                                }}
                            />
                            <Bar dataKey="population" radius={[6, 6, 0, 0]}>
                                {dataCount.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>

    );
};

export default CourseList;
