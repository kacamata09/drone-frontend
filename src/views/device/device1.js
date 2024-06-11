import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

// import { Link } from 'react-router-dom';
import apiClient from '../../utils/apiclient';
import Marker from '../maps/Marker';

const Device1 = () => {

  // const [topic, setTopic] = useState("");
  // const [dataTo, setDaTopic] = useState("");
  const [location, setLocation] = useState({
    latitude : -6.91099623162968,
    longitude :  107.59489115335117,
    altitude :  117,
  });

  const handleChangeLocation = (e) => {
    const { value, name } = e.target;
    const loc = {}
    loc[name] = Number(value)
    setLocation({
      ...location,
      ...loc
    });
  };

  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   setTopic(value);
  // };
  
  // const handleChange2 = async (e) => {
  //   e.preventDefault();
  //   try {

  //     const data = await apiClient.get('/drone/' + topic + '/latest')
  //     setDaTopic(data);
  //     console.log('Success:', data);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const handleSubmitLocation = async (e) => {
    e.preventDefault();
    try {

      const data = await apiClient.post('/drone/publish', {
      topic : "kirei/drone/latlon",
      message: {
        latitude: location.latitude,
        longitude: location.longitude,
        altitude: location.altitude, 
        }
      })
      setDaTopic(data);
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('oi mina')
  //   try {
  //     const data = await apiClient.post('/drone/subscribe/' + topic)
      
  //     console.log('Success:', data);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };


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
                  <form onSubmit={handleSubmitLocation}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select">
                      <option>arming</option>
                      <option>disarming</option>
                    </Form.Control>
                  </Form.Group>
                  <Button type='submit' id='location'  variant="primary">Submit</Button>
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
                  <form onSubmit={handleSubmitLocation}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select">
                      <option>arming</option>
                      <option>disarming</option>
                    </Form.Control>
                  </Form.Group>
                  <Button type='submit' id='location'  variant="primary">Submit</Button>
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
