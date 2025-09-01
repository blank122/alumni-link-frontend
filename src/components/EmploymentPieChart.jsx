import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmploymentPieChart = ({ data }) => {
    // Current
    const employed = data?.current?.summary?.employedAccounts || 0;
    const freelance = data?.current?.summary?.freelanceAccounts || 0;
    const unemployed = data?.current?.summary?.unemployedAccounts || 0;

    // Previous
    const prevEmployed = data?.previous?.summary?.employedAccounts || 0;
    const prevFreelance = data?.previous?.summary?.freelanceAccounts || 0;
    const prevUnemployed = data?.previous?.summary?.unemployedAccounts || 0;

    // Descriptions
    const employedDescription = data?.current?.summary?.description?.employedAccounts;
    const unemployedDescription = data?.current?.summary?.description?.unemployedAccounts;
    const freelanceDescription = data?.current?.summary?.description?.freelanceAccounts;

    // Chart data: combine current & previous
    const chartData = [
        { name: 'Employed (Current)', value: employed },
        { name: 'Employed (Previous)', value: prevEmployed },
        { name: 'Freelance (Current)', value: freelance },
        { name: 'Freelance (Previous)', value: prevFreelance },
        { name: 'Unemployed (Current)', value: unemployed },
        { name: 'Unemployed (Previous)', value: prevUnemployed },
    ];

    const COLORS = ['#4CAF50', '#A5D6A7', '#2196F3', '#90CAF9', '#F44336', '#EF9A9A'];

    return (
        <div className=" bg-white rounded-2xl shadow-lg p-6 mt-5">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Employment Status (Current vs Previous)</h2>

            <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-2">
                    <span className="w-3 h-3 rounded-full bg-green-500 mt-1"></span>
                    <p className="text-gray-700">
                        <span className="font-semibold">Employed:</span> {employedDescription}
                    </p>
                </div>
                <div className="flex items-start space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 mt-1"></span>
                    <p className="text-gray-700">
                        <span className="font-semibold">Unemployed:</span> {unemployedDescription}
                    </p>
                </div>
                <div className="flex items-start space-x-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500 mt-1"></span>
                    <p className="text-gray-700">
                        <span className="font-semibold">Freelance:</span> {freelanceDescription}
                    </p>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <PieChart width={500} height={300} className="mx-auto">
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label={({ name, value }) => `${name}: ${value}`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#f9fafb',
                            borderColor: '#d1d5db',
                            borderRadius: '0.5rem',
                        }}
                        formatter={(value, name) => [`${value}`, name]}
                    />
                    <Legend wrapperStyle={{ fontSize: '14px' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EmploymentPieChart;
