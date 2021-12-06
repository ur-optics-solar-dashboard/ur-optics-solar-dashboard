
import moment from "moment";
import React from "react"
import { useState } from "react";
import { defaultDataForm, ranges } from "../DefaultConstants";
import useGraph from "../hooks/useGraph";
import { getExactData } from "../Utils";

export const GlobalContext = React.createContext();

/**
 * Provides Global Context for values that need to be passed globally
 * @param  {object} {children}
 */
export const GlobalContextProvider = ({ children }) => {

    /**
     * Returns an object containing the range of date stored in localstorage
     * If it was a provided range, then returns that provided range with respect to today's date
     * 
     * @returns {{string:moment, string:moment}} {"startDate": moment,"endDate": moment}
     */
     const getStartEnd = () => {
        let dateLabel = localStorage.getItem("dateRangeLabel")
        // console.log(localStorage.getItem("dateRangeLabel"))
        if (dateLabel === "Custom Range") {
            return [moment(localStorage.getItem('dateStart')), moment(localStorage.getItem('dateEnd'))]
        }
        else if (dateLabel !== null && dateLabel !== "Custom Range") {
            return [moment(ranges[localStorage.getItem("dateRangeLabel")][0]), moment(ranges[localStorage.getItem("dateRangeLabel")][1])];

        } else {
            return [moment(), moment()];
        }
    }

    /**
     * Returns formatted date label from `start` to `end` dates
     * @param {moment} start 
     * @param {moment} end 
     * @returns {string} formated date label
     */
    const getDateLabel = (start, end) => {
        return start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY');
    }

    /** Data Form data */
    const [dataForm, setDataFormState] = React.useState(JSON.parse(localStorage.getItem("dataForm")) || defaultDataForm);

    /** Date for data form state */
    const [dateState, setDateState] = React.useState({
        start: getStartEnd()[0],
        end: getStartEnd()[1],
        label: getDateLabel(getStartEnd()[0], getStartEnd()[1])
    });

    /** Graph Title that updates during onSubmit of form */
    const [graphTitle, setGraphTitle] = React.useState(dateState.label);

    /** datePicker reference */
    const dateReference = React.useRef();

    /** reference to scroll to after submitting */
    const scrollRef = React.useRef(null);

    /** Callback that handles when the date changes in date picker */
    const handleDateCallback = (start, end, label) => {

        dateReference.current.setStartDate(start);
        dateReference.current.setEndDate(end);

        setDateState({ start: start, end: end, label: start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY') });

        localStorage.setItem('dateStart', start);
        localStorage.setItem('dateEnd', end);
        localStorage.setItem('dateRangeLabel', label);
    };

    /** Every time dataForm is updated, update it in localstorage */
    React.useEffect(() => {
        localStorage.setItem('dataForm', JSON.stringify(dataForm)); //set in Storage each update
    }, [dataForm]);

    /** show the graph for the dashboard */
    // const [showGraph, setShowGraph] = useState(false);

    const [graphData, setGraphData, graphLines, setGraphLines, 
        irridianceGraphLines, setIrridianceGraphLines, meteorologicalGraphLines, setMeteorologicalGraphLines] = useGraph();

    const [selectedIrridianceOptions, setSelectedIrridianceOptions] = useState([]);
    const [selectedMeteorologicalOptions, setSelectedMeteorologicalOptions] = useState([]);

    /** the query part of the request (after ?), which should be the same as the one used for the backend api */
    const [queryFetchString, setQueryFetchString] = useState("");

    /**
   * Fetch chart data from backend and handle chart states
   * @param {{dataForm: object, start: moment, end: moment}} params
   */
  const getChartData = ({ start, end }) => {
    console.log("fetching data...");
    console.log("selectedIrridianceOptions",selectedIrridianceOptions);

    //build query fetch array
    let queryArray = [];
    selectedIrridianceOptions.forEach(irr => {
      queryArray.push(irr.label);
    });
    selectedMeteorologicalOptions.forEach(met => {
      queryArray.push(met.label);
    });
    console.log(queryArray);

    const startFormatted = moment(start).format("YYYY-MM-DD");
    const endFormatted = moment(end).format("YYYY-MM-DD");

    if (queryArray.length > 0) {
      setGraphTitle('Loading data...'); //TODO: add a spinner
      getExactData(startFormatted, endFormatted, queryArray)
      .then(response => {
        if (response !== null) {
          setGraphTitle(startFormatted + ' to ' + endFormatted);
          console.log(response);
          setGraphData(response);

          //TODO: setGraphLines
          setGraphLines(queryArray);

          //setIrridianceGraphLines
          let irridianceLinesList = [];
          selectedIrridianceOptions.forEach(irr => {
            irridianceLinesList.push(irr.label);
          });
          setIrridianceGraphLines(irridianceLinesList);

          //setMeteorologicalGraphLines
          let meteorologicalLinesList = [];
          selectedMeteorologicalOptions.forEach(met => {
            meteorologicalLinesList.push(met.label);
          });
          setMeteorologicalGraphLines(meteorologicalLinesList);
        }
        else { //response is null, no data :(
          setGraphTitle('Data not found')
        }
      })

    } else {
      setGraphTitle('No data selected');
    }
  }

    return (
        <GlobalContext.Provider value={{getStartEnd:getStartEnd, getDateLabel:getDateLabel, dateReference:dateReference, dateState:dateState, setDateState:setDateState, handleDateCallback:handleDateCallback,
          graphTitle:graphTitle, setGraphTitle:setGraphTitle,
          dataForm:dataForm, setDataFormState:setDataFormState,
          scrollRef:scrollRef,
          graphData:graphData, setGraphData:setGraphData, graphLines:graphLines, setGraphLines:setGraphLines, irridianceGraphLines:irridianceGraphLines, setIrridianceGraphLines:setIrridianceGraphLines, meteorologicalGraphLines:meteorologicalGraphLines, setMeteorologicalGraphLines:setMeteorologicalGraphLines,
          selectedIrridianceOptions:selectedIrridianceOptions, setSelectedIrridianceOptions:setSelectedIrridianceOptions, selectedMeteorologicalOptions:selectedMeteorologicalOptions, setSelectedMeteorologicalOptions:setSelectedMeteorologicalOptions,
          queryFetchString:queryFetchString, setQueryFetchString:setQueryFetchString,
          getChartData }}>
            {children}
        </GlobalContext.Provider>
    )
}