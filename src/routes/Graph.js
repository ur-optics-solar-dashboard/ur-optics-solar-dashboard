import React, { useEffect, useRef, useState } from 'react'

import Header from '../Components/Header';
import DataSelection from '../Components/DataSelection';
import Chart from '../Components/Chart';

import {
  useLocation
} from "react-router-dom";

//hooks
import useDateRangeSelection from '../Hooks/useDateRangeSelection';
import { useSelectionForm } from '../Hooks/useSelectionForm';
import moment from 'moment';
import useChart from '../Hooks/useChart';


const Graph = () => {
  const scrollRef = useRef(null);

  const executeScroll = () => scrollRef.current.scrollIntoView();

  let query = new URLSearchParams(useLocation().search);

  // Predefined Date Ranges
  // https://projects.skratchdot.com/react-bootstrap-daterangepicker/?path=/story/daterangepicker--predefined-date-ranges
  const [dateState, setDateState, ranges, handleDateCallback, dateReference, graphTitle, setGraphTitle] = useDateRangeSelection()

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

  
  const [graphData, setGraphData, graphLines, setGraphLines,
    irridianceGraphLines, setIrridianceGraphLines, meteorologicalGraphLines, setMeteorologicalGraphLines,
    graphColors,
    downloadSelection, setDownloadSelection, handleChartSubmit,
    defaultGraphOptions, graphOptions, setGraphOptions,
    handleChartCheckFormChange] = useChart();


  //todo: handle interval ourselves because having them chose is a bit unreliable (can cause too many points to be rendered)
  const getChartData = () => {
    console.log("fetching data...");

    let query_fetch_array = [];
    for (const field in dataForm) {
      if (dataForm[field] === true) {
        query_fetch_array.push(field + "=true");
      }
    }

    console.log("query_fetch_array", query_fetch_array)
    if (query_fetch_array.length !== 0) {

      fetch(`/graph?${query_fetch_array.join("&")}`)
        .then(function (response) {
          // console.log("response: ", response)
          return response.json();
        })
        .then(function (myJson) {
          // console.log("response json: ", myJson);
          console.log("loading data...")
          setGraphData(myJson["return_data"])

          setGraphLines(myJson["included_headers"])

          setIrridianceGraphLines(myJson["irridiance_headers"])
          setMeteorologicalGraphLines(myJson["meteorological_headers"])
        });

    } else {
      console.log("no data selected")
      setGraphTitle("No Data Selected")
    }
  }

  const [dataForm, setDataFormState, handleCheckFormChange, handleRadioFormChange, handleRawDataCheckChange, handleSubmit, handleReset,
    showModal, handleShowModal, handleCloseModal] = useSelectionForm(
      {
        initialDataForm: JSON.parse(localStorage.getItem("dataForm")) || defaultDataForm,
        defaultDataForm: defaultDataForm,
        setDateState: setDateState,
        handleDateCallback: handleDateCallback,
        getChartData: getChartData,
        scrollRef: scrollRef,
        dateState: dateState,
        setGraphTitle: setGraphTitle
      })


  // console.log("QWEFFFFF", query.get("qef") || JSON.parse(localStorage.getItem("dataForm")) || defaultDataForm)
  const initialShowSelection = { showDataSelection: false, showIrradiance: false, showMeteorological: false, showInterval: false, showOutputType: false }

  // todo: parse query parameters before using the dataForm internal storage for sharable links
  async function parseQuerySetForm() {
    let change = false
    const newQueryObj = JSON.parse(JSON.stringify(defaultDataForm)); //quick copy

    for (const field in defaultDataForm) {
      const field_value = query.get(field);
      if (field_value !== null) {
        change = true
        newQueryObj[field] = (field_value === "true")
      }
    }

    if (change) {
      setDataFormState(newQueryObj);
    }
    setChangeChartData(true);
    const start = moment(query.get("start"), "YYYY-MM-DD");
    const end = moment(query.get("end"), "YYYY-MM-DD");

    if (start.isValid() && end.isValid()) {
      await handleDateCallback(start, end, 'Custom Range');
      setChangeChartData(true);
    }

  }
// http://localhost:3000/graph?irradiance-global-horizontal=true&start=2021-01-01&end=2021-12-31
  function createQuery() {

  }

  useEffect(() => {
    parseQuerySetForm();
  }, []);

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
        <div style={{ paddingBottom: "100px" }}></div>
        <section id="App-main-graph" style={{ width: "100%" }} >
          <Chart scrollRef={scrollRef} graphTitle={graphTitle}
            graphData={graphData} setGraphData={setGraphData} graphLines={graphLines} setGraphLines={setGraphLines}
            irridianceGraphLines={irridianceGraphLines} setIrridianceGraphLines={setIrridianceGraphLines} meteorologicalGraphLines={meteorologicalGraphLines} setMeteorologicalGraphLines={setMeteorologicalGraphLines}
            graphColors={graphColors}
            downloadSelection={downloadSelection} setDownloadSelection={setDownloadSelection} handleChartSubmit={handleChartSubmit}
            defaultGraphOptions={defaultGraphOptions} graphOptions={graphOptions} setGraphOptions={setGraphOptions}
            handleChartCheckFormChange={handleChartCheckFormChange} />
        </section>
        <div style={{ paddingBottom: "32px" }} ></div>
      </main>

      <hr />

      {/* empty div footer */}
      <div style={{ paddingBottom: "64px" }} ></div>

    </div>
  )
}

export default Graph
