import { useState, useContext } from 'react';

import { defaultDataForm } from '../DefaultConstants';

import {
    useHistory,
    useLocation,
} from "react-router-dom";
import moment from 'moment';
import { DataFormContext } from '../contexts/DataFormContext';

/** @typedef StateSetter */
/**
 * Custom Hook that handles button presses that interacts outside of DataSelection.js
 * @param  {{getChartData: function}} props
 * @returns {[handleSubmit: function, handleReset: function, showModal: boolean, setShowModalState: StateSetter]} array
 */
export const useSelectionForm = ({ getChartData }) => {
    let history = useHistory();
    let location = useLocation();

    //
    //Data Form stuff
    //
    const {dataForm, dateState, setDataFormState, handleDateCallback, scrollRef} = useContext(DataFormContext);
    /** Shows the popup stopping from submitting nothing */
    const [showModal, setShowModalState] = useState(false);

    /**
     * handle when the submit button is clicked
     * @param  {} event
     */
    const handleSubmit = (event) => {

        let noSelection = true

        for (var key in dataForm) {
            // go through check if there is no in the dataForm
            if (key.startsWith("irradiance") || key.startsWith("meteorological")) {
                if (dataForm[key]) {
                    noSelection = false
                    break
                }
            }
        }

        if (noSelection) {
            setShowModalState(true);
        } else {
            //handle bug
            if (dataForm["output-raw"] && dataForm["output-group"] === "1") {
                console.log("csv raw and output-group");
                history.push("/csv");
            }

            switch (dataForm["output-group"]) {
                case "2":
                    //todo prob not going to new page... just download the csv
                    history.push("/csv");
                    break;
                case "3":
                    history.push("/zip-compressed");
                    break;
                default: // case "1"
                    //handle bug
                    if (dataForm["output-raw"] && dataForm["output-group"] === "1") {
                        console.log("handle the bug???");
                        history.push("/csv");
                    } else {
                        if(location.pathname !== "/graph"){
                            history.push("/graph");   
                        }else{
                            // if we are already at graph, then we have to call getChartData() again to get the data from the backend
                            getChartData({dataForm: dataForm, start: dateState.start, end: dateState.end, aggregated: true});
                            scrollRef.current.scrollIntoView();
                        }
                    }
            }
        }
    }

    /**
     * handle when the reset button is clicked
     * @param  {} event
     */
    const handleReset = (event) => {
        //reset dataform to be empty
        setDataFormState(defaultDataForm)

        const start = moment()
        const end = moment()
        handleDateCallback(start, end, "Today") //reset the datepicker back to initial value

        // empty localstorage
        localStorage.removeItem("dataForm")
        localStorage.removeItem("dateRangeLabel")
        localStorage.removeItem("dateStart")
        localStorage.removeItem("dateEnd")
    }

    return [handleSubmit, handleReset,
        showModal, setShowModalState]
}