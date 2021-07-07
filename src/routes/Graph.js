import React, {useEffect} from 'react'

import Header from '../Components/Header';
import LiveMeasurements from '../Components/LiveMeasurements';
import DataSelection from '../Components/DataSelection';
import Chart from '../Components/Chart';


//hooks
import useDateRangeSelection from '../Hooks/useDateRangeSelection';
import { useSelectionForm } from '../Hooks/useSelectionForm';

import moment from 'moment';

const Graph = () => {
  // Predefined Date Ranges
  // https://projects.skratchdot.com/react-bootstrap-daterangepicker/?path=/story/daterangepicker--predefined-date-ranges
  const [dateState, setDateState, ranges, handleDateCallback, dateReference] = useDateRangeSelection()

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
      setDateState: setDateState,
      handleDateCallback: handleDateCallback
    })

  const initialShowSelection = { showDataSelection: false, showIrradiance: false, showMeteorological: false, showInterval: false, showOutputType: false }

  // todo: use useEffect to parse query parameters before using the dataForm internal storage for sharable links

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
          start={dateState.start} end={dateState.end} label={dateState.label} ranges={ranges} handleDateCallback={handleDateCallback} dateReference={dateReference}
          dataForm={dataForm} setDataFormState={setDataFormState}
          handleCheckFormChange={handleCheckFormChange} handleRadioFormChange={handleRadioFormChange} handleRawDataCheckChange={handleRawDataCheckChange}
          handleSubmit={handleSubmit} handleReset={handleReset}
          initialShowSelection={initialShowSelection} />
        <div style={{ paddingBottom: "10px" }}></div>

        <Chart></Chart>
        <div style={{ paddingBottom: "32px" }} ></div>
      </main>

      <hr />

      {/* empty div footer */}
      <div style={{ paddingBottom: "64px" }} ></div>

    </div>
  )
}

export default Graph
