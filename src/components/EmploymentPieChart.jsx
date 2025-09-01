import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmploymentPieChart = ({ data }) => {
    const employed = data?.current?.summary?.employedAccounts || 0;
    const freelance = data?.current?.summary?.freelanceAccounts || 0;
    const unemployed = data?.current?.summary?.unemployedAccounts || 0;
    const employedDescription = data?.current?.summary?.description?.employedAccounts;
    const unemployedDescription = data?.current?.summary?.description?.unemployedAccounts;
    const freelanceDescription = data?.current?.summary?.description?.freelanceAccounts;

    const total = employed + freelance + unemployed;

    const chartData = [
        {
            name: 'Employed',
            value: employed,
            percentage: ((employed / total) * 100).toFixed(1)
        },
        {
            name: 'Freelance',
            value: freelance,
            percentage: ((freelance / total) * 100).toFixed(1)
        },
        {
            name: 'Unemployed',
            value: unemployed,
            percentage: ((unemployed / total) * 100).toFixed(1)
        }
    ];

    const COLORS = ['#4CAF50', '#FFC107', '#F44336'];

    return (
        <div className=" bg-white rounded-2xl shadow-lg p-6 mt-5">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Employment Status</h2>
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
                        outerRadius={100}
                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}

                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#d1d5db', borderRadius: '0.5rem' }}
                        formatter={(value, name, props) => {
                            const percent = props.payload.percentage;
                            return [`${value} (${percent}%)`, name];
                        }}
                    />
                    <Legend wrapperStyle={{ fontSize: '14px' }} />

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
};

export default EmploymentPieChart;
