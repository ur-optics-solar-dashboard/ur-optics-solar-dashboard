import React from 'react'

import Header from '../components/Header';
import LiveMeasurements from '../components/LiveMeasurements';
import DataSelection from '../components/DataSelection';
import Chart from '../components/Chart';


//hooks
import useDateRangeSelection from '../Hooks/useDateRangeSelection';
import { useSelectionForm } from '../Hooks/useSelectionForm';

import moment from 'moment';

const Graph = () => {
  // Predefined Date Ranges
  // https://projects.skratchdot.com/react-bootstrap-daterangepicker/?path=/story/daterangepicker--predefined-date-ranges
  const ranges = {
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
}
  const [dateState, setDateState, handleDateCallback, label] = useDateRangeSelection({ranges:ranges})

  const defaultDatForm = {
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

  const [dataForm, setDataFormState, handleCheckFormChange, handleRadioFormChange, handleRawDataCheckChange, handleSubmit, handleReset] = useSelectionForm(
      {
        initialDataForm: JSON.parse(localStorage.getItem("dataForm")) || defaultDatForm, 
        defaultDatForm: defaultDatForm,
        setDateState:setDateState
    })

    const initialShowSelection = { showDataSelection: false, showIrradiance: false, showMeteorological: false, showInterval: false, showOutputType: false }
    return (
        <div className="App">
      <Header className="App-header" />

      <section className="App-main" id="main-header">
        <div>
          <h1>UR Optics Solar Radiation Research Laboratory (RaZON+)</h1>
          <h1>Irradiance and Meteorological Conditions Graph</h1>
        </div>
      </section>
      <hr />

      <main className="App-main">
      <DataSelection 
            //todo useContext to pass these props stuff down?
            start={dateState.start} end={dateState.end} ranges={ranges} handleDateCallback={handleDateCallback} label={label}
            dataForm={dataForm} setDataFormState={setDataFormState} 
            handleCheckFormChange={handleCheckFormChange} handleRadioFormChange={handleRadioFormChange} handleRawDataCheckChange={handleRawDataCheckChange}
            handleSubmit={handleSubmit} handleReset={handleReset}
            initialShowSelection={initialShowSelection} />
          <Chart></Chart>
      </main>

      <hr />

      {/* empty div footer */}
      <div style={{ paddingBottom: "60px" }} ></div>

    </div>
    )
}

export default Graph
