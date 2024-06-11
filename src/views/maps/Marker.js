// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import { compose } from 'recompose';

// const MapWithAMarker = compose(
//   withScriptjs,
//   withGoogleMap
// )(({ lat, lon}) => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: lat, lng: lon }}>
//     <Marker position={{ lat: lat, lng: lon }} />
//   </GoogleMap>
// ));



import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css"

// Menetapkan ikon default Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});


const MapWithAMarker = ({lat , lon}) => {
  const position = [lat, lon]; // Coordinates for the map center
  
  return (
    <MapContainer scrollWheelZoom={false} center={position} zoom={17} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={[-6.90, 107.59489115335117]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

MapWithAMarker.propTypes = {
  lat: Number,
  lon: Number,
};

export default MapWithAMarker;
