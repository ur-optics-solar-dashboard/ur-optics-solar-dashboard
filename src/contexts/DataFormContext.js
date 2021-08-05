
import moment from "moment";
import React from "react"
import { defaultDataForm, ranges } from "../DefaultConstants";

// if I need multiple contexts https://stackoverflow.com/questions/53346462/react-multiple-contexts

export const DataFormContext = React.createContext()

/**
 * Provides Global Context for values that need to be passed globally
 * @param  {object} {children}
 */
export const DataFormProvider = ({ children }) => {

    //todo: Should put all dataForm stuff here because it is needed in both App.js and Graph.js, instead of using 2 custom hooks

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

    const getDateLabel = (start, end) => {
        return start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY');
    }

    const [dataForm, setDataFormState] = React.useState(JSON.parse(localStorage.getItem("dataForm")) || defaultDataForm);

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

    //
    const handleDateCallback = (start, end, label) => {

        dateReference.current.setStartDate(start);
        dateReference.current.setEndDate(end);

        setDateState({ start: start, end: end, label: start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY') });

        localStorage.setItem('dateStart', start);
        localStorage.setItem('dateEnd', end);
        localStorage.setItem('dateRangeLabel', label);

        // console.log(st,"type: ", typeof st)
    };

    React.useEffect(() => {
        localStorage.setItem('dataForm', JSON.stringify(dataForm)); //set in Storage each update
        // console.log("dataForm: ", dataForm);
    }, [dataForm]);

    return (
        <DataFormContext.Provider value={{ 
            dataForm: dataForm, setDataFormState: setDataFormState, 
            dateState: dateState, setDateState: setDateState, 
            dateReference:dateReference, 
            scrollRef:scrollRef,
            graphTitle:graphTitle, setGraphTitle:setGraphTitle, 
            handleDateCallback:handleDateCallback 
        }}>
            {children}
        </DataFormContext.Provider>
    )
}