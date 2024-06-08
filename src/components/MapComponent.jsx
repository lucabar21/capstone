import { Icon, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const MapComponent = () => {
  // Qui c'è l'array di oggetti marker
  const markers = [
    {
      geoCode: [38.623, 16.528],
      popUp: "Sant'Andrea",
    },
    {
      geoCode: [39.2336, 16.1552],
      popUp: "Rende",
    },
    {
      geoCode: [41.8836, 12.5203],
      popUp: "Roma",
    },
  ];

  const customCluster = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-icon",
      iconSize: [38, 38, true],
    });
  };

  // Qui definisco le icone personalizzate per i diversi annunci

  // const dogIcon = new Icon({
  //   iconUrl: "https://img.icons8.com/color/48/dog.png",
  //   // iconUrl: require('../../public/nomefile.svg'), per immagini caricate direttamente dal progetto
  //   iconSize: [38, 38],
  // });

  const catIcon = new Icon({
    iconUrl: "https://img.icons8.com/color/48/cat--v1.png",
    iconSize: [30, 30],
  });

  return (
    <div class="map-container">
      <MapContainer center={[41.5357, 12.3242]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Qui mappo i vari marker e gli do le informazioni prese dall'array. */}
        <MarkerClusterGroup chunkedLoading iconCreateFunction={customCluster}>
          {markers.map((marker) => (
            <>
              <Marker position={marker.geoCode} icon={catIcon}>
                <Popup>{marker.popUp}</Popup>
              </Marker>
            </>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
export default MapComponent;
