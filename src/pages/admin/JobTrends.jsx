import { useState, useMemo } from "react";
import {
    LineChart, Line,
    BarChart, Bar,
    XAxis, YAxis,
    Tooltip, Legend,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const JobTrends = ({ data, loading }) => {
    const [view, setView] = useState("line");
    const [selectedJob, setSelectedJob] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    // Transform nested JSON data to flattened format
    const flattenedData = useMemo(() => {
        if (!data || typeof data !== 'object') return [];

        const flattened = [];

        Object.entries(data).forEach(([region, jobs]) => {
            Object.entries(jobs).forEach(([jobTitle, years]) => {
                Object.entries(years).forEach(([year, count]) => {
                    flattened.push({
                        region,
                        job: jobTitle,
                        year: parseInt(year),
                        count: parseInt(count)
                    });
                });
            });
        });

        return flattened;
    }, [data]);

    // Extract unique jobs and years
    const jobs = useMemo(() => [...new Set(flattenedData.map(d => d.job))], [flattenedData]);
    const years = useMemo(() => [...new Set(flattenedData.map(d => d.year))].sort(), [flattenedData]);

    // Aggregate data for visualization
    const aggregatedData = useMemo(() => {
        let filtered = flattenedData;

        // Apply filters
        if (selectedJob) {
            filtered = filtered.filter(d => d.job === selectedJob);
        }
        if (selectedYear) {
            filtered = filtered.filter(d => d.year === parseInt(selectedYear));
        }

        // Group by region and sum counts
        const grouped = {};
        filtered.forEach(d => {
            const key = d.region;
            if (!grouped[key]) {
                grouped[key] = {
                    region: d.region,
                    count: 0,
                    jobs: new Set()
                };
            }
            grouped[key].count += d.count;
            grouped[key].jobs.add(d.job);
        });

        return Object.values(grouped).map(item => ({
            ...item,
            jobCount: item.jobs.size,
            jobs: undefined // Remove jobs set from final data
        }));
    }, [flattenedData, selectedJob, selectedYear]);

    // Top 5 jobs per region (for default view)
    const topJobsByRegion = useMemo(() => {
        if (selectedJob || selectedYear) return aggregatedData;

        const regionJobTotals = {};

        // Calculate total count per job per region
        flattenedData.forEach(d => {
            const key = `${d.region}-${d.job}`;
            if (!regionJobTotals[key]) {
                regionJobTotals[key] = {
                    region: d.region,
                    job: d.job,
                    count: 0
                };
            }
            regionJobTotals[key].count += d.count;
        });

        // Group by region and get top 5 jobs
        const byRegion = {};
        Object.values(regionJobTotals).forEach(item => {
            if (!byRegion[item.region]) byRegion[item.region] = [];
            byRegion[item.region].push(item);
        });

        // Get top 5 jobs per region and flatten
        const topJobs = [];
        Object.entries(byRegion).forEach(([region, jobs]) => {
            const top5 = jobs
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);
            topJobs.push(...top5);
        });

        // Group by region for chart display
        const chartData = {};
        topJobs.forEach(item => {
            if (!chartData[item.region]) {
                chartData[item.region] = {
                    region: item.region,
                    count: 0
                };
            }
            chartData[item.region].count += item.count;
        });

        return Object.values(chartData);
    }, [flattenedData, selectedJob, selectedYear]);

    // Choose which data to display
    const displayData = selectedJob || selectedYear ? aggregatedData : topJobsByRegion;

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) return null;

        return (
            <div className="bg-white p-2 rounded shadow text-xs text-gray-800 border">
                <div className="font-semibold mb-1">{label}</div>
                {payload.map((item, i) => (
                    <div key={i} className="text-gray-600">
                        {item.name}: {item.value}
                    </div>
                ))}
            </div>
        );
    };

    // Show loading / empty states
    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <p className="text-gray-500">Loading job trends...</p>
            </div>
        );
    }

    if (!flattenedData.length) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <p className="text-gray-500">No job trend data available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-5">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Job Trends Per Region</h2>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                {/* Job dropdown */}
                <select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm text-gray-700"
                >
                    <option value="">All Jobs</option>
                    {jobs.sort().map(job => (
                        <option key={job} value={job}>{job}</option>
                    ))}
                </select>

                {/* Year dropdown */}
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm text-gray-700"
                >
                    <option value="">All Years</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                {/* Clear filters button */}
                {(selectedJob || selectedYear) && (
                    <button
                        onClick={() => {
                            setSelectedJob("");
                            setSelectedYear("");
                        }}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                    >
                        Clear Filters
                    </button>
                )}

                {/* View tabs */}
                <div className="flex gap-2 ml-auto">
                    {["line", "bar", "heatmap"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setView(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${view === tab
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{Object.keys(data || {}).length}</div>
                    <div className="text-sm text-gray-600">Regions</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{jobs.length}</div>
                    <div className="text-sm text-gray-600">Job Types</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{flattenedData.reduce((sum, d) => sum + d.count, 0)}</div>
                    <div className="text-sm text-gray-600">Total Jobs</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{years.length}</div>
                    <div className="text-sm text-gray-600">Years Covered</div>
                </div>
            </div>

            {/* Chart area */}
            <div className="w-full h-96">
                {view === "line" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={displayData}>
                            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                            <XAxis
                                dataKey="region"
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                interval={0}
                            />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}

                {view === "bar" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={displayData}>
                            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                            <XAxis
                                dataKey="region"
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                interval={0}
                            />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                dataKey="count"
                                fill="#2563eb"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}

                {view === "heatmap" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 h-full overflow-y-auto">
                        {displayData.map((d, i) => {
                            const maxCount = Math.max(...displayData.map(item => item.count));
                            const intensity = Math.min(0.2 + (d.count / maxCount) * 0.8, 1);

                            return (
                                <div
                                    key={i}
                                    className="flex flex-col items-center justify-center p-4 rounded-lg text-white min-h-24"
                                    style={{
                                        backgroundColor: `rgba(37, 99, 235, ${intensity})`,
                                    }}
                                >
                                    <span className="text-xs font-medium mb-1">{d.region}</span>
                                    <span className="text-2xl font-bold">{d.count}</span>
                                    <span className="text-xs opacity-90">jobs</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Current view info */}
            <div className="mt-4 text-sm text-gray-600 text-center">
                {!selectedJob && !selectedYear && "Showing top 5 jobs per region aggregated"}
                {selectedJob && !selectedYear && `Showing "${selectedJob}" across all years`}
                {!selectedJob && selectedYear && `Showing all jobs for year ${selectedYear}`}
                {selectedJob && selectedYear && `Showing "${selectedJob}" for year ${selectedYear}`}
            </div>
        </div>
    );
};

export default JobTrends;