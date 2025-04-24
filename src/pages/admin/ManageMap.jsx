import React, { useState, useEffect } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";

const ManageMap = () => {
  const { token } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [center, setCenter] = useState([14.5995, 120.9842]); // Default to Manila

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

  // Group alumni by company name and collect details
  const groupedByCompany = accounts.reduce((acc, user) => {
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

  const markers = Object.values(groupedByCompany);

  return (
    <div style={{ height: '100vh' }}>
      <Map center={center} zoom={11} height={600}>
        {markers.map((company, idx) => (
          <Marker
            key={idx}
            width={50}
            anchor={company.coordinates}
            onClick={() => setSelectedCompany(company)}
          />
        ))}

        {selectedCompany && (
          <Overlay anchor={selectedCompany.coordinates} offset={[120, 30]}>
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              maxWidth: '250px'
            }}>
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
              <button onClick={() => setSelectedCompany(null)}>Close</button>
            </div>
          </Overlay>
        )}
      </Map>
    </div>
  );
};

export default ManageMap;
