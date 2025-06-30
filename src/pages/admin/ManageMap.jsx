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
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [center, setCenter] = useState([14.5995, 120.9842]);
  const [zoom, setZoom] = useState(11);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
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
      radius: 60,
      maxZoom: 17,
      minZoom: 3,
      extent: 256,
      nodeSize: 64
    });
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/clustering-data`
          , {
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

    if (token) fetchData();
  }, [token]);

  // Filter accounts based on search term (original implementation)
  const filteredAccounts = useMemo(() => {
    if (!searchTerm) return accounts;

    const term = searchTerm.toLowerCase();
    return accounts.filter(account => {
      const fullName = `${account.alumni?.alm_first_name || ''} ${account.alumni?.alm_last_name || ''}`.toLowerCase();
      const companyName = account.alumni?.employment_history?.[0]?.company_name?.toLowerCase() || '';

      return fullName.includes(term) || companyName.includes(term);
    });
  }, [accounts, searchTerm]);

  // Group data by company (modified to use filtered accounts)
  const groupedByCompany = useMemo(() => {
    return filteredAccounts.reduce((acc, user) => {
      try {
        if (!user.alumni) return acc;

        const employment = user.alumni?.employment_history?.[0];
        if (!employment) return acc;

        const address = employment?.employment_address;
        if (!address) return acc;

        const lat = parseFloat(address.emp_add_lat);
        const lng = parseFloat(address.emp_add_long);

        if (isNaN(lat) || isNaN(lng)) return acc;

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
          accountId: user.id // Keep reference to original account
        });
      } catch (error) {
        console.error('Error processing user:', user, error);
      }

      return acc;
    }, {});
  }, [filteredAccounts]);

  // Prepare data for clustering
  const points = useMemo(() => {
    return Object.values(groupedByCompany).map(company => ({
      type: 'Feature',
      properties: {
        cluster: false,
        ...company,
        point_count: company.employees.length
      },
      geometry: {
        type: 'Point',
        coordinates: [company.coordinates[1], company.coordinates[0]] // [lng, lat]
      }
    }));
  }, [groupedByCompany]);

  // Update clusters when data or view changes
  const clusters = useMemo(() => {
    if (!superclusterRef.current || !bounds || points.length === 0) return [];

    try {
      superclusterRef.current.load(points);
      return superclusterRef.current.getClusters(
        [bounds.west, bounds.south, bounds.east, bounds.north],
        Math.floor(zoom)
      );
    } catch (error) {
      console.error("Error calculating clusters:", error);
      return [];
    }
  }, [points, zoom, bounds]);

  const handleBoundsChange = ({ bounds: mapBounds, center, zoom }) => {
    setCenter(center);
    setZoom(zoom);

    if (mapBounds && mapBounds[0] && mapBounds[1]) {
      setBounds({
        west: mapBounds[0][0],
        south: mapBounds[0][1],
        east: mapBounds[1][0],
        north: mapBounds[1][1]
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSearchResults(true);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSearchResults(false);
  };

  const clusterAnalysis = useMemo(() => {
    return clusters.map(cluster => {
      const {
        cluster: isCluster,
        point_count: pointCount,
        ...properties
      } = cluster.properties;

      const coordinates = cluster.geometry?.coordinates;
      if (!coordinates || coordinates.length < 2) {
        console.warn('Missing coordinates for cluster:', cluster);
        return null;
      }

      if (!isCluster) {
        return {
          type: 'company',
          company_name: properties.company_name,
          employee_count: properties.employees?.length || 0,
          coordinates: [coordinates[1], coordinates[0]] // [lat, lng]
        };
      }

      const clusterCompanies = superclusterRef.current
        ?.getLeaves(cluster.id, Infinity)
        .map(leaf => leaf.properties) || [];

      const totalEmployees = clusterCompanies.reduce(
        (acc, comp) => acc + (comp.employees?.length || 0),
        0
      );

      return {
        type: 'cluster',
        cluster_size: pointCount,
        employee_count: totalEmployees,
        coordinates: [coordinates[1], coordinates[0]] // [lat, lng]
      };
    }).filter(Boolean); // remove any nulls
  }, [clusters]);


  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      {/* Search Bar - Original implementation */}
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

        {showSearchResults && searchTerm && (
          <div className="mt-2 p-2 bg-gray-50 rounded">
            <p className="m-0 text-sm flex items-center">
              <FiUsers className="mr-1" />
              <strong>{filteredAccounts.length}</strong> {filteredAccounts.length === 1 ? 'result' : 'results'} found
            </p>
            <p className="mt-1 text-sm flex items-center">
              <FiBriefcase className="mr-1" />
              <strong>{Object.keys(groupedByCompany).length}</strong> {Object.keys(groupedByCompany).length === 1 ? 'company' : 'companies'} displayed
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
            point_count: pointCount,
            ...properties
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                anchor={[latitude, longitude]}
                onClick={() => {
                  // Get all companies in this cluster
                  const clusterCompanies = superclusterRef.current
                    .getLeaves(cluster.id, Infinity)
                    .map(leaf => leaf.properties);

                  setSelectedCompany({
                    coordinates: [latitude, longitude],
                    isCluster: true,
                    size: pointCount,
                    employees: clusterCompanies.flatMap(c => c.employees),
                    originalCompanies: clusterCompanies,
                    company_name: `${pointCount} Companies`
                  });
                }}
              >
                <div className={`
                  bg-[#FF5722] rounded-full 
                  flex justify-center items-center text-white
                  font-bold text-sm border-2 border-white
                  cursor-pointer pointer-events-auto
                  ${pointCount < 10 ? 'w-10 h-10' :
                    pointCount < 50 ? 'w-12 h-12' :
                      'w-14 h-14'}
                `}>
                  {pointCount}
                </div>
              </Marker>
            );
          }

          // Single company marker
          return (
            <Marker
              key={`company-${properties.company_name}-${idx}`}
              anchor={[latitude, longitude]}
              onClick={() => setSelectedCompany({
                ...properties,
                coordinates: [latitude, longitude],
                isCluster: false,
                size: 1
              })}
            >
              <div className={`
                bg-[#3388ff] rounded-full w-8 h-8
                flex justify-center items-center text-white
                font-bold text-[20px] border-2 border-white
                cursor-pointer pointer-events-auto
              `}>
                <FiBriefcase />
              </div>
            </Marker>
          );
        })}

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

      <div>
        <div className=" bg-white rounded-lg p-4 shadow-md w-8xl max-h-[90vh] overflow-y-auto">
          <h4 className="text-lg font-semibold mb-3">Cluster-Based Alumni Summary</h4>
          {clusterAnalysis.length === 0 ? (
            <p className="text-sm text-gray-500">No clusters available.</p>
          ) : (
            clusterAnalysis.map((item, index) => (
              <div key={index} className="mb-3 border-b pb-2 text-sm">
                <p>
                  <strong>{item.type === 'cluster' ? `Cluster of ${item.cluster_size} companies` : item.company_name}</strong>
                </p>
                <p>
                  📍 <strong>Coords:</strong> {item.coordinates[0].toFixed(2)}, {item.coordinates[1].toFixed(2)}
                </p>
                <p>👥 <strong>Employees:</strong> {item.employee_count}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default ManageMap;