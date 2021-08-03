import { useState, useEffect, useContext } from 'react';

import { defaultDataForm } from '../DefaultValues';

import {
    useHistory,
    useLocation,
} from "react-router-dom";
import moment from 'moment';

export const useSelectionForm = ({ initialDataForm, handleDateCallback, getChartData, scrollRef }) => {
    let history = useHistory();
    let location = useLocation();
    //
    //Data Form stuff
    //


    const [dataForm, setDataFormState] = useState(initialDataForm);

    useEffect(() => {
        localStorage.setItem('dataForm', JSON.stringify(dataForm)); //set in Storage each update
        // console.log("dataForm: ", dataForm);
    }, [dataForm]);
    
    /**
     * handle when the checkboxes changes in the form
     * @param  {} event
     */
    const handleCheckFormChange = (event) => { setDataFormState({ ...dataForm, [event.target.name]: event.target.checked }); }

    /**
     * handle when the radio button changes in the form
     * @param  {} event
     */
    const handleRadioFormChange = (event) => { setDataFormState({ ...dataForm, [event.target.name]: event.target.value }); }

    /**
     * handle when the raw checkbox changes in the form
     * @param  {} event
     */
    const handleRawDataCheckChange = (event) => {
        if (dataForm["output-group"] === "1") {
            //todo strange bug, for some reason, this line of code does not work if I have the regular setdataformstate. 
            // Workaround: detect if raw data === true and outputgroup === 1, then we assume outputgroup = 2
            setDataFormState({ ...dataForm, "output-group": "2" });
        }
        setDataFormState({ ...dataForm, [event.target.name]: event.target.checked });
    }

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    /**
     * handle when the submit button is clicked
     * @param  {} event
     */
    
    const handleSubmit = (event) => {
        // console.log(location.pathname);

        let noSelection = true

        for (var key in dataForm) {
            if (key.startsWith("irradiance") || key.startsWith("meteorological")) {
                if (dataForm[key]) {
                    noSelection = false
                    break
                }
            }
        }

        if (noSelection) {
            handleShowModal();
        } else {
            //handle bug
            if (dataForm["output-raw"] && dataForm["output-group"] === "1") {
                console.log("csv raw and output-group");
                history.push("/csv");
            }

            switch (dataForm["output-group"]) {
                case "2":
                    //todo prob not going to new page... just download the thing
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
                            // if we are already at graph, then we have to recall getChartData() from the backend
                            getChartData();
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
        setDataFormState(defaultDataForm)
        const start = moment()
        const end = moment()
        handleDateCallback(start, end, "Today") //reset back to initial value
        localStorage.removeItem("dataForm")
        localStorage.removeItem("dateRangeLabel")
        localStorage.removeItem("dateStart")
        localStorage.removeItem("dateEnd")
    }

    return [dataForm, setDataFormState, handleCheckFormChange, handleRadioFormChange, handleRawDataCheckChange,
        handleSubmit, handleReset,
        showModal, handleShowModal, handleCloseModal]
}