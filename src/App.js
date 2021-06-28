import React, { useState, useEffect, useCallback } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * import individual components
 */

//  import { Link } from “react-router-dom”;

//todo change to only import individual components
import { Button, Card, ListGroup, ListGroupItem, Row, Col, Container, Form, FormGroup } from 'react-bootstrap';

// DateRangePicker: https://github.com/skratchdot/react-bootstrap-daterangepicker
// react wrapper for https://github.com/dangrossman/daterangepicker
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css'

import moment from 'moment';

function App() {
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

  // Predefined Date Ranges
  // https://projects.skratchdot.com/react-bootstrap-daterangepicker/?path=/story/daterangepicker--predefined-date-ranges
  const [state, setState] = useState({
    start: moment().subtract(29, 'days'),
    end: moment(),
  });
  const { start, end } = state;
  const handleCallback = (start, end) => {
    setState({ start, end });
  };
  const label = start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');

  // todo handle Events
  // Raw Data radio should disable all checkboxes... and graph radio?
  // English conversion should be linked to the other checkboxes, also convert the live data
  // reset button resets all checkboxes and radio to default
  // save previous options in cache???



  return (
    <div className="App">
      <header className="App-header">
        <h1 id="header-text">Dashboard</h1>
      </header>

      <section className="App-main" id="main-header">
        <h1>UR Optics Solar Radiation Research Laboratory (RaZON+)</h1>
        <h1>Current Irradiance and Meteorological Conditions</h1>
      </section>
      <hr />

      <main className="App-main">
        {/* <section className="App-main-header">
          <h1>UR Optics Solar Radiation Research Laboratory (RaZON+)</h1>
          <h1>Current Irradiance and Meteorological Conditions</h1>
          <hr />
        </section> */}

        <section className="App-main-section" id="App-main-live">
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
                <Card style={{ width: '18rem' }}>
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

          {/* <p>The current time is {currentTime}.</p> */}
        </section>

        <section className="App-main-section" id="App-main-data">
          <h2>Data</h2>
          <DateRangePicker
            // todo better predefined ranges that make sense for this product
            initialSettings={{
              startDate: start.toDate(), endDate: end.toDate(), showDropdowns: true,
              ranges: {
                Today: [moment().toDate(), moment().toDate()],
                Yesterday: [
                  moment().subtract(1, 'days').toDate(),
                  moment().subtract(1, 'days').toDate(),
                ],
                'Last 7 Days': [
                  moment().subtract(6, 'days').toDate(),
                  moment().toDate(),
                ],
                'Last 30 Days': [
                  moment().subtract(29, 'days').toDate(),
                  moment().toDate(),
                ],
                'This Month': [
                  moment().startOf('month').toDate(),
                  moment().endOf('month').toDate(),
                ],
                'Last Month': [
                  moment().subtract(1, 'month').startOf('month').toDate(),
                  moment().subtract(1, 'month').endOf('month').toDate(),
                ],
              },
            }} onCallback={handleCallback}>
            <div
              id="reportrange"
              className="col-4"
              style={{
                background: '#fff',
                cursor: 'pointer',
                padding: '5px 10px',
                border: '1px solid #ccc',
                width: '50%',
              }}
            >
              <i className="fa fa-calendar"></i>&nbsp;
              <span>{label}</span> <i className="fa fa-caret-down"></i>
            </div>
          </DateRangePicker>

          <Form>
            <FormGroup style={{ marginTop: "24px" }}>
              <Container>
                <Row>
                  <Col style={{ width: '18rem' }}>
                    <div key={'irradiance-checkbox'} className="mb-3">
                      <h3>Irradiance</h3>
                      <Form.Check
                        type={'checkbox'}
                        id={`irradiance-global-horizontal`}
                        label={`Global Horizontal`} />
                      <Form.Check
                        type={'checkbox'}
                        id={`irradiance-direct-normal`}
                        label={`Direct Normal`} />
                      <Form.Check
                        type={'checkbox'}
                        id={`irradiance-diffuse-horizontal`}
                        label={`Diffuse Horizontal`} />
                    </div>
                  </Col>
                  <Col style={{ width: '18rem' }}>
                    <div key={'meteorological-checkbox'} className="mb-3">
                      <h3>Meteorological</h3>
                      <Form.Check
                        type={'checkbox'}
                        id={`meteorological-pr1-temperature`}
                        label={`PR1 Temperature`} />
                      <Form.Check
                        type={'checkbox'}
                        id={`meteorological-ph1-temperature`}
                        label={`PH1 Temperature`} />
                      <Form.Check
                        type={'checkbox'}
                        id={`meteorological-pressure`}
                        label={`Pressure`} />
                      <Form.Check
                        type={'checkbox'}
                        id={`meteorological-zenith-angle`}
                        label={`Zenith Angle`} />
                      <Form.Check
                        type={'checkbox'}
                        id={`meteorological-azimuth-angle`}
                        label={`Azimuth Angle`} />
                      {/* dup */}
                      <Form.Check
                        type={'checkbox'}
                        id={`meteorological-razon-status`}
                        label={`Razon Status`} />
                      <Form.Check
                        type={'checkbox'}
                        id={`meteorological-razon-time`}
                        label={`Razon Time`} />
                      <Form.Check
                        type={'checkbox'}
                        id={`meteorological-logger-battery`}
                        label={`Logger Battery`} />
                      <Form.Check
                        type={'checkbox'}
                        id={`meteorological-logger-temp`}
                        label={`Logger Temp`} />
                    </div>
                  </Col>
                  <Col style={{ width: '18rem' }}>
                    <div key={`radio-interval`} className="mb-3">
                      <h3>Interval</h3>
                      <Form.Check
                        name="interval-group"
                        type={'radio'}
                        id={`interval-minute`}
                        label={`1-minute`} />
                      <Form.Check
                        name="interval-group"
                        type={'radio'}
                        id={`interval-hourly`}
                        label={`hourly`} />
                      <Form.Check
                        name="interval-group"
                        type={'radio'}
                        id={`interval-daily`}
                        label={`daily`} />
                    </div>
                    <div key={`radio-output`} className="mb-3">
                      <h3>Output Type</h3>
                      <Form.Check
                        name="output-group"
                        type={'radio'}
                        id={`output-graph`}
                        label={`Graph`} />

                      <div key={`radio-download`} className="mb-3" style={{ marginLeft: "24px" }}>
                        <h4 style={{ fontWeight: "normal", opacity: "0.75", marginTop: "12px" }}>Download</h4>
                        <Form.Check
                          name="output-group"
                          type={'radio'}
                          id={`output-ascii`}
                          label={`Ascii Text`} />
                        <Form.Check
                          name="output-group"
                          type={'radio'}
                          id={`output-zip`}
                          label={`Zip Compressed`} />
                      </div>

                      <Form.Check
                        name="output-group"
                        type={'checkbox'}
                        id={`output-raw`}
                        label={`Raw Data`} />
                    </div>

                  </Col>
                </Row>
              </Container>
            </FormGroup>
          </Form>
          <Container style={{ marginTop: "44px" }}>
            <Row>
              <Col className="mb-4" style={{ padding: "0 45px" }} xs={4}>
                <div className="mb-4">
                  <Button variant="primary">Submit</Button>{' '}
                  <Button variant="outline-primary">Reset</Button>{' '}
                </div>
              </Col>
              <Col className="mb-4" xs={3}>
                <div key={'options-checkbox'} className="mb-4">
                  <Form.Check
                    type={'checkbox'}
                    id={`options-black-white`}
                    label={`Black and White Plot`} />
                  <Form.Check
                    type={'checkbox'}
                    id={`options-english-conversion`}
                    label={`English Conversion`} />
                </div>
              </Col>
            </Row>

          </Container>
        </section>
      </main>

      <hr />

      {/* empty div footer */}
      <div style={{ paddingBottom: "60px" }} ></div>

    </div>
  );
}

export default App;

