import { useState, useEffect } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import { useGeolocated } from "react-geolocated";

// Sample Alumni Employment Data
const alumniData = [
  { id: 1, name: "John Doe", lat: 14.5995, lng: 120.9842, industry: "IT", batch: 2020 },
  { id: 2, name: "Jane Smith", lat: 37.7749, lng: -122.4194, industry: "Finance", batch: 2018 },
  { id: 3, name: "Alice Johnson", lat: 51.5074, lng: -0.1278, industry: "Education", batch: 2015 },
];

const AlumniGISMap = () => {
  const [filteredData, setFilteredData] = useState(alumniData);
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const { coords } = useGeolocated({ positionOptions: { enableHighAccuracy: true }, userDecisionTimeout: 5000 });

  // Filtering Function
  const filterData = (industry) => {
    setFilteredData(
      industry ? alumniData.filter((alum) => alum.industry === industry) : alumniData
    );
  };

  // Search Function
  const searchByName = (query) => {
    setSearchQuery(query);
    setFilteredData(
      query ? alumniData.filter((alum) => alum.name.toLowerCase().includes(query.toLowerCase())) : alumniData
    );
  };

  // Batch Filtering Function
  const filterByBatch = (batch) => {
    setBatchFilter(batch);
    setFilteredData(
      batch ? alumniData.filter((alum) => alum.batch.toString() === batch) : alumniData
    );
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-md z-10">
        <label>Filter by Industry: </label>
        <select onChange={(e) => filterData(e.target.value)}>
          <option value="">All</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
        </select>
      </div>
      
      <div className="absolute top-16 left-4 bg-white p-2 rounded shadow-md z-10">
        <label>Search by Name: </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => searchByName(e.target.value)}
          placeholder="Enter name"
          className="border p-1 rounded"
        />
      </div>
      
      <div className="absolute top-28 left-4 bg-white p-2 rounded shadow-md z-10">
        <label>Filter by Batch: </label>
        <input
          type="number"
          value={batchFilter}
          onChange={(e) => filterByBatch(e.target.value)}
          placeholder="Enter batch year"
          className="border p-1 rounded"
        />
      </div>
      
      <Map height={600} defaultCenter={[14.5995, 120.9842]} defaultZoom={3}>
        {coords && (
          <Marker
            width={40}
            anchor={[coords.latitude, coords.longitude]}
            color="blue"
          />
        )}
        
        {filteredData.map((alum) => (
          <Marker
            key={alum.id}
            width={40}
            anchor={[alum.lat, alum.lng]}
            onClick={() => setSelectedAlumnus(alum)}
          />
        ))}

        {selectedAlumnus && (
          <Overlay anchor={[selectedAlumnus.lat, selectedAlumnus.lng]} offset={[0, -40]}>
            <div className="bg-white p-2 rounded shadow-md">
              <h3 className="font-bold">{selectedAlumnus.name}</h3>
              <p>Industry: {selectedAlumnus.industry}</p>
              <p>Batch: {selectedAlumnus.batch}</p>
              <button onClick={() => setSelectedAlumnus(null)}>Close</button>
            </div>
          </Overlay>
        )}
      </Map>
    </div>
  );
}
export default AlumniGISMap;
