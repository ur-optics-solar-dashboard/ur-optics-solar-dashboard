import React, { useState, useEffect } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * import individual components
 */

//  import { Link } from “react-router-dom”;

//todo change to only import individual components
import { Button, Alert, Card, ListGroup, ListGroupItem, Row, Col, Container,} from 'react-bootstrap';

function App() {
  const tempData = [
    {
      "irradiance": {
        "diffuse_horizontal": 3,
        "direct_normal": 3,
        "global_horizontal": 3
      },
      "meteorological": {
        "azimuth_angle": 3,
        "logger_battery": 3,
        "logger_temp": 3,
        "ph1_temperature": 3,
        "pr1_temperature": 3,
        "pressure": 3,
        "razon_status": 3,
        "razon_time": 3,
        "zenith_angle": 3
      },
      "time": "Fri, 25 Jun 2021 14:41:59 GMT",
      "units": {
        "azimuth_angle": "u",
        "diffuse_horizontal": "u",
        "direct_normal": "u",
        "global_horizontal": "u",
        "logger_battery": "u",
        "logger_temp": "u",
        "ph1_temperature": "u",
        "pr1_temperature": "u",
        "pressure": "u",
        "razon_status": "u",
        "razon_time": "u",
        "zenith_angle": "u"
      }
    }
  ]

  const [solarData, setSoloarData] = useState([]);

  
  /**
   * Obtain data from /data endpoint (similar json as tempData)
   */
  const getData = () => {
    fetch('/data')
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setSoloarData([myJson])
      });
  }

  useEffect(() => {
    getData() // initial data

    const interval = setInterval(() => { //every 1 minute will request for the data again
      getData()
    }, 60 * 1000)


    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="header-text">Dashboard</h1>
      </header>

      <main className="App-main">
        <section className="App-main-header">
          <h1>UR Optics Solar Radiation Research Laboratory (RaZON+)</h1>
          <h1>Current Irradiance and Meteorological Conditions</h1>
          <hr />
        </section>

        <section className="App-main-live" style={{ marginTop: "24px" }}>
          <h2>Live Measurements</h2>
          {/* <p>The current time is {currentTime}.</p> */}
          <Container style={{marginTop:"24px"}}>
          <Row>
          <Col>
            <Card style={{width:'18rem'}}>
              <Card.Body>
                <Card.Title><h3>Irradiance</h3></Card.Title>
              </Card.Body>

              // todo maybe somehow make this into another functional component, prob not too important though
              {solarData.map(item => {
                return (
                  <ListGroup className="list-group-flush">
                    <ListGroupItem key={"item.irradiance.global_horizontal"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>global_horizontal</div>
                        <div>{item.irradiance.global_horizontal} <small style={{ fontWeight: 'lighter' }}> W/m<sup>2</sup></small></div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem key={"item.irradiance.direct_normal"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>direct_normal</div>
                        <div>{item.irradiance.direct_normal} <small style={{ fontWeight: 'lighter' }}> W/m<sup>2</sup></small></div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem key={"item.irradiance.diffuse_horizontal"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>diffuse_horizontal</div>
                        <div>{item.irradiance.diffuse_horizontal} <small style={{ fontWeight: 'lighter' }}> W/m<sup>2</sup></small></div>
                      </div>
                    </ListGroupItem>
                  </ListGroup>
                );
              })}

              <Card.Body>
                {/* empty card body */}
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </Col>

          <Col>
          <Card style={{width:'18rem'}}>
              <Card.Body>
                <Card.Title><h3>Meteorological</h3></Card.Title>
                {/* <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text> */}
              </Card.Body>
              {solarData.map(item => {
                return (
                  <ListGroup className="list-group-flush">
                    <ListGroupItem key={"item.meteorological.pr1_temperature"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>pr1_temperature</div>
                        <div>{item.meteorological.pr1_temperature} &#176;<small style={{ fontWeight: 'lighter' }}>C</small></div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem key={"item.meteorological.ph1_temperature"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>ph1_temperature</div>
                        <div>{item.meteorological.ph1_temperature} &#176;<small style={{ fontWeight: 'lighter' }}>C</small></div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem key={"item.meteorological.pressure"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>pressure</div>
                        <div>{item.meteorological.pressure} <small style={{ fontWeight: 'lighter' }}>mBar</small></div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem key={"item.meteorological.zenith_angle"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>zenith_angle</div>
                        <div>{item.meteorological.zenith_angle} &#176;<small style={{ fontWeight: 'lighter' }}></small></div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem key={"item.meteorological.azimuth_angle"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>azimuth_angle</div>
                        <div>{item.meteorological.azimuth_angle} &#176;<small style={{ fontWeight: 'lighter' }}></small></div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem key={"item.meteorological.razon_status"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>razon_status</div>
                        <div>{item.meteorological.razon_status} <small style={{ fontWeight: 'lighter' }}></small></div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem key={"item.meteorological.razon_time"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>razon_time</div>
                        <div>{item.meteorological.razon_time} <small style={{ fontWeight: 'lighter' }}>hhmm</small></div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem key={"item.meteorological.logger_battery"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>logger_battery</div>
                        <div>{item.meteorological.logger_battery} <small style={{ fontWeight: 'lighter' }}>VDC</small></div>
                      </div>
                    </ListGroupItem>
                    <ListGroupItem key={"item.meteorological.logger_temp"}>
                      <div class="d-flex justify-content-between">
                        <div style={{ fontWeight: 'bolder' }}>logger_temp</div>
                        <div>{item.meteorological.logger_temp} &#176;<small style={{ fontWeight: 'lighter' }}>C</small></div>
                      </div>
                    </ListGroupItem>
                    
                  </ListGroup>
                );
              })}

              {/* <ListGroup className="list-group-flush">
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
              </ListGroup> */}
              <Card.Body>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </Col>
          </Row>
          </Container>
          
          <Alert variant="success">Test Button</Alert>
          <Button>Test Button</Button>
          {/* <p>The current time is {currentTime}.</p> */}
        </section>
      </main>


    </div>
  );
}

export default App;

