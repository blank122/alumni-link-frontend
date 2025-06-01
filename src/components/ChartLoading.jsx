const ChartLoading = ({ message = "Loading chart data..." }) => {
    return (
        <div className="flex flex-col items-center justify-center h-60 text-gray-500">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-3"></div>
            <p className="text-sm">{message}</p>
        </div>
    );
};

export default ChartLoading;
