import React, { useEffect, useRef, useState, useContext } from 'react'

import Header from '../Components/Header';
import DataSelection from '../Components/DataSelection';
import Chart from '../Components/Chart';

import {
  useLocation
} from "react-router-dom";

//hooks
import { useSelectionForm } from '../Hooks/useSelectionForm';
import moment from 'moment';
import useGraph from '../Hooks/useGraph';

// default values
import { defaultDataForm,initialShowSelectionFalse } from '../DefaultConstants';

import { DataFormContext } from '../contexts/DataFormContext';

/**
 * Graph Page component @ /graph
 */
const Graph = () => {
  
  let location = useLocation()
  let query = new URLSearchParams(location.search);

  const {dataForm, setDataFormState, dateState, graphTitle, setGraphTitle, handleDateCallback} = useContext(DataFormContext);

  // 
  const [graphData, setGraphData, graphLines, setGraphLines, 
    irridianceGraphLines, setIrridianceGraphLines, meteorologicalGraphLines, setMeteorologicalGraphLines] = useGraph();


  //todo: handle interval ourselves because having them chose is a bit unreliable (can cause too many points to be rendered)
  const [queryFetchString, setQueryFetchString] = useState(null);

  //todo: there is probably a way to clean up this stuff a bit more
  /**
   * Fetch chart data from backend and handle chart states
   */
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
          console.log("loading data...");
          setGraphTitle(dateState.label);
          
          setGraphData(myJson["return_data"]);

          setGraphLines(myJson["included_headers"]);

          setIrridianceGraphLines(myJson["irridiance_headers"]);
          setMeteorologicalGraphLines(myJson["meteorological_headers"]);
        });

    } else {
      console.log("no data selected");
      setGraphTitle("No Data Selected");
    }
  }

  const [handleSubmit, handleReset,
    showModal, setShowModalState] = useSelectionForm({getChartData: getChartData});

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

  // example: http://localhost:3000/graph?irradiance-global-horizontal=true&start=2021-01-01&end=2021-12-31
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

  const [queryData, setQueryData] = useState(false)

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
            handleSubmit={handleSubmit} handleReset={handleReset}
            initialShowSelection={initialShowSelectionFalse}
            showModal={showModal} setShowModalState={setShowModalState} />
        </section>
        <div style={{ paddingBottom: "100px" }}></div>
        <section id="App-main-graph" style={{ width: "100%" }} >
          <Chart
            graphData={graphData} graphLines={graphLines}
            irridianceGraphLines={irridianceGraphLines} meteorologicalGraphLines={meteorologicalGraphLines}
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
