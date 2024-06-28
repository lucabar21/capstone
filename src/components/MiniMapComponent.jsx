import { Icon, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds } from "../redux/actions";
import { Link } from "react-router-dom";
import SearchBarComponent from "./SearchBarComponent";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const LocationMarker = ({ setLatLng }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLatLng(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const MiniMapComponent = ({ setLatLng }) => {
  return (
    <div className="mini-map-container">
      <MapContainer center={[41.5357, 12.3242]} zoom={5.5} scrollWheelZoom={true} doubleClickZoom={true}>
        <SearchBarComponent />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading></MarkerClusterGroup>
        <LocationMarker setLatLng={setLatLng} />
      </MapContainer>
    </div>
  );
};
export default MiniMapComponent;
