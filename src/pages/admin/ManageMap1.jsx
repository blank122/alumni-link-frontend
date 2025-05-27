import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import Supercluster from 'supercluster';
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
import { FiSearch, FiX, FiUsers, FiMapPin, FiBriefcase } from 'react-icons/fi';

const ManageMap = () => {
    const { token } = useAuth();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [center, setCenter] = useState([14.5995, 120.9842]);
    const [zoom, setZoom] = useState(11);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    // const [bounds, setBounds] = useState(null);
    const [bounds, setBounds] = useState({
        west: -180,
        south: -90,
        east: 180,
        north: 90
    });
    const superclusterRef = useRef();

    // Initialize supercluster
    useEffect(() => {
        superclusterRef.current = new Supercluster({
            radius: 60,          // Cluster radius in pixels
            maxZoom: 17,         // Maximum zoom level where clustering occurs
            minZoom: 3,          // Minimum zoom level where clustering occurs
            extent: 256,         // Tile extent (radius is calculated relative to it)
            nodeSize: 64         // Size of the KD-tree leaf node
        });
    }, []);

    // Fetch data
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

    // Prepare data for clustering
    const points = useMemo(() => {
        return accounts
            .filter(account => {
                const employment = account.alumni?.employment_history?.[0];
                const address = employment?.employment_address;
                if (!address) return false;

                const lat = parseFloat(address.emp_add_lat);
                const lng = parseFloat(address.emp_add_long);
                return !isNaN(lat) && !isNaN(lng);
            })
            .map(account => {
                const employment = account.alumni.employment_history[0];
                const address = employment.employment_address;
                const lat = parseFloat(address.emp_add_lat);
                const lng = parseFloat(address.emp_add_long);

                return {
                    type: 'Feature',
                    properties: {
                        cluster: false,
                        account: account,
                        company_name: employment.company_name || 'Unknown Company',
                        employees: [{
                            name: `${account.alumni.alm_first_name} ${account.alumni.alm_last_name}`,
                            job_title: employment.job_title
                        }]
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    }
                };
            });
    }, [accounts]);

    // Update clusters when data or view changes
    const clusters = useMemo(() => {
        if (!superclusterRef.current || !bounds || points.length === 0) return [];

        superclusterRef.current.load(points);
        return superclusterRef.current.getClusters([bounds.west, bounds.south, bounds.east, bounds.north], zoom);
    }, [points, zoom, bounds]);

    const handleBoundsChange = ({ bounds: mapBounds, center, zoom }) => {
        setCenter(center);
        setZoom(zoom);

        // Safely handle bounds
        if (mapBounds && mapBounds[0] && mapBounds[1]) {
            setBounds({
                west: mapBounds[0][0],
                south: mapBounds[0][1],
                east: mapBounds[1][0],
                north: mapBounds[1][1]
            });
        }
    };

    // Rest of your component (search, etc.) remains the same...
    const filteredAccounts = useMemo(() => {
        if (!searchTerm) return accounts;

        const term = searchTerm.toLowerCase();
        return accounts.filter(account => {
            const fullName = `${account.alumni?.alm_first_name || ''} ${account.alumni?.alm_last_name || ''}`.toLowerCase();
            const companyName = account.alumni?.employment_history?.[0]?.company_name?.toLowerCase() || '';

            return fullName.includes(term) || companyName.includes(term);
        });
    }, [accounts, searchTerm]);

    const groupedByCompany = useMemo(() => {
        return filteredAccounts.reduce((acc, user) => {
            try {
                if (!user.alumni) {
                    console.log('Skipping user - no alumni data:', user);
                    return acc;
                }

                const employment = user.alumni?.employment_history?.[0];
                if (!employment) {
                    console.log('Skipping user - no employment history:', user.alumni);
                    return acc;
                }

                const address = employment?.employment_address;
                if (!address) {
                    console.log('Skipping employment - no address:', employment);
                    return acc;
                }

                const lat = parseFloat(address.emp_add_lat);
                const lng = parseFloat(address.emp_add_long);

                if (isNaN(lat) || isNaN(lng)) {
                    console.log('Skipping - invalid coordinates:', address);
                    return acc;
                }

                const key = employment.company_name || 'Unknown Company';
                if (!acc[key]) {
                    acc[key] = {
                        company_name: key,
                        coordinates: [lat, lng],
                        employees: [],
                    };
                }

                acc[key].employees.push({
                    name: `${user.alumni.alm_first_name} ${user.alumni.alm_last_name}`,
                    job_title: employment.job_title,
                });
            } catch (error) {
                console.error('Error processing user:', user, error);
            }

            return acc;
        }, {});
    }, [filteredAccounts]);

    const handleSearch = (e) => {
        e.preventDefault();
        setShowSearchResults(true);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setShowSearchResults(false);
    };
    return (
        <div style={{ height: '100vh', position: 'relative' }}>
            {/* Your search bar component here... */}
            <div className="absolute top-5 left-5 z-[1000] bg-white rounded-lg p-3 shadow-md w-[300px]">
                <form onSubmit={handleSearch} className="flex items-center">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search employee or company..."
                            className="w-full pl-9 pr-8 py-2 rounded border border-gray-300 text-sm"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-500"
                            >
                                <FiX />
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="ml-2 px-3 py-2 bg-[#3388ff] text-white border-none rounded cursor-pointer flex items-center"
                    >
                        <FiSearch className="mr-1" />
                        Search
                    </button>
                </form>

                {/* Search Results Info */}
                {showSearchResults && searchTerm && (
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                        <p className="m-0 text-sm flex items-center">
                            <FiUsers className="mr-1" />
                            <strong>{filteredAccounts.length}</strong> {filteredAccounts.length === 1 ? 'result' : 'results'} found
                        </p>
                        <p className="mt-1 text-sm flex items-center">
                            <FiBriefcase className="mr-1" />
                            <strong>{markers.length}</strong> {markers.length === 1 ? 'company' : 'companies'} displayed
                        </p>
                    </div>
                )}
            </div>
            <Map
                center={center}
                zoom={zoom}
                height={600}
                onBoundsChanged={handleBoundsChange}
            >
                {clusters.map((cluster, idx) => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {
                        cluster: isCluster,
                        point_count: pointCount
                    } = cluster.properties;

                    if (isCluster) {
                        return (
                            <Marker
                                key={`cluster-${cluster.id}`}
                                anchor={[latitude, longitude]}
                                onClick={() => {
                                    const expansionZoom = Math.min(
                                        superclusterRef.current.getClusterExpansionZoom(cluster.id),
                                        20
                                    );
                                    setZoom(expansionZoom);
                                    setCenter([latitude, longitude]);
                                }}
                            >
                                <div
                                    className="cluster-marker"
                                    style={{
                                        width: `${10 + (pointCount / points.length) * 30}px`,
                                        height: `${10 + (pointCount / points.length) * 30}px`,
                                        borderRadius: '50%',
                                        backgroundColor: '#4285F4',
                                        color: 'white',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        border: '2px solid white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {pointCount}
                                </div>
                            </Marker>
                        );
                    }

                    return (
                        <Marker
                            key={`marker-${cluster.properties.account.id}`}
                            anchor={[latitude, longitude]}
                            onClick={() => setSelectedCluster({
                                ...cluster.properties,
                                coordinates: [latitude, longitude],
                                isCluster: false
                            })}
                        >
                            <div
                                className="company-marker"
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: '#EA4335',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '2px solid white',
                                    cursor: 'pointer'
                                }}
                            >
                                <FiBriefcase />
                            </div>
                        </Marker>
                    );
                })}

                {selectedCluster && (
                    <Overlay anchor={selectedCluster.coordinates} offset={[120, 30]}>
                        <div className="info-window">
                            <h3>
                                {selectedCluster.isCluster ? (
                                    <>{selectedCluster.point_count} Companies</>
                                ) : (
                                    selectedCluster.company_name
                                )}
                            </h3>
                            {/* Rest of your info window content... */}
                        </div>
                    </Overlay>
                )}
            </Map>
        </div>
    );
};

export default ManageMap;