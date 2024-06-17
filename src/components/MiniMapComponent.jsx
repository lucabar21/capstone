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
  // const ads = useSelector((state) => state.ads.data);
  // const dispatch = useDispatch();
  // const [markers, setMarkers] = useState([]);

  // useEffect(() => {
  //   dispatch(getAds());
  // }, [dispatch]);

  // Qui riempio l'array di oggetti marker dallo stato globale degli annunci correlati
  // useEffect(() => {
  //   if (ads && ads.length > 0) {
  //     const adsMarkers = ads.map((ad) => {
  //       return {
  //         id: ad.id,
  //         geoCode: [parseFloat(ad.latitude), parseFloat(ad.longitude)],
  //         popUp: `${ad.title}`,
  //       };
  //     });
  //     setMarkers(adsMarkers);
  //   }
  // }, [ads]);

  // const customCluster = (cluster) => {
  //   return new divIcon({
  //     html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
  //     className: "custom-marker-icon",
  //     iconSize: [38, 38, true],
  //   });
  // };

  // // Qui definisco le icone personalizzate per i diversi annunci

  // const dogIcon = new Icon({
  //   iconUrl: "https://img.icons8.com/color/48/dog.png",
  //   // iconUrl: require('../../public/nomefile.svg'), per immagini caricate direttamente dal progetto
  //   iconSize: [38, 38],
  // });

  // const catIcon = new Icon({
  //   iconUrl: "https://img.icons8.com/color/48/cat--v1.png",
  //   iconSize: [30, 30],
  // });

  return (
    <div className="mini-map-container">
      <MapContainer center={[41.5357, 12.3242]} zoom={5.5} scrollWheelZoom={true} doubleClickZoom={true}>
        <SearchBarComponent />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Qui mappo i vari marker e gli do le informazioni prese dall'array. */}
        <MarkerClusterGroup chunkedLoading>
          {/* {markers.map((marker) => (
            <Marker key={marker.id} position={marker.geoCode} icon={dogIcon}>
              <Popup>
                <div className="marker-popup">
                  <span>{marker.popUp}</span>
                  <Link to={`/ad/` + marker.id}>
                    <button>Vai</button>
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))} */}
        </MarkerClusterGroup>
        <LocationMarker setLatLng={setLatLng} />
      </MapContainer>
    </div>
  );
};
export default MiniMapComponent;
