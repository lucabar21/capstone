import { useEffect } from "react";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import "/node_modules/leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";

// Configurazione icona di default di Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const SearchBarComponent = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: { "accept-language": "it", countrycodes: "it" },
    });

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      searchLabel: "Cerca località",
      showMarker: false,
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};
export default SearchBarComponent;
