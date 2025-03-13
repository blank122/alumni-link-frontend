/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
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
                const response = await axios.get("http://127.0.0.1:8000/api/admin/courses_population", {
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
        <div className="flex flex-col h-screen p-6">
            <h1 className="text-2xl font-bold">Courses Population</h1>

            <div className="mt-6 bg-white shadow-lg rounded-xl p-6">
                {loadingData ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={dataCount} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="population">
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
