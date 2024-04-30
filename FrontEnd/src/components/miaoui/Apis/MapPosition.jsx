import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

const SelectMapPosition = () => {
  // Load the selected position from localStorage, or use a default position
  const initialPosition = JSON.parse(
    localStorage.getItem("selectedPosition")
  ) || [36.79674933231353, 10.185442316009878];
  const [selectedPosition, setSelectedPosition] = useState(initialPosition);

  // Function to handle map click events and update selected position
  const MapClickHandler = () => {
    const map = useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return null;
  };

  // Save the selected position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedPosition", JSON.stringify(selectedPosition));
  }, [selectedPosition]);

  return (
    <MapContainer
      center={selectedPosition}
      zoom={8}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
      <Marker position={selectedPosition}>
        <Popup>
          <span>This is your Location</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default SelectMapPosition;
