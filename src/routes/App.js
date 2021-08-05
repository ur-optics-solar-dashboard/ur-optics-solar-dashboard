import React, { useState, useEffect,useContext } from 'react';

import Header from '../Components/Header';
import LiveMeasurements from '../Components/LiveMeasurements';
import DataSelection from '../Components/DataSelection';

//hooks
import { useSelectionForm } from '../Hooks/useSelectionForm';


//defaults
import { initialShowSelectionTrue } from '../DefaultConstants';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { DataFormContext } from '../contexts/DataFormContext';

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

/**
 * Main Page Component @ /
 */
const App = () => {
  //todo define the structure before... maybe I should use middleware instead?

  const [handleSubmit, handleReset, 
    showModal, setShowModalState] = useSelectionForm({});

  //
  //initialize stuff
  //
  useEffect(() => {
    // console.log(ranges[localStorage.getItem("dateRangeLabel")][0])
    // api data

  }, [])

  // handle Events
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
            handleSubmit={handleSubmit} handleReset={handleReset}
            initialShowSelection={initialShowSelectionTrue}
            showModal={showModal} setShowModalState={setShowModalState} />
        </section>

        <section className="App-main-section" id="App-main-live">
          <LiveMeasurements />
        </section>

      </main>

      <hr />

      {/* empty div footer */}
      <div style={{ paddingBottom: "60px" }} ></div>

    </div>
  );
}

export default App;