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
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        width: '300px'
      }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <FiSearch style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666'
            }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employee or company..."
              style={{
                width: '100%',
                padding: '8px 8px 8px 35px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                <FiX />
              </button>
            )}
          </div>
          <button
            type="submit"
            style={{
              marginLeft: '8px',
              padding: '8px 12px',
              background: '#3388ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FiSearch style={{ marginRight: '5px' }} />
            Search
          </button>
        </form>

        {/* Search Results Info */}
        {showSearchResults && searchTerm && (
          <div style={{ marginTop: '10px', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
            <p style={{ margin: 0, fontSize: '14px', display: 'flex', alignItems: 'center' }}>
              <FiUsers style={{ marginRight: '5px' }} />
              <strong>{filteredAccounts.length}</strong> {filteredAccounts.length === 1 ? 'result' : 'results'} found
            </p>
            <p style={{ margin: '5px 0 0', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
              <FiBriefcase style={{ marginRight: '5px' }} />
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
              <div style={{
                background: '#FF5722',
                borderRadius: '50%',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                border: '2px solid white',
                cursor: 'pointer',
                pointerEvents: 'auto'
              }}>
                {cluster.size}
              </div>
            ) : (
              <div style={{
                background: '#3388ff',
                borderRadius: '50%',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '30px',
                border: '2px solid white',
                cursor: 'pointer',
                pointerEvents: 'auto'
              }}>
                <FiMapPin />
              </div>
            )}
          </Marker>
        ))}

        {selectedCompany && (
          <Overlay anchor={selectedCompany.coordinates} offset={[120, 30]}>
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              maxWidth: '300px',
              zIndex: 1000
            }}>
              {selectedCompany.isCluster ? (
                <>
                  <h4 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                    <FiUsers style={{ marginRight: '5px' }} />
                    Cluster ({selectedCompany.size} companies)
                  </h4>
                  <p style={{ margin: '5px 0', display: 'flex', alignItems: 'center' }}>
                    <FiMapPin style={{ marginRight: '5px' }} />
                    <strong>Location:</strong> {selectedCompany.coordinates[0].toFixed(4)}, {selectedCompany.coordinates[1].toFixed(4)}
                  </p>
                  <p style={{ margin: '5px 0', display: 'flex', alignItems: 'center' }}>
                    <FiUsers style={{ marginRight: '5px' }} />
                    <strong>Total Employees:</strong> {selectedCompany.employees.length}
                  </p>

                  <div style={{ margin: '10px 0', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                    <h5 style={{ display: 'flex', alignItems: 'center', margin: '0 0 10px' }}>
                      <FiBriefcase style={{ marginRight: '5px' }} />
                      Companies in this cluster:
                    </h5>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {selectedCompany.originalCompanies.map((company, i) => (
                        <div key={i} style={{ 
                          marginBottom: '8px', 
                          paddingBottom: '8px', 
                          borderBottom: '1px solid #f5f5f5',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <FiBriefcase style={{ marginRight: '8px', flexShrink: 0 }} />
                          <div>
                            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{company.company_name}</p>
                            <p style={{ fontSize: '0.9em', margin: 0 }}>
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
                  <h4 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                    <FiBriefcase style={{ marginRight: '5px' }} />
                    {selectedCompany.company_name}
                  </h4>
                  <p style={{ margin: '5px 0', display: 'flex', alignItems: 'center' }}>
                    <FiMapPin style={{ marginRight: '5px' }} />
                    <strong>Location:</strong> {selectedCompany.coordinates[0].toFixed(4)}, {selectedCompany.coordinates[1].toFixed(4)}
                  </p>
                  <p style={{ margin: '5px 0', display: 'flex', alignItems: 'center' }}>
                    <FiUsers style={{ marginRight: '5px' }} />
                    <strong>Employees:</strong> {selectedCompany.employees.length}
                  </p>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {selectedCompany.employees.map((emp, i) => (
                      <div key={i} style={{ 
                        marginBottom: '8px', 
                        paddingBottom: '8px', 
                        borderBottom: '1px solid #f5f5f5',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <FiUsers style={{ marginRight: '8px', flexShrink: 0 }} />
                        <div>
                          <strong>{emp.name}</strong><br />
                          <span style={{ fontSize: '0.9em' }}>{emp.job_title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <button
                onClick={() => setSelectedCompany(null)}
                style={{
                  marginTop: '10px',
                  padding: '8px 15px',
                  background: '#FF5722',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FiX style={{ marginRight: '5px' }} />
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