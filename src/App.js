import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import LiveMeasurements from './components/LiveMeasurements';
import DataSelection from './DataSelection';

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
// import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap-daterangepicker/daterangepicker.css'

import moment from 'moment';

function App() {

  //todo define the structure before... maybe I should use middleware instead?
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
        console.log(myJson.type);
        setSoloarData(myJson)
        console.log(solarData.type);
        console.log(solarData.type);
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
  const [dateState, setDateState] = useState({
    start: moment().subtract(29, 'days'),
    end: moment(),
  });

  const { start, end } = dateState;

  //todo handle, store somewhere? and then pass start, end to the submit call, which... opens a new page?
  const handleDateCallback = (start, end) => {
    setDateState({ start, end });
  };

  const label = start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');

  const [dataForm, setDataFormState] = useState({
    "irradiance-global-horizontal": false,
    "irradiance-direct-normal": false,
    "irradiance-diffuse-horizontal": false,
    "meteorological-pr1-temperature": false,
    "meteorological-ph1-temperature": false,
    "meteorological-pressure": false,
    "meteorological-zenith-angle": false,
    "meteorological-azimuth-angle": false,
    "meteorological-razon-status": false,
    "meteorological-razon-time": false,
    "meteorological-logger-battery": false,
    "meteorological-logger-temp": false,
    "interval-group": "1",
    "output-group": "1",
    "output-raw": false,
    "options-black-white": false,
    "options-english-conversion": false,
  })

  const handleCheckFormChange = (event) => {
    // dataForm
    // console.log("dataForm: " + dataForm);
    setDataFormState({...dataForm, [event.target.name] : event.target.checked });
  }

  const handleRadioFormChange = (event) => {
    // dataForm
    // console.log("dataForm: " + dataForm);
    setDataFormState({...dataForm, [event.target.name] : event.target.value });
  }

  const handleSubmit = (event) => {
    // dataForm
    // console.log("dataForm: " + dataForm);
    // setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
  }

  const handleReset = (event) => {

  }

  useEffect(() => {
    console.log("dataForm: ", dataForm);
    console.log("interval group", dataForm["interval-group"])
    // console.log("global horizon: "+dataForm["irradiance-global-horizontal"])
  }, [dataForm]);

  // todo handle Events
  // Raw Data radio should disable all checkboxes... and graph radio?
  // English conversion should be linked to the other checkboxes, also convert the live data
  // reset button resets all checkboxes and radio to default
  // save previous options in cache???



  return (
    <div className="App">
      <Header className="App-header" />

      <section className="App-main" id="main-header">
        <div>
          <h1>UR Optics Solar Radiation Research Laboratory (RaZON+)</h1>
          <h1>Current Irradiance and Meteorological Conditions</h1>
        </div>
      </section>
      <hr />

      <main className="App-main">

        <section className="App-main-section" id="App-main-live">
          <LiveMeasurements solarData={solarData} />
        </section>

        <section className="App-main-section" id="App-main-data">
          <DataSelection start={start} end={end} handleDateCallback={handleDateCallback} label={label} 
          dataForm={dataForm} setDataFormState={setDataFormState}  handleCheckFormChange={handleCheckFormChange} handleRadioFormChange={handleRadioFormChange}
            handleSubmit={handleSubmit} handleReset={handleReset} />
        </section>

      </main>

      <hr />

      {/* empty div footer */}
      <div style={{ paddingBottom: "60px" }} ></div>

    </div>
  );
}

export default App;

