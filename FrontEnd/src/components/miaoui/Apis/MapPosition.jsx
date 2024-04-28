import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapPosition = ({ lat, lon }) => {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon]}>
        <Popup>This is You're Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapPosition;
