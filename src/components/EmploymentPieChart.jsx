import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmploymentPieChart = ({ data }) => {
    // Extract ranges
    const currentRange = data?.current?.range || [];
    const previousRange = data?.previous?.range || [];

    // Format dates nicely
    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const currentRangeText = currentRange.length === 2
        ? `${formatDate(currentRange[0])} – ${formatDate(currentRange[1])}`
        : "N/A";

    const previousRangeText = previousRange.length === 2
        ? `${formatDate(previousRange[0])} – ${formatDate(previousRange[1])}`
        : "N/A";

    // Current
    const employed = data?.current?.summary?.employedAccounts || 0;
    const freelance = data?.current?.summary?.freelanceAccounts || 0;
    const unemployed = data?.current?.summary?.unemployedAccounts || 0;

    // Previous
    const prevEmployed = data?.previous?.summary?.employedAccounts || 0;
    const prevFreelance = data?.previous?.summary?.freelanceAccounts || 0;
    const prevUnemployed = data?.previous?.summary?.unemployedAccounts || 0;

    // Chart data separated
    const currentData = [
        { name: 'Employed', value: employed },
        { name: 'Freelance', value: freelance },
        { name: 'Unemployed', value: unemployed },
    ];

    const previousData = [
        { name: 'Employed', value: prevEmployed },
        { name: 'Freelance', value: prevFreelance },
        { name: 'Unemployed', value: prevUnemployed },
    ];

    const COLORS = {
        Employed: '#4CAF50',   // green
        Freelance: '#2196F3',  // blue
        Unemployed: '#F44336', // red
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-5">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
                Employment Status (Current vs Previous)
            </h2>

            {/* Two Pie Charts with ranges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Current */}
                <div>
                    <h3 className="text-lg font-medium text-center mb-1">Current</h3>
                    <p className="text-sm text-center text-gray-500 mb-2">{currentRangeText}</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={currentData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                labelLine={false}
                                label={({ value }) => value} // e.g., "560"
                            >
                                {currentData.map((entry, index) => (
                                    <Cell key={`current-${index}`} fill={COLORS[entry.name]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#f9fafb',
                                    borderColor: '#d1d5db',
                                    borderRadius: '0.5rem',
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: '14px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Previous */}
                <div>
                    <h3 className="text-lg font-medium text-center mb-1">Previous</h3>
                    <p className="text-sm text-center text-gray-500 mb-2">{previousRangeText}</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={previousData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                labelLine={false}
                                label={({ value }) => value} // e.g., "560"
                            >
                                {previousData.map((entry, index) => (
                                    <Cell key={`previous-${index}`} fill={COLORS[entry.name]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#f9fafb',
                                    borderColor: '#d1d5db',
                                    borderRadius: '0.5rem',
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: '14px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Context Note */}
            <p className="text-sm text-gray-500 text-center mt-6">
                Current refers to <span className="font-medium">{currentRangeText}</span>. <br />
                Previous refers to <span className="font-medium">{previousRangeText}</span>.
            </p>
        </div>
    );
};

export default EmploymentPieChart;
