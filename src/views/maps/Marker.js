import React, { useState, useEffect } from 'react';
import { TileLayer, Marker, Popup, MapContainer, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import PropTypes from 'prop-types';
import { subscribeToTopic } from '../../utils/mqttClient';

// Set Icon Marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});
const customIcon = L.icon({
  iconUrl: require('../../assets/images/drone.png'), // Adjust path as needed
  iconSize: [42, 42], // Icon size
});

// Main MapWithAMarker Component
const MapWithAMarker = ({ lat, lon, onMapClick }) => {
  const initialPosition = [-6.9104384787805415, 107.5945306950941];
  const [markerPosition, setMarkerPosition] = useState(initialPosition);
  const [marker1Position, setMarker1Position] = useState(initialPosition);


  // Fetch data from MQTT for Drone Marker
  useEffect(() => {
    const getLatlon = (message) => {
      if (!message) {
        console.log('No message received');
      } else {
        const dataLatlon = JSON.parse(message);
        console.log('Received message:', message);
        setLocation({
          latitude: dataLatlon.latitude,
          longitude: dataLatlon.longitude,
          altitude: dataLatlon.altitude
        });
        setMarker1Position([dataLatlon.latitude, dataLatlon.longitude]);
      }
    };

    subscribeToTopic('kirei/drone/latlon', getLatlon);
  }, []);

  // Handles map clicks to update marker position
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        if (onMapClick) onMapClick(lat, lng);
      },
    });
    return null;
  };

  // Adds a polyline between the initial position and the current marker position
  const RoutingControl = () => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;
      if (map._polyline) {
        map.removeLayer(map._polyline);
      }
      const polyline = L.polyline([initialPosition, markerPosition], {
        color: 'blue',
        weight: 4,
        opacity: 0.6,
      }).addTo(map);
      map._polyline = polyline;
      return () => {
        if (map._polyline) {
          map.removeLayer(map._polyline);
        }
      };
    }, [map, markerPosition]);

    return null;
  };

  // Adds marker1 to the map
  const Marker1Control = () => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;
      const marker1 = L.marker(marker1Position, { icon: customIcon }).addTo(map);
      return () => {
        map.removeLayer(marker1);
      };
    }, [map, marker1Position]);

    return null;
  };

  const position = [lat, lon];

  return (
    <MapContainer scrollWheelZoom={false} center={position} zoom={17} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
      <Marker position={markerPosition}>
        <Popup>
          Selected Position: {markerPosition.toString()}
        </Popup>
      </Marker>
      <Marker1Control />
      <RoutingControl />
    </MapContainer>
  );
};

MapWithAMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  onMapClick: PropTypes.func,
};

export default MapWithAMarker;
