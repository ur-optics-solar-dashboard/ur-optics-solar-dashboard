import React, { useEffect, useRef, useState, useContext } from 'react'

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

// default values
import { defaultDataForm } from '../DefaultValues';
import { DataFormContext } from '../contexts/DataFormContext';


const Graph = () => {
  const scrollRef = useRef(null);
  let location = useLocation()
  let query = new URLSearchParams(location.search);

  const [dataForm, setDataFormState, ] = useContext(DataFormContext);

  // Predefined Date Ranges
  // https://projects.skratchdot.com/react-bootstrap-daterangepicker/?path=/story/daterangepicker--predefined-date-ranges
  const [dateState, setDateState, ranges, handleDateCallback, dateReference, graphTitle, setGraphTitle] = useDateRangeSelection()

  const [graphData, setGraphData, graphLines, setGraphLines,
    irridianceGraphLines, setIrridianceGraphLines, meteorologicalGraphLines, setMeteorologicalGraphLines,
    graphColors,
    downloadSelection, setDownloadSelection, handleChartSubmit,
    defaultGraphOptions, graphOptions, setGraphOptions,
    handleChartCheckFormChange] = useChart();


  //todo: handle interval ourselves because having them chose is a bit unreliable (can cause too many points to be rendered)
  const [queryFetchString, setQueryFetchString]= useState(null);

  const getChartData = () => {
    console.log("fetching data...");
    let query_fetch_array = [];
    for (const field in dataForm) {
      if (dataForm[field] === true) {
        query_fetch_array.push(field + "=true");
      }
    }

    const start = moment(dateState.start).format("YYYY-MM-DD");
    const end = moment(dateState.end).format("YYYY-MM-DD");

    // console.log("query_fetch_array", query_fetch_array)
    if (query_fetch_array.length !== 0) {
      // console.log("query:",`/graph?start=${start}&end=${end}&${query_fetch_array.join("&")}`)
      fetch(`/graph?start=${start}&end=${end}&${query_fetch_array.join("&")}`)
        .then(function (response) {
          // console.log("response: ", response)
          setQueryFetchString(`start=${start}&end=${end}&${query_fetch_array.join("&")}`);
          return response.json();
        })
        .then(function (myJson) {
          // console.log("response json: ", myJson);
          console.log("loading data...")
          setGraphTitle(dateState.label);
          
          setGraphData(myJson["return_data"])

          setGraphLines(myJson["included_headers"])

          setIrridianceGraphLines(myJson["irridiance_headers"])
          setMeteorologicalGraphLines(myJson["meteorological_headers"])
        });

    } else {
      console.log("no data selected");
      setGraphTitle("No Data Selected");
    }
  }

  const [handleCheckFormChange, handleRadioFormChange, handleRawDataCheckChange, handleSubmit, handleReset,
    showModal, handleShowModal, handleCloseModal] = useSelectionForm(
      {
        handleDateCallback: handleDateCallback,
        getChartData: getChartData,
        scrollRef: scrollRef
      })


  const initialShowSelection = { showDataSelection: false, showIrradiance: false, showMeteorological: false, showInterval: false, showOutputType: false }

  /**
   * parse query from the URL and replace localstorage values
   */
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
      setQueryData(true);
      setDataFormState(newQueryObj);
    }

    const start = moment(query.get("start"), "YYYY-MM-DD");
    const end = moment(query.get("end"), "YYYY-MM-DD");

    if (start.isValid() && end.isValid()) {
      handleDateCallback(start, end, 'Custom Range');
    }

  }
// http://localhost:3000/graph?irradiance-global-horizontal=true&start=2021-01-01&end=2021-12-31
  /**
   * Create a link from the current graph query
   * @returns {string} link
   */
  function createQuery() {
    if(graphTitle!=="No Data Selected"){
      return `http://localhost:3000/graph?${queryFetchString}`
    }
    return 'http://localhost:3000/graph'
  }

  const [
    /**
     * 
     */
    queryData, 
    setQueryData
  ] = useState(false)

  const [copyLinkText, setCopyLinkText] = useState(createQuery());

  useEffect(() =>   {
    setCopyLinkText(createQuery());
  }, [queryFetchString]);

  useEffect(() => {
    if(queryData){
      console.log("querying...")
      getChartData();
    }
    setQueryData(false);
  }, [dataForm]);

  useEffect(() => {
    parseQuerySetForm();
    if(location.search === ""){ // no queries
      if(!queryData){ // not currently querying data (and changing it)
        getChartData();
      }
    }
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
            dateState={dateState} ranges={ranges} handleDateCallback={handleDateCallback} dateReference={dateReference} // handles
            handleCheckFormChange={handleCheckFormChange} handleRadioFormChange={handleRadioFormChange} handleRawDataCheckChange={handleRawDataCheckChange} //date functions
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
            handleChartCheckFormChange={handleChartCheckFormChange}
            createQuery={createQuery} copyLinkText={copyLinkText} setCopyLinkText={setCopyLinkText} />
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
