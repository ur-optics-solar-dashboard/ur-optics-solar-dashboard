import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useParams
} from "react-router-dom";
import moment from 'moment';

export const useSelectionForm = ({initialDataForm, defaultDatForm, setDateState, handleDateCallback}) => {
    let history = useHistory();
    //
    //Data Form stuff
    //

    const [dataForm, setDataFormState] = useState(initialDataForm)

    useEffect(() => {
        localStorage.setItem('dataForm', JSON.stringify(dataForm)); //set in Storage each update
        console.log("dataForm: ", dataForm);
    }, [dataForm]);

    const handleCheckFormChange = (event) => { setDataFormState({ ...dataForm, [event.target.name]: event.target.checked }); }
    const handleRadioFormChange = (event) => { setDataFormState({ ...dataForm, [event.target.name]: event.target.value }); }
    const handleRawDataCheckChange = (event) => {
        if (dataForm["output-group"] === "1") {
            //todo strange bug, for some reason, this line of code does not work if I have the regular setdataformstate. 
            // Workaround: detect if raw data === true and outputgroup === 1, then we assume outputgroup = 2
            setDataFormState({ ...dataForm, ["output-group"]: "2" });
        }
        setDataFormState({ ...dataForm, [event.target.name]: event.target.checked });
    }

    const handleSubmit = (event) => {

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
                    history.push("/graph");
                }
        }
        // if (dataForm["output-group"] === "1") {
        //   history.push("/graph")
        // }
        // setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }

    const handleReset = (event) => {
        setDataFormState(defaultDatForm)
        // setDateState({ start, end });
        const start = moment()
        const end = moment()
        handleDateCallback(start, end, "Today") //reset back to initial value
        localStorage.removeItem("dataForm")
        localStorage.removeItem("dateRangeLabel")
        localStorage.removeItem("dateStart")
        localStorage.removeItem("dateEnd")
        // history.push("/");
    }

    return [dataForm, setDataFormState, handleCheckFormChange, handleRadioFormChange, handleRawDataCheckChange, handleSubmit, handleReset]
}