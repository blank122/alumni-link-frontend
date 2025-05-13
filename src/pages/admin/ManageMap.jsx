import React, { useState, useEffect, useMemo } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
import { FiSearch, FiX, FiUsers, FiMapPin, FiBriefcase } from 'react-icons/fi';

// Helper function to calculate distance between coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const createClusters = (markers, zoom, clusterRadius = 30) => {
  if (zoom > 10) return markers.map(marker => ({ ...marker, isCluster: false }));

  const clusters = [];
  const processed = new Set();
  const dynamicRadius = clusterRadius / Math.pow(2, zoom - 1);
  markers.forEach((marker, index) => {
    if (processed.has(index)) return;

    const cluster = { ...marker };
    const nearbyIndices = [];

    markers.forEach((otherMarker, otherIndex) => {
      if (index === otherIndex || processed.has(otherIndex)) return;
      const distance = getDistance(
        marker.coordinates[0], marker.coordinates[1],
        otherMarker.coordinates[0], otherMarker.coordinates[1]
      );
      if (distance * 1000 <= dynamicRadius) { // Convert km to meters
        nearbyIndices.push(otherIndex);
      }
    });

    // If there are nearby markers, create a cluster
    if (nearbyIndices.length > 0) {
      const allMarkers = [marker, ...nearbyIndices.map(i => markers[i])];

      // Calculate average position for the cluster
      const avgLat = allMarkers.reduce((sum, m) => sum + m.coordinates[0], 0) / allMarkers.length;
      const avgLon = allMarkers.reduce((sum, m) => sum + m.coordinates[1], 0) / allMarkers.length;

      // Combine all employees from the cluster
      const allEmployees = allMarkers.flatMap(m => m.employees);

      cluster.coordinates = [avgLat, avgLon];
      cluster.employees = allEmployees;
      cluster.isCluster = true;
      cluster.size = allMarkers.length;

      // Mark all clustered markers as processed
      nearbyIndices.forEach(i => processed.add(i));
    } else {
      cluster.isCluster = false;
      cluster.size = 1;
    }

    clusters.push(cluster);
    processed.add(index);
  });

  return clusters;
};

const ManageMap = () => {
  const { token } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [center, setCenter] = useState([14.5995, 120.9842]);
  const [zoom, setZoom] = useState(11);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

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
        console.log('Total records received:', response.data.data.length);
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

  const markers = Object.values(groupedByCompany);
  const clusters = createClusters(markers, zoom);

  const handleBoundsChange = ({ center, zoom }) => {
    setCenter(center);
    setZoom(zoom);
  };

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
      {/* Search Bar */}
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
        {clusters.map((cluster, idx) => (
          <Marker
            key={idx}
            width={cluster.isCluster ? 40 + Math.min(cluster.size, 10) * 3 : 30}
            anchor={cluster.coordinates}
            onClick={() => setSelectedCompany({
              ...cluster,
              // For clusters, we'll add the original companies information
              originalCompanies: cluster.isCluster
                ? markers.filter(m =>
                  getDistance(
                    m.coordinates[0], m.coordinates[1],
                    cluster.coordinates[0], cluster.coordinates[1]
                  ) * 1000 <= (30 / Math.pow(2, zoom - 1))
                )
                : [cluster]
            })}
            color={cluster.isCluster ? '#FF5722' : '#3388ff'}
          >
            {cluster.isCluster ? (
              <div className={`
        bg-[#FF5722] rounded-full w-full h-full
        flex justify-center items-center text-white
        font-bold text-sm border-2 border-white
        cursor-pointer pointer-events-auto
      `}>
                {cluster.size}
              </div>
            ) : (
              <div className={`
                  bg-[#3388ff] rounded-full w-full h-full
                  flex justify-center items-center text-white
                  font-bold text-[30px] border-2 border-white
                  cursor-pointer pointer-events-auto
                `}>
                <FiMapPin />
              </div>
            )}
          </Marker>
        ))}

        {selectedCompany && (
          <Overlay anchor={selectedCompany.coordinates} offset={[120, 30]}>
            <div className="bg-white rounded-lg p-4 shadow-lg max-w-[300px] z-[1000]">
              {selectedCompany.isCluster ? (
                <>
                  <h4 className="m-0 mb-2 flex items-center">
                    <FiUsers className="mr-1" />
                    Cluster ({selectedCompany.size} companies)
                  </h4>
                  <p className="m-1 flex items-center">
                    <FiMapPin className="mr-1" />
                    <strong>Location:</strong> {selectedCompany.coordinates[0].toFixed(4)}, {selectedCompany.coordinates[1].toFixed(4)}
                  </p>
                  <p className="m-1 flex items-center">
                    <FiUsers className="mr-1" />
                    <strong>Total Employees:</strong> {selectedCompany.employees.length}
                  </p>

                  <div className="my-2 border-t border-gray-200 pt-2">
                    <h5 className="flex items-center m-0 mb-2">
                      <FiBriefcase className="mr-1" />
                      Companies in this cluster:
                    </h5>
                    <div className="max-h-[200px] overflow-y-auto">
                      {selectedCompany.originalCompanies.map((company, i) => (
                        <div key={i} className="mb-2 pb-2 border-b border-gray-100 flex items-center">
                          <FiBriefcase className="mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-bold mb-1">{company.company_name}</p>
                            <p className="text-sm m-0">
                              Employees: {company.employees.length}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="m-0 mb-2 flex items-center">
                    <FiBriefcase className="mr-1" />
                    {selectedCompany.company_name}
                  </h4>
                  <p className="m-1 flex items-center">
                    <FiMapPin className="mr-1" />
                    <strong>Location:</strong> {selectedCompany.coordinates[0].toFixed(4)}, {selectedCompany.coordinates[1].toFixed(4)}
                  </p>
                  <p className="m-1 flex items-center">
                    <FiUsers className="mr-1" />
                    <strong>Employees:</strong> {selectedCompany.employees.length}
                  </p>
                  <div className="max-h-[200px] overflow-y-auto">
                    {selectedCompany.employees.map((emp, i) => (
                      <div key={i} className="mb-2 pb-2 border-b border-gray-100 flex items-center">
                        <FiUsers className="mr-2 flex-shrink-0" />
                        <div>
                          <strong>{emp.name}</strong><br />
                          <span className="text-sm">{emp.job_title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <button
                onClick={() => setSelectedCompany(null)}
                className="mt-2 px-4 py-2 bg-[#FF5722] text-white border-none rounded cursor-pointer w-full flex items-center justify-center"
              >
                <FiX className="mr-1" />
                Close
              </button>
            </div>
          </Overlay>
        )}
      </Map>
    </div>
  );
};

export default ManageMap;