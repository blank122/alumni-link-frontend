import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Map, Marker } from "pigeon-maps";

const ManageMap = () => {
    const { token } = useAuth();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmployees, setSelectedEmployees] = useState([]); // Store multiple employees

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/clustering-data ", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                setAccounts(response.data.data);
            } catch (error) {
                console.error("Error fetching user locations:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const handleMarkerClick = (companyName) => {
        // Find all employees working at this company
        const employees = accounts.flatMap(account =>
            account.alumni.employment_infos
                .filter(employment => employment.company_name === companyName)
                .map(employment => ({
                    name: `${account.alumni.alm_first_name} ${account.alumni.alm_last_name}`,
                    profession: employment.emp_info_profession,
                    company: employment.company_name,
                    address: employment.address_employment.emp_add_location,
                }))
        );

        setSelectedEmployees(employees);
    };

    return (
        <div className="flex flex-col h-screen p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    🗺️ Company Locations Map
                </h1>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading map...</p>
            ) : accounts.length > 0 ? (
                <div className="flex flex-col w-full h-full">
                    {/* MAP SECTION */}
                    <div className="flex-grow w-full h-full border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                        <Map height={"80vh"} width={"100%"} defaultCenter={[10.3157, 123.8854]} defaultZoom={13}>
                            {accounts.map((account) =>
                                account.alumni.employment_infos.map((employment) =>
                                    employment.address_employment.emp_add_lat &&
                                        employment.address_employment.emp_add_long ? (
                                        <Marker
                                            key={employment.id}
                                            width={50}
                                            anchor={[
                                                parseFloat(employment.address_employment.emp_add_lat),
                                                parseFloat(employment.address_employment.emp_add_long),
                                            ]}
                                            onClick={() => handleMarkerClick(employment.company_name)}
                                        />
                                    ) : null
                                )
                            )}
                        </Map>
                    </div>

                    {/* EMPLOYEE DETAILS - SHOW MULTIPLE EMPLOYEES */}
                    {selectedEmployees.length > 0 && (
                        <div className="mt-4 bg-white p-4 rounded-lg shadow-md mb-5">
                            <h2 className="text-xl font-semibold text-gray-900">📋 Employees at {selectedEmployees[0].company}</h2>
                            <p className="text-gray-700 text-sm">📍 {selectedEmployees[0].address}</p>
                            <ul className="mt-2">
                                {selectedEmployees.map((employee, index) => (
                                    <li key={index} className="mt-2 p-3 border-b">
                                        <p className="text-gray-800 font-medium">👤 {employee.name}</p>
                                        <p className="text-gray-700 text-sm">💼 {employee.profession}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-600">No employment data available.</p>
            )}
        </div>
    );
};

export default ManageMap;
