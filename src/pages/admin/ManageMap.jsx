import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Map, Marker } from "pigeon-maps";
import { Search } from "lucide-react";

const ManageMap = () => {
    const { token } = useAuth();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null); // Store marker position

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/clustering-data", {
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

    const handleMarkerClick = (employment, lat, lng) => {
        const employees = accounts.flatMap(account =>
            account.alumni.employment_infos
                .filter(emp => emp.company_name === employment.company_name)
                .map(emp => ({
                    name: `${account.alumni.alm_first_name} ${account.alumni.alm_last_name}`,
                    profession: emp.emp_info_profession,
                    company: emp.company_name,
                    address: emp.address_employment.emp_add_location,
                }))
        );

        setSelectedEmployees(employees);
        setSelectedPosition([lat, lng]); // Store marker position
    };

    return (
        <div className="flex flex-col h-screen p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    🗺️ Alumni Map
                </h1>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading map...</p>
            ) : (
                <div className="relative flex w-full h-full p-4">
                    {/* MAP SECTION */}
                    <div className="relative flex-grow border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                        <Map height={"60vh"} width={"100%"} defaultCenter={[10.3157, 123.8854]} defaultZoom={13}>
                            {accounts.map(account =>
                                account.alumni.employment_infos.map(employment =>
                                    employment.address_employment.emp_add_lat &&
                                    employment.address_employment.emp_add_long ? (
                                        <Marker
                                            key={employment.id}
                                            width={50}
                                            anchor={[
                                                parseFloat(employment.address_employment.emp_add_lat),
                                                parseFloat(employment.address_employment.emp_add_long),
                                            ]}
                                            onClick={() =>
                                                handleMarkerClick(
                                                    employment,
                                                    parseFloat(employment.address_employment.emp_add_lat),
                                                    parseFloat(employment.address_employment.emp_add_long)
                                                )
                                            }
                                        />
                                    ) : null
                                )
                            )}
                        </Map>

                        {/* Floating Info Box */}
                        {selectedPosition && selectedEmployees.length > 0 && (
                            <div
                                className="absolute bg-white shadow-lg rounded-lg p-4 w-64"
                                style={{
                                    left: "50%",
                                    top: "30%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 1000,
                                }}
                            >
                                <h2 className="text-lg font-semibold text-gray-900">
                                    📋 {selectedEmployees[0].company}
                                </h2>
                                <p className="text-gray-700 text-sm">📍 {selectedEmployees[0].address}</p>
                                <p className="text-gray-700 text-sm mt-1">👥 Total Employees: {selectedEmployees.length}</p>
                                <ul className="mt-2 max-h-32 overflow-y-auto">
                                    {selectedEmployees.map((employee, index) => (
                                        <li key={index} className="p-2 border-b">
                                            <p className="text-gray-800 font-medium">👤 {employee.name}</p>
                                            <p className="text-gray-700 text-sm">💼 {employee.profession}</p>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => setSelectedPosition(null)}
                                    className="mt-2 w-full bg-red-500 text-white p-1 rounded-lg text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMap;
