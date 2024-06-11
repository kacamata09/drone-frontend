import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

import Marker from '../maps/Marker';

const Device2 = () => {
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
                lat={-5.23}
                lon={105.12345}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAChufWiMfwsmyX3Se1dRaN4t31z0xmIMo&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card className="user-list">
            <Card.Header>
              <Card.Title as="h5">Monitoring Device</Card.Title>
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
                      <span className="pie_1">Device 1</span>
                    </td>
                    <td>
                      <h6 className="m-0">68%</h6>
                    </td>
                    <td>
                      <h6 className="m-0">October 26, 2017</h6>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className="pie_2">Device 2</span>
                    </td>
                    <td>
                      <h6 className="m-0">46%</h6>
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
      </Row>
    </React.Fragment>
  );
};

export default Device2;
