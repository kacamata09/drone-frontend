import React, { useState, useEffect } from 'react';
import { TileLayer, Marker, Popup, MapContainer, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import PropTypes from 'prop-types';

// Set default icon options
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const MapWithAMarker = ({ lat, lon }) => {
  const initialPosition = [lat, lon];
  const [markerPosition, setMarkerPosition] = useState(initialPosition);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        console.log("Map clicked at:", e.latlng);
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const RoutingControl = () => {
    const map = useMap();

    useEffect(() => {
      if (!markerPosition) return;

      // Remove existing polyline if present
      if (map._polyline) {
        map.removeLayer(map._polyline);
      }

      // Create a polyline
      const polyline = L.polyline([initialPosition, markerPosition], {
        color: 'blue',
        weight: 4,
        opacity: 0.6,
      }).addTo(map);

      // Save reference to polyline for removal
      map._polyline = polyline;

      return () => {
        if (map._polyline) {
          map.removeLayer(map._polyline);
        }
      };
    }, [map, markerPosition]);

    return null;
  };

  return (
    <>
      <style>
        {`
          .leaflet-routing-container {
            display: none;
          }
        `}
      </style>
      <MapContainer scrollWheelZoom={false} center={initialPosition} zoom={17} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <MapClickHandler />
        <RoutingControl />
      </MapContainer>
    </>
  );
};

MapWithAMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default MapWithAMarker;
