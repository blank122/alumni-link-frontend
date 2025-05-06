import React, { useState, useEffect, useMemo } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";

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

  const groupedByCompany = useMemo(() => {
    return accounts.reduce((acc, user) => {
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
  }, [accounts]);

  const markers = Object.values(groupedByCompany);
  const clusters = createClusters(markers, zoom);

  const handleBoundsChange = ({ center, zoom }) => {
    setCenter(center);
    setZoom(zoom);
  };

  return (
    <div style={{ height: '100vh' }}>
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
            {cluster.isCluster && (
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
                  <h4>Cluster ({selectedCompany.size} companies)</h4>
                  <p><strong>Location:</strong> {selectedCompany.coordinates[0].toFixed(4)}, {selectedCompany.coordinates[1].toFixed(4)}</p>
                  <p><strong>Total Employees:</strong> {selectedCompany.employees.length}</p>

                  <div style={{ margin: '10px 0', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                    <h5>Companies in this cluster:</h5>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {selectedCompany.originalCompanies.map((company, i) => (
                        <div key={i} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #f5f5f5' }}>
                          <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{company.company_name}</p>
                          <p style={{ fontSize: '0.9em', marginBottom: '4px' }}>
                            Employees: {company.employees.length}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h4>{selectedCompany.company_name}</h4>
                  <p><strong>Location:</strong> {selectedCompany.coordinates[0].toFixed(4)}, {selectedCompany.coordinates[1].toFixed(4)}</p>
                  <p><strong>Employees:</strong> {selectedCompany.employees.length}</p>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {selectedCompany.employees.map((emp, i) => (
                      <div key={i} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #f5f5f5' }}>
                        <strong>{emp.name}</strong><br />
                        <span>{emp.job_title}</span>
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
                  width: '100%'
                }}
              >
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