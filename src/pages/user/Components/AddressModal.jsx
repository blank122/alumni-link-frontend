import React, { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { useGeolocated } from "react-geolocated";
import { useAuth } from "../../../contexts/AuthContext";

const AddressModal = ({ isOpen, onClose }) => {
  const { user, token } = useAuth();

  const [markerPosition, setMarkerPosition] = useState([10.3157, 123.8854]);
  const [newAddress, setNewAddress] = useState({
    full_address: "",
    add_lat: "",
    add_long: "",
  });

  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (coords) {
      const lat = coords.latitude.toFixed(6);
      const long = coords.longitude.toFixed(6);
      setMarkerPosition([parseFloat(lat), parseFloat(long)]);
      setNewAddress((prev) => ({
        ...prev,
        add_lat: lat,
        add_long: long,
      }));
    }
  }, [coords]);

  const handleMapClick = ({ latLng }) => {
    const [lat, long] = latLng;
    setMarkerPosition([lat, long]);
    setNewAddress((prev) => ({
      ...prev,
      add_lat: lat.toFixed(6),
      add_long: long.toFixed(6),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/edit-address/30", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          alumni_id: user.alumni_id,
          ...newAddress,
        }),
      });

      const result = await response.json();
      console.log("Server response:", result);
    //   onClose(); // close modal after success
    } catch (error) {
      console.error("Failed to send address:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[95vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add/Edit Address</h2>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Full Address</label>
          <input
            type="text"
            name="full_address"
            value={newAddress.full_address}
            onChange={handleInputChange}
            placeholder="Enter address"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            type="text"
            name="emp_add_lat"
            value={newAddress.add_lat}
            readOnly
            placeholder="Latitude"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="emp_add_long"
            value={newAddress.add_long}
            readOnly
            placeholder="Longitude"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6 border rounded-md overflow-hidden">
          <Map
            height={300}
            center={markerPosition}
            defaultZoom={15}
            onClick={handleMapClick}
          >
            <Marker width={50} anchor={markerPosition} />
          </Map>
        </div>

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
