import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

// Configurazione icona di default di Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const GeolocationComponent = () => {
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Aggiunge un marker per indicare la posizione attuale
        L.marker([latitude, longitude]).addTo(map).bindPopup("Tu sei qui");
      });
    }
  }, [map]);

  return null;
};
export default GeolocationComponent;
