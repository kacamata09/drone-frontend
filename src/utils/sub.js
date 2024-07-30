// sub.js
import mqtt from 'mqtt';

// Konfigurasi broker MQTT
const mqttClient = mqtt.connect('wss://test.mosquitto.org:8080', {
  protocol: 'websockets',
  clientId: 'unique-client-id' // Pastikan ID klien ini unik
});

function sub(topic, callback) {
  mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error(`Failed to subscribe to topic ${topic}:`, err);
      } else {
        console.log(`Subscribed to topic ${topic}`);
      }
    });
  });

  mqttClient.on('message', (topic, message) => {
    
      try {
        const parsedMessage = JSON.parse(message.toString());
        callback(parsedMessage);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    
  });
}

export default sub;
