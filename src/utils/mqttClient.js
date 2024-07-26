import mqtt from 'mqtt';


// const mqtt_client = mqtt.connect(process.env.MQTT_BROKER);

const mqtt_client = mqtt.connect('wss://test.mosquitto.org:8081', {
    protocol: 'websockets',
    clientId: 'rrereresdffs' //This can be any unique id
 })

mqtt_client.on('connect', () => {
    console.log('Connected to MQTT broker');
});

mqtt_client.on('error', (error) => {
    console.error('MQTT client error:', error);
});

mqtt_client.on('message', (topic, message) => {
    console.log(message.toString())
});
  



export const publishMessage = (topic, message) => {
  mqtt_client.publish(topic, message, (err) => {
    console.log('kirim')
    if (err) {
      console.error('Failed to publish message:', err);
    } else {
      console.log(`Message published to ${topic}`);
    }
  });
};

export const subscribeToTopic = (topic, callback) => {
  mqtt_client.subscribe(topic, (err) => {
    if (err) {
      console.error(`Failed to subscribe to topic ${topic}:`, err);
    } else {
      console.log(`Subscribed to topic ${topic}`);
    }
  });

  mqtt_client.on('message', (topic, message) => {
    callback(message.toString());
  });
};

