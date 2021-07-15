import { useState, useEffect } from 'react';

import {
    useHistory,
    useLocation,
} from "react-router-dom";
import moment from 'moment';

export const useSelectionForm = ({ initialDataForm, defaultDataForm, dateState, setDateState, handleDateCallback, getChartData, scrollRef, setGraphTitle }) => {
    let history = useHistory();
    let location = useLocation();
    //
    //Data Form stuff
    //

    const [dataForm, setDataFormState] = useState(initialDataForm)

    useEffect(() => {
        localStorage.setItem('dataForm', JSON.stringify(dataForm)); //set in Storage each update
        // console.log("dataForm: ", dataForm);
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

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (event) => {

        console.log(location.pathname);

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
                            setGraphTitle(dateState.label)
                            getChartData();
                            scrollRef.current.scrollIntoView();
                        }
                    }
            }
        }


        // if (dataForm["output-group"] === "1") {
        //   history.push("/graph")
        // }
        // setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }

    const handleReset = (event) => {
        setDataFormState(defaultDataForm)
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

    return [dataForm, setDataFormState, handleCheckFormChange, handleRadioFormChange, handleRawDataCheckChange,
        handleSubmit, handleReset,
        showModal, handleShowModal, handleCloseModal]
}