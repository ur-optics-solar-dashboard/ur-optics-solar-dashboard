import React, { useState, useEffect } from 'react';

import Header from '../Components/Header';
import LiveMeasurements from '../Components/LiveMeasurements';
import DataSelection from '../Components/DataSelection';

//hooks
import useDateRangeSelection from '../Hooks/useDateRangeSelection';
import { useSelectionForm } from '../Hooks/useSelectionForm';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * import individual components
 */

//  import { Link } from “react-router-dom”;
//todo change to only import individual components

// DateRangePicker: https://github.com/skratchdot/react-bootstrap-daterangepicker
// react wrapper for https://github.com/dangrossman/daterangepicker
// import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap-daterangepicker/daterangepicker.css'


// todo https://stackoverflow.com/questions/45086005/recharts-component-to-png

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

  const [liveConversion, setLiveConversion] = useState(localStorage.getItem("liveConversion")==="true" || false)
  useEffect(() => {
    localStorage.setItem('liveConversion', liveConversion); //set in Storage each update
    // console.log("liveConversion: ", liveConversion);
  }, [liveConversion]);

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

  // Predefined Date Ranges
  // https://projects.skratchdot.com/react-bootstrap-daterangepicker/?path=/story/daterangepicker--predefined-date-ranges
  const [dateState, setDateState, ranges, handleDateCallback, dateReference] = useDateRangeSelection()

  const defaultDataForm = {
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
  }

  const [dataForm, setDataFormState, handleCheckFormChange, handleRadioFormChange, handleRawDataCheckChange, handleSubmit, handleReset, 
    showModal, handleShowModal, handleCloseModal] = useSelectionForm(
    {
      initialDataForm: JSON.parse(localStorage.getItem("dataForm")) || defaultDataForm,
      defaultDataForm: defaultDataForm,
      setDateState: setDateState,
      handleDateCallback: handleDateCallback
    })

  const initialShowSelection = { showDataSelection: true, showIrradiance: true, showMeteorological: true, showInterval: true, showOutputType: true }

  //
  //initialize stuff
  //
  useEffect(() => {
    // console.log(ranges[localStorage.getItem("dateRangeLabel")][0])
    // api data
    getData() // initial data

    const interval = setInterval(() => { //every 1 minute will request for the data again
      getData()
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  // todo handle Events
  // Raw Data radio should disable all checkboxes... and graph radio?
  // English conversion should be linked to the other checkboxes, also convert the live data
  // reset button resets all checkboxes and radio to default
  // save previous options in localstorage??? - done...?



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

        <section className="App-main-section" id="App-main-data">
          <DataSelection
            //todo useContext to pass these props stuff down?
            start={dateState.start} end={dateState.end} label={dateState.label} ranges={ranges} handleDateCallback={handleDateCallback} dateReference={dateReference}
            dataForm={dataForm} setDataFormState={setDataFormState}
            handleCheckFormChange={handleCheckFormChange} handleRadioFormChange={handleRadioFormChange} handleRawDataCheckChange={handleRawDataCheckChange}
            handleSubmit={handleSubmit} handleReset={handleReset}
            initialShowSelection={initialShowSelection}
            showModal={showModal} handleShowModal={handleShowModal} handleCloseModal={handleCloseModal} />
        </section>

        <section className="App-main-section" id="App-main-live">
          <LiveMeasurements solarData={solarData}
            liveConversion={liveConversion} setLiveConversion={setLiveConversion} handleLiveCheckChange={handleLiveCheckChange} />
        </section>

      </main>

      <hr />

      {/* empty div footer */}
      <div style={{ paddingBottom: "60px" }} ></div>

    </div>
  );
}

export default App;