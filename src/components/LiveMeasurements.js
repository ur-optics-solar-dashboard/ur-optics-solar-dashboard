

//todo change to only import individual components
import { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col, Container, Form } from 'react-bootstrap';

/**
 * LiveMeasurements function component for providing live data every minute
 */
const LiveMeasurements = () => {

  // note: the live measurement stuff doesn't interact with any other components
  // Could also create a custom hook for this, but this should be alright, there isn't too much else to do
  const [solarData, setSoloarData] = useState({
    'time': "",
    'irradiance': {
      'global_horizontal': 0,
      'direct_normal': 0,
      'diffuse_horizontal': 0,
    },
    'meteorological': {
      'pr1_temperature': 0,
      'ph1_temperature': 0,
      'pressure': 0,
      'zenith_angle': 0,
      'azimuth_angle': 0,
      'razon_status': 0,
      'razon_time': 0,
      'logger_battery': 0,
      'logger_temp': 0,
    },
    'units': {
      'global_horizontal': "",
      'direct_normal': "",
      'diffuse_horizontal': "",
      'pr1_temperature': "",
      'ph1_temperature': "",
      'pressure': "",
      'zenith_angle': "",
      'azimuth_angle': "",
      'razon_status': "",
      'razon_time': "",
      'logger_battery': "",
      'logger_temp': "",
    }
  });

  const [liveConversion, setLiveConversion] = useState(localStorage.getItem("liveConversion")==="true" || false)
  const handleLiveCheckChange = (event) => { setLiveConversion(event.target.checked); }

  /**
   * Obtain data from /livedata endpoint (similar json as tempData)
   */
     const getData = () => {
      fetch('/livedata')
        .then(function (response) {
          console.log("response: ", response)
          return response.json();
        })
        .then(function (myJson) {
          console.log("response json: ", myJson);
          setSoloarData(myJson)
        });
    }

  useEffect(() => {
    localStorage.setItem('liveConversion', liveConversion); //set in Storage each update
    // console.log("liveConversion: ", liveConversion);
  }, [liveConversion]);

  //
  //initialize stuff
  //
  useEffect(() => {
    // api data
    getData() // initial data

    const interval = setInterval(() => { //every 1 minute will request for the data again
      getData()
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

    return (
        <div>
        <h2>Live Measurements</h2>
        <Form.Check
          type={'checkbox'}
          id={'live-english-conversion'}
          name={'live-english-conversion'}
          checked={liveConversion}
          label={'English Conversion'}
          onChange={handleLiveCheckChange} />
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
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Global Horizontal</div>
                          <div>{solarData.irradiance.global_horizontal} <small style={{ fontWeight: 'lighter' }}> W/m<sup>2</sup></small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.irradiance.direct_normal"}>
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Direct Normal</div>
                          <div>{solarData.irradiance.direct_normal} <small style={{ fontWeight: 'lighter' }}> W/m<sup>2</sup></small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.irradiance.diffuse_horizontal"}>
                        <div className="d-flex justify-content-between">
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
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>PR1 Temperature</div>
                          <div>{solarData.meteorological.pr1_temperature} &#176;<small style={{ fontWeight: 'lighter' }}>C</small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.ph1_temperature"}>
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>PH1 Temperature</div>
                          <div>{solarData.meteorological.ph1_temperature} &#176;<small style={{ fontWeight: 'lighter' }}>C</small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.pressure"}>
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Pressure</div>
                          <div>{solarData.meteorological.pressure} <small style={{ fontWeight: 'lighter' }}>mBar</small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.zenith_angle"}>
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Zenith Angle</div>
                          <div>{solarData.meteorological.zenith_angle} &#176;<small style={{ fontWeight: 'lighter' }}></small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.azimuth_angle"}>
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Azimuth Angle</div>
                          <div>{solarData.meteorological.azimuth_angle} &#176;<small style={{ fontWeight: 'lighter' }}></small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.razon_status"}>
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Razon Status</div>
                          <div>{solarData.meteorological.razon_status} <small style={{ fontWeight: 'lighter' }}></small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.razon_time"}>
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Razon Time</div>
                          <div>{solarData.meteorological.razon_time} <small style={{ fontWeight: 'lighter' }}>hhmm</small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.logger_battery"}>
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: 'bolder' }}>Logger Battery</div>
                          <div>{solarData.meteorological.logger_battery} <small style={{ fontWeight: 'lighter' }}>VDC</small></div>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem key={"solarData.meteorological.logger_temp"}>
                        <div className="d-flex justify-content-between">
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
