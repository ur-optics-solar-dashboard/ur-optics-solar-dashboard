import { useEffect, useState, useContext } from "react";

import Header from "../components/Header";
import DataSelection from "../components/DataSelection";
import Chart from "../components/Chart";

import { useLocation } from "react-router-dom";

//hooks
import { useSelectionForm } from "../hooks/useSelectionForm";
import moment from "moment";
import useGraph from "../hooks/useGraph";

// default values
import {
  defaultDataForm,
  initialShowSelectionFalse,
} from "../DefaultConstants";

import { DataFormContext } from "../contexts/DataFormContext";

/**
 * Graph Page component @ /graph
 */
const Graph = () => {
  //todo: handle interval ourselves because having users chose is a bit unreliable (can cause too many points to be rendered)

  let location = useLocation();
  let query = new URLSearchParams(location.search);

  const {
    dataForm,
    setDataFormState,
    dateState,
    setGraphTitle,
    handleDateCallback,
  } = useContext(DataFormContext);

  const [
    graphData,
    setGraphData,
    graphLines,
    setGraphLines,
    irridianceGraphLines,
    setIrridianceGraphLines,
    meteorologicalGraphLines,
    setMeteorologicalGraphLines,
  ] = useGraph();

  /** Backend and Frontend use the same queries to get the same data currently, so if there is a query in the frontend, we use the same query in the backend */
  const [queryFetchString, setQueryFetchString] = useState(null);

  /**
   * Fetch chart data from backend and handle chart states
   * @param {{dataForm: object, start: moment, end: moment}} params
   */
  const getChartData = ({ dataForm, start, end }) => {
    console.log("fetching data...");
    let query_fetch_array = [];
    for (const field in dataForm) {
      if (true) {
      // if (dataForm[field] === true) {
        query_fetch_array.push(field + "=true");
      }
    }

    const startFormatted = moment(start).format("YYYY-MM-DD");
    const endFormatted = moment(end).format("YYYY-MM-DD");

    if (query_fetch_array.length !== 0) {
      fetch(
        `/graph?start=${startFormatted}&end=${moment(endFormatted).format(
          "YYYY-MM-DD"
        )}&${query_fetch_array.join("&")}`
      )
        .then(function (response) {
          setQueryFetchString(
            `start=${startFormatted}&end=${endFormatted}&${query_fetch_array.join(
              "&"
            )}`
          );
          setCopyLinkText(
            `${window.location.origin.toString()}/graph?start=${startFormatted}&end=${endFormatted}&${query_fetch_array.join(
              "&"
            )}`
          );

          return response.json();
        })
        .then(function (myJson) {
          console.log("loading data...");

          setGraphTitle(dateState.label);

          setGraphData(myJson["return_data"]);

          setGraphLines(myJson["included_headers"]);

          setIrridianceGraphLines(myJson["irridiance_headers"]);
          setMeteorologicalGraphLines(myJson["meteorological_headers"]);
        });
    } else {
      console.log("No Data Selected");
      setGraphTitle("No Data Selected");
    }
  };

  const [handleSubmit, handleReset, showModal, setShowModalState] =
    useSelectionForm({ getChartData: getChartData });

  /**
   * parse query from the URL and replace localstorage values,
   * then call backend api with getChartData
   */
  function parseQuerySetForm() {
    let change = false; // make sure that there are valid query parameters
    const newQueryObj = JSON.parse(JSON.stringify(dataForm)); // quick copy

    for (const field in defaultDataForm) {
      const field_value = query.get(field);
      if (field_value !== null) {
        change = true;
        newQueryObj[field] = field_value === "true";
      }
    }

    if (change) {
      setDataFormState(newQueryObj);
    }

    var start = moment(query.get("start"), "YYYY-MM-DD");
    var end = moment(query.get("end"), "YYYY-MM-DD");

    if (start.isValid() && end.isValid()) {
      handleDateCallback(start, end, "Custom Range");
    } else {
      start = dateState.start;
      end = dateState.end;
    }

    getChartData({ dataForm: newQueryObj, start: start, end: end });
  }

  /**
   * Create a link from the current graph query
   * @example
   * returns http://localhost:3000/graph?irradiance-global-horizontal=true&start=2021-01-01&end=2021-12-31
   *
   * @returns {string} link
   */
  function createQuery() {
    return `${window.location.origin.toString()}/graph?${
      queryFetchString === null ? "" : queryFetchString
    }`;
  }

  /** What the copied link to the current data is */
  const [copyLinkText, setCopyLinkText] = useState(createQuery());

  /** componentDidMount, only on mount do we parse the url for query */
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
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            initialShowSelection={initialShowSelectionFalse}
            showModal={showModal}
            setShowModalState={setShowModalState}
          />
        </section>
        <div style={{ paddingBottom: "100px" }}></div>
        <section id="App-main-graph" style={{ width: "100%" }}>
          <Chart
            graphData={graphData}
            graphLines={graphLines}
            irridianceGraphLines={irridianceGraphLines}
            meteorologicalGraphLines={meteorologicalGraphLines}
            createQuery={createQuery}
            copyLinkText={copyLinkText}
            setCopyLinkText={setCopyLinkText}
          />
        </section>
        <div style={{ paddingBottom: "32px" }}></div>
      </main>

      <hr />

      {/* empty div footer */}
      <div style={{ paddingBottom: "64px" }}></div>
    </div>
  );
};

export default Graph;
