import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

// import { Link } from 'react-router-dom';
import apiClient from '../../utils/apiclient';
import Marker from '../maps/Marker';
import { publishMessage, subscribeToTopic } from '../../utils/mqttClient';
// import mqtt from 'mqtt'

const Device1 = () => {

// var latestMessages = new Map()

  // var isLoggedIn = true
  // const token = localStorage.getItem('accessToken')
  // console.log(token)
  // if (token) {
  //   isLoggedIn = true
  // } else {
    //   isLoggedIn = false
    // }
    
  const [location, setLocation] = useState({
    latitude : -6.91099623162968,
    longitude :  107.59489115335117,
    altitude :  117,
  });

  const [locationForm, setLocationForm] = useState({
    latitude : -6.91099623162968,
    longitude :  107.59489115335117,
    altitude :  117,
  });

  const getLatlon = (message) => {
    if (!message) {
      console.log('apalah')
    } else {

      const dataLatlon = JSON.parse(message)
      console.log(message)
      setLocation(
        {
          latitude : dataLatlon.latitude,
          longitude : dataLatlon.longitude,
          altitude : dataLatlon.altitude
        }
      )
    }
    console.log(location)
  }
  // mqtt_client.subscribe('kirei/drone/latlon')
  subscribeToTopic('kirei/drone/latlon', getLatlon)
  
  const[arming, setArming] = useState("arming")
  const[fly_mode, setFlyMode] = useState("terbang_tinggi")
  
  const handleChangeLocation = (e) => {
    const { value, name } = e.target;
    const loc = {}
    console.log(Number.isInteger((value)))
    if (Number.isInteger(Number(value))) {
      loc[name] = Number(value)
      setLocationForm({
        ...locationForm,
        ...loc
      });
    }
  };
  
  
  const handleSubmitLocation = async (e) => {
    e.preventDefault();
    try {

      // const data = await apiClient.post('/mqtt/publish', body)
      publishMessage('kirei/drone/latlon', JSON.stringify({
        latitude: locationForm.latitude,
        longitude: locationForm.longitude,
        altitude: locationForm.altitude, 
        }))

      
      // console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleChangeCB = (e) => {
    const { value, name } = e.target;
    if (name == "arming") {
      setArming(value)
      console.log('namemeee', name)
      console.log(value)
    }

    if (name == "fly_mode") {
      setFlyMode(value)
      console.log('namemeee', name)
      console.log(value)
    }

  };

  const handleSubmitArming = async (e) => {
    e.preventDefault();
    try {
      const data = await apiClient.post('/mqtt/publish', {
      topic : "kirei/drone/arming",
      message: {arming} }
      )
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitFlyMode = async (e) => {
    e.preventDefault();
    try {
      const data = await apiClient.post('/mqtt/publish', {
      topic : "kirei/drone/flymode",
      message: {fly_mode} }
      )
      console.log('Success:', data);
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
              // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAChufWiMfwsmyX3Se1dRaN4t31z0xmIMo&v=3.exp&libraries=geometry,drawing,places"
              // loadingElement={<div style={{ height: `100%` }} />}
              // containerElement={<div style={{ height: `400px` }} />}
              // mapElement={<div style={{ height: `100%` }} />}
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
                    {/* <th>Completed</th>
                    <th>Status</th>
                    <th>Date</th> */}
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
                  </tr
                  >
                  <tr>
                    <td>
                      <span className="pie_2">Altitude</span>
                    </td>
                    <td>
                      <h6 className="m-0">20.2235</h6>
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
                      <h6 className="m-0">September 4, 2017</h6>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        {/* {isLoggedIn ? <>   */}
        <Col xl={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Input Location Auto Pilot</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <form onSubmit={handleSubmitLocation}>
                  <Form.Group  className="mb-3" controlId="latitude">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control style={{color: "black"}}  id="latitude" name="latitude"
                     onChange={handleChangeLocation} type="text" placeholder="latitude" />
                  </Form.Group>
                  <Form.Group  className="mb-3" controlId="longitude">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control style={{color: "black"}}  id="longitude" name="longitude"
                     onChange={handleChangeLocation} type="text" placeholder="longitude" />
                  </Form.Group>
                  <Form.Group  className="mb-3" controlId="altitude">
                    <Form.Label>Altitude</Form.Label>
                    <Form.Control style={{color: "black"}}  id="altitude" name="altitude"
                    onChange={handleChangeLocation} type="text" placeholder="altitude" />
                  </Form.Group>
                  <Button type='submit' id='location'  variant="primary">Submit</Button>
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
                    <Button type='submit' id='arming' name='arming' variant="primary">Submit</Button>
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
                      <option value="terbang_miring">terbang_miring</option>
                      <option value="terbang_bebas">terbang_bebas</option>
                    </Form.Control>
                  </Form.Group>
                  <Button type='submit' id='fly_mode' name='fly_mode' variant="primary">Submit</Button>
                  </form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        
        {/* </> : <></> } */}
      </Row>
    </React.Fragment>
  );
};

export default Device1;
