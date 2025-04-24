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
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Cluster markers based on zoom level and proximity
const createClusters = (markers, zoom, clusterRadius = 50) => {
  // At high zoom levels, show all markers
  if (zoom > 12) return markers.map(marker => ({ ...marker, isCluster: false }));
  
  const clusters = [];
  const processed = new Set();
  
  // Adjust cluster radius based on zoom level
  const dynamicRadius = clusterRadius / Math.pow(2, zoom - 1);
  
  markers.forEach((marker, index) => {
    if (processed.has(index)) return;
    
    const cluster = { ...marker };
    const nearbyIndices = [];
    
    // Find nearby markers
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
  const [cityData, setCityData] = useState({});

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
        
        // You might want to fetch city data here if you have an API for reverse geocoding
        // This would help display city names in clusters
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

  // Group alumni by company name and collect details
  const groupedByCompany = useMemo(() => {
    return accounts.reduce((acc, user) => {
      const employment = user.alumni?.employment_history[0];
      const address = employment?.employment_address;
      if (employment && address) {
        const key = employment.company_name;
        if (!acc[key]) {
          acc[key] = {
            company_name: key,
            coordinates: [parseFloat(address.emp_add_lat), parseFloat(address.emp_add_long)],
            employees: [],
          };
        }

        acc[key].employees.push({
          name: `${user.alumni.alm_first_name} ${user.alumni.alm_last_name}`,
          job_title: employment.job_title,
        });
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
            onClick={() => setSelectedCompany(cluster)}
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
                border: '2px solid white'
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
              padding: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              maxWidth: '250px',
              zIndex: 1000
            }}>
              {selectedCompany.isCluster ? (
                <>
                  <h4>Cluster ({selectedCompany.size} companies)</h4>
                  <p><strong>Location:</strong> {selectedCompany.coordinates[0].toFixed(4)}, {selectedCompany.coordinates[1].toFixed(4)}</p>
                  <p><strong>Total Employees:</strong> {selectedCompany.employees.length}</p>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <ul>
                      {selectedCompany.employees.slice(0, 10).map((emp, i) => (
                        <li key={i}>
                          <strong>{emp.name}</strong><br />
                          <span>{emp.job_title}</span>
                        </li>
                      ))}
                      {selectedCompany.employees.length > 10 && (
                        <li>...and {selectedCompany.employees.length - 10} more</li>
                      )}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <h4>{selectedCompany.company_name}</h4>
                  <p><strong>Total Employees:</strong> {selectedCompany.employees.length}</p>
                  <ul>
                    {selectedCompany.employees.map((emp, i) => (
                      <li key={i}>
                        <strong>{emp.name}</strong><br />
                        <span>{emp.job_title}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <button 
                onClick={() => setSelectedCompany(null)}
                style={{
                  marginTop: '10px',
                  padding: '5px 10px',
                  background: '#FF5722',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
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