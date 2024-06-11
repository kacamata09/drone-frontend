import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

const BootstrapTable = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Users</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td style={{color:'black'}}>Anshar</td>
                    <td style={{color:'black'}}>The Last</td>
                    <td style={{color:'black'}}>@kacamata09</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td style={{color:'black'}}>Fatih</td>
                    <td style={{color:'black'}}>The Conquer</td>
                    <td style={{color:'black'}}>@fatih</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td style={{color:'black'}}>Larry</td>
                    <td style={{color:'black'}}>The Lobster</td>
                    <td style={{color:'black'}}>@twitter</td>
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

export default BootstrapTable;
