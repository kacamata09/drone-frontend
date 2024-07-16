import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import apiClient from '../../utils/apiclient';

const BootstrapTable = () => {
  const [dataUser, setDataUser] = useState(null)
  
  useEffect(()=> {
    const fetchData = async () => {
  
      const data = await apiClient.get('/user')
      setDataUser(data.data.data.data)
        
      console.log(data)
      
    }
    fetchData()
  }, [])
  
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
                  
                {dataUser? dataUser.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">1</th>
                    <td style={{color:'black'}}>{ item.fullname + index }</td>
                    <td style={{color:'black'}}>{ item.email}</td>
                    <td style={{color:'black'}}>{ item.username }</td>
                  </tr>
                  )) : ''}

                  {/* <tr>
                    <th scope="row">1</th>
                    <td style={{color:'black'}}>{ dataUser ? dataUser.data.data.data[0].id : 'ya' }</td>
                    <td style={{color:'black'}}>The Last</td>
                    <td style={{color:'black'}}>@kacamata09</td>
                  </tr> */}
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
