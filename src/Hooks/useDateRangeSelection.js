import React, { useState, useEffect } from 'react';

import moment from 'moment-timezone';

const useDateRangeSelection = ({ranges}) => {
        // Predefined Date Ranges
    // https://projects.skratchdot.com/react-bootstrap-daterangepicker/?path=/story/daterangepicker--predefined-date-ranges


    const getStartEnd = () => {
        let dateLabel = localStorage.getItem("dateRangeLabel")
        console.log(localStorage.getItem("dateRangeLabel"))
        if (dateLabel === "Custom Range") {
            return [moment(localStorage.getItem('dateStart')), moment(localStorage.getItem('dateEnd'))]
        }
        else if (dateLabel !== null && dateLabel !== "Custom Range") {
            return [moment(ranges[localStorage.getItem("dateRangeLabel")][0]), moment(ranges[localStorage.getItem("dateRangeLabel")][1])];

        } else {
            return [moment().subtract(29, 'days'), moment()];
        }
    }

    const [dateState, setDateState] = useState({
        start: getStartEnd()[0],
        end: getStartEnd()[1]
    });

    const { start, end } = dateState;
    //todo handle, store somewhere? and then pass start, end to the submit call, which... opens a new page?
    const handleDateCallback = (start, end, label) => {
        setDateState({ start, end });
        localStorage.setItem('dateStart', start);
        localStorage.setItem('dateEnd', end);
        localStorage.setItem('dateRangeLabel', label);

        // console.log(st,"type: ", typeof st)
    };
    const label = start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');


    return [dateState, setDateState, handleDateCallback, label]
}

export default useDateRangeSelection
