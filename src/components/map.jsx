import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const locations = [
  {
    name: "Malappuram Office",
    position: [10.7200948, 75.9951099],
  },
  {
    name: "Thrissur Office",
    position: [10.5276, 76.2144],
  },
  {
    name: "Kochi Office",
    position: [9.9312, 76.2673],
  },
];

export default function OfficeMap() {
  return (
    <MapContainer
      center={[10.5, 76.1]}
      zoom={8}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((location, index) => (
        <Marker key={index} position={location.position}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}