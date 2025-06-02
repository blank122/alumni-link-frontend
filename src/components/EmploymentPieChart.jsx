import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmploymentPieChart = ({ data }) => {
    const employed = data?.summary?.employedAccounts || 0;
    const freelance = data?.summary?.freelanceAccounts || 0;
    const unemployed = data?.summary?.unemployedAccounts || 0;

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
