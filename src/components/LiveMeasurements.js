import React from 'react'


//todo change to only import individual components
import { Card, ListGroup, ListGroupItem, Row, Col, Container, Form } from 'react-bootstrap';

const LiveMeasurements = ({solarData}) => {

    return (
        <div>
        <h2>Live Measurements</h2>
        <Form.Check
          type={'checkbox'}
          id={`options-english-conversion`}
          label={`English Conversion`} />
        {/* <p>The current time is {currentTime}.</p> */}
        <Container style={{ marginTop: "24px" }}>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title><h3>Irradiance</h3></Card.Title>
                </Card.Body>

                {/* // todo maybe somehow make this into another functional component, prob not too important though */}

                    <ListGroup className="list-group-flush">
                      <ListGroupItem key={"solarData.irradiance.global_horizontal"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Global Horizontal</div>
                          <div>{solarData.irradiance.global_horizontal} <small style={{ fontWeight: 'lighter' }}> W/m<sup>2</sup></small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.irradiance.direct_normal"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Direct Normal</div>
                          <div>{solarData.irradiance.direct_normal} <small style={{ fontWeight: 'lighter' }}> W/m<sup>2</sup></small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.irradiance.diffuse_horizontal"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Diffuse Horizontal</div>
                          <div>{solarData.irradiance.diffuse_horizontal} <small style={{ fontWeight: 'lighter' }}> W/m<sup>2</sup></small></div>
                        </div>
                      </ListGroupItem>
                    </ListGroup>


                <Card.Body>

                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title><h3>Meteorological</h3></Card.Title>
                </Card.Body>

                    <ListGroup className="list-group-flush">
                      <ListGroupItem key={"solarData.meteorological.pr1_temperature"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>PR1 Temperature</div>
                          <div>{solarData.meteorological.pr1_temperature} &#176;<small style={{ fontWeight: 'lighter' }}>C</small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.ph1_temperature"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>PH1 Temperature</div>
                          <div>{solarData.meteorological.ph1_temperature} &#176;<small style={{ fontWeight: 'lighter' }}>C</small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.pressure"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Pressure</div>
                          <div>{solarData.meteorological.pressure} <small style={{ fontWeight: 'lighter' }}>mBar</small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.zenith_angle"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Zenith Angle</div>
                          <div>{solarData.meteorological.zenith_angle} &#176;<small style={{ fontWeight: 'lighter' }}></small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.azimuth_angle"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Azimuth Angle</div>
                          <div>{solarData.meteorological.azimuth_angle} &#176;<small style={{ fontWeight: 'lighter' }}></small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.razon_status"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Razon Status</div>
                          <div>{solarData.meteorological.razon_status} <small style={{ fontWeight: 'lighter' }}></small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.razon_time"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Razon Time</div>
                          <div>{solarData.meteorological.razon_time} <small style={{ fontWeight: 'lighter' }}>hhmm</small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.logger_battery"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Logger Battery</div>
                          <div>{solarData.meteorological.logger_battery} <small style={{ fontWeight: 'lighter' }}>VDC</small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.logger_temp"}>
                        <div class="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Logger Temp</div>
                          <div>{solarData.meteorological.logger_temp} &#176;<small style={{ fontWeight: 'lighter' }}>C</small></div>
                        </div>
                      </ListGroupItem>

                    </ListGroup>


                <Card.Body>

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        </div>
    )
}

export default LiveMeasurements
