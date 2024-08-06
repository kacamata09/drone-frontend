// Kamera Streaming
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Marker from '../maps/Marker';
import { publishMessage } from '../../utils/mqttClient';
import sub from '../../utils/sub';

const Device1 = () => {
  const initialLocation = {
    latitude: '',
    longitude: '',
    altitude: '',
  };

  const [location, setLocation] = useState({
    latitude: -6.91099623162968,
    longitude: 107.59489115335117,
    altitude: 117,
  });

  const [locationForm, setLocationForm] = useState(initialLocation);
  const [arming, setArming] = useState("arming");
  const [fly_mode, setFlyMode] = useState("terbang_tinggi");
  const [lastActive, setLastActive] = useState(new Date().toLocaleString());
  const [videoUrl] = useState('https://3cf4-182-253-194-22.ngrok-free.app/'); // State to hold the video stream URL

  const handleUpdateLocation = (newLocation) => {
    setLocation({
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
      altitude: newLocation.altitude,
    });
    setLastActive(new Date().toLocaleString());
  };

  // Subscribe Fake Device Drone
  useEffect(() => {
    const topic = 'kpkirei/pubdrone';
    sub(topic, handleUpdateLocation);
    return () => { };
  }, []);

  const handleMapClick = (lat, lon) => {
    setLocationForm({
      ...location,
      latitude: lat,
      longitude: lon,
    });
  };

  const handleChangeLocation = (e) => {
    const { value, name } = e.target;
    if (!isNaN(value)) {
      setLocation({
        ...location,
        [name]: Number(value),
      });
    }
  };

  const handleSubmitLocation = async (e) => {
    e.preventDefault();
    try {
      publishMessage('kirei/drone/latlon', JSON.stringify({
        latitude: parseFloat(locationForm.latitude),
        longitude: parseFloat(locationForm.longitude),
        altitude: parseFloat(locationForm.altitude),
      }));
      console.log('Location submitted:', locationForm);

      // Reset locationForm state to initial values
      setLocationForm(initialLocation);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChangeCB = (e) => {
    const { value, name } = e.target;
    if (name === "arming") {
      setArming(value);
    }

    if (name === "fly_mode") {
      setFlyMode(value);
    }
  };

  const handleSubmitArming = async (e) => {
    e.preventDefault();
    try {
      console.log('Publishing arming message:', arming);
      publishMessage('kirei/drone/arming', JSON.stringify({ arming }));
      console.log('Arming submitted:', arming);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitFlyMode = async (e) => {
    e.preventDefault();
    try {
      console.log('Publishing fly mode message:', fly_mode);
      publishMessage('kirei/drone/flymode', JSON.stringify({ fly_mode }));
      console.log('Fly mode submitted:', fly_mode);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col xl={8}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Maps Location</Card.Title>
            </Card.Header>
            <Card.Body>
              <Marker
                lat={location.latitude}
                lon={location.longitude}
                onMapClick={handleMapClick}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card className="user-list">
            <Card.Header>
              <Card.Title as="h5">Data From Device</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="pie_1">Latitude</span>
                    </td>
                    <td>
                      <h6 className="m-0">{location.latitude}</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="pie_2">Longitude</span>
                    </td>
                    <td>
                      <h6 className="m-0">{location.longitude}</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="pie_2">Altitude</span>
                    </td>
                    <td>
                      <h6 className="m-0">{location.altitude}</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="pie_2">Fly Mode</span>
                    </td>
                    <td>
                      <h6 className="m-0">ON</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="pie_2">Last Active</span>
                    </td>
                    <td>
                      <h6 className="m-0">{lastActive}</h6>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Video Stream</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3" controlId="videoUrl">
                <Form.Label>Video Stream URL</Form.Label>
              </Form.Group>
              {videoUrl && (
                <div style={{ textAlign: 'center' }}>
                  <iframe
                    src={videoUrl}
                    width="100%"
                    height="400"
                    allowFullScreen
                    title="Video Stream"
                  ></iframe>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Input Location Auto Pilot</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <form onSubmit={handleSubmitLocation}>
                    <Form.Group className="mb-3" controlId="latitude">
                      <Form.Label>Latitude</Form.Label>
                      <Form.Control style={{ color: "black" }} id="latitude" name="latitude" value={locationForm.latitude} onChange={handleChangeLocation} type="text" placeholder="latitude" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="longitude">
                      <Form.Label>Longitude</Form.Label>
                      <Form.Control style={{ color: "black" }} id="longitude" name="longitude" value={locationForm.longitude} onChange={handleChangeLocation} type="text" placeholder="longitude" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="altitude">
                      <Form.Label>Altitude</Form.Label>
                      <Form.Control style={{ color: "black" }} id="altitude" name="altitude" value={locationForm.altitude} onChange={handleChangeLocation} type="text" placeholder="altitude" />
                    </Form.Group>
                    <Button type="submit" id="location" variant="primary">Submit</Button>
                  </form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Arming & Disarming</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <form onSubmit={handleSubmitArming}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                      <Form.Control name='arming' onChange={handleChangeCB} as="select">
                        <option value="arming">arming</option>
                        <option value="disarming">disarming</option>
                      </Form.Control>
                    </Form.Group>
                    <Button type="submit" id="arming" name="arming" variant="primary">Submit</Button>
                  </form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Fly Mode</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <form onSubmit={handleSubmitFlyMode}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                      <Form.Control name='fly_mode' onChange={handleChangeCB} as="select">
                        <option value="terbang_tinggi">terbang_tinggi</option>
                        <option value="terbang_rendah">terbang_rendah</option>
                      </Form.Control>
                    </Form.Group>
                    <Button type="submit" id="fly_mode" name="fly_mode" variant="primary">Submit</Button>
                  </form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Device1;
