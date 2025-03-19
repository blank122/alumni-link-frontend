import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Map, Marker } from "pigeon-maps";
import { Search } from "lucide-react";

const ManageMap = () => {
    const { token } = useAuth();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmployees, setSelectedEmployees] = useState([]); // Store multiple employees
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showProgramDropdown, setShowProgramDropdown] = useState(false);
    const sortRef = useRef(null);
    const programRef = useRef(null);
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

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setShowSortDropdown(false);
            }
            if (programRef.current && !programRef.current.contains(event.target)) {
                setShowProgramDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col h-screen p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    🗺️ Alumni Map
                </h1>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading map...</p>
            ) : accounts.length > 0 ? (
                <div className="flex flex-col w-full h-full p-4">
                    {/* MAP SECTION */}
                    <div className="relative flex w-full">
                        <div className="flex-grow border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                            <Map height={"60vh"} width={"100%"} defaultCenter={[10.3157, 123.8854]} defaultZoom={13}>
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

                        {/* FILTERS & SEARCH PANEL */}
                        <div className="absolute top-4 left-4 w-80 p-4 bg-white shadow-lg rounded-lg z-10">
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                                <input
                                    placeholder="Search..."
                                    className="pl-10 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            {/* SORT DROPDOWN */}
                            <div className="relative mb-2">
                                <button
                                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                                    className="w-full p-2 border rounded-lg bg-white text-left"
                                >
                                    Sort: Technical Skills
                                </button>
                                {showSortDropdown && (
                                    <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-1">
                                        <button className="block w-full px-4 py-2 hover:bg-gray-100">Programming</button>
                                        <button className="block w-full px-4 py-2 hover:bg-gray-100">Data Analysis</button>
                                        <button className="block w-full px-4 py-2 hover:bg-gray-100">Web Development</button>
                                        <button className="block w-full px-4 py-2 hover:bg-gray-100">Cloud Computing</button>
                                        <button className="block w-full px-4 py-2 hover:bg-gray-100">Networking</button>
                                    </div>
                                )}
                            </div>

                            {/* PROGRAM DROPDOWN */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowProgramDropdown(!showProgramDropdown)}
                                    className="w-full p-2 border rounded-lg bg-white text-left"
                                >
                                    Program
                                </button>
                                {showProgramDropdown && (
                                    <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 max-h-32 overflow-y-auto">
                                        <button className="block w-full px-4 py-2 hover:bg-gray-100">BSIT</button>
                                        <button className="block w-full px-4 py-2 hover:bg-gray-100">BCS</button>
                                        <button className="block w-full px-4 py-2 hover:bg-gray-100">BIS</button>
                                        <button className="block w-full px-4 py-2 hover:bg-gray-100">BSIS</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* EMPLOYEE DETAILS */}
                    {selectedEmployees.length > 0 && (
                        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-900">
                                📋 Employees at {selectedEmployees[0].company}
                            </h2>
                            <p className="text-gray-700 text-sm">📍 {selectedEmployees[0].address}</p>
                            <p className="text-gray-700 text-sm mt-1">👥 Total Employees: {selectedEmployees.length}</p>
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
            )
            }
        </div >
    );
};

export default ManageMap;
