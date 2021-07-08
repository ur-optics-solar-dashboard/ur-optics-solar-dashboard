import React, { useState, useEffect, useRef } from 'react';

import moment from 'moment-timezone';

const useDateRangeSelection = () => {
    // Predefined Date Ranges
    // https://projects.skratchdot.com/react-bootstrap-daterangepicker/?path=/story/daterangepicker--predefined-date-ranges

    const ranges = {
        Today: [moment().toDate(), moment().toDate()],
        'Past 7 Days': [
            moment().subtract(6, 'days').toDate(),
            moment().toDate(),
        ],
        'Past 30 Days': [
            moment().subtract(29, 'days').toDate(),
            moment().toDate(),
        ],
        'Past Month': [
            moment().subtract(1, 'month').toDate(),
            moment().toDate(),
        ],
        'Past Year': [
            moment().subtract(1, 'year').toDate(),
            moment().toDate(),
        ],
        'Past 5 Years': [
            moment().subtract(5, 'year').toDate(),
            moment().toDate(),
        ],
        'This Week': [
            moment().startOf('week').toDate(),
            moment().toDate(),
        ],
        'This Month': [
            moment().startOf('month').toDate(),
            moment().toDate(),
        ],
        'All 5 Years': [
            moment().subtract(5, 'year').startOf('year').toDate(),
            moment().toDate(),
        ],
    }


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

    const [dateState, setDateState] = useState({
        start: getStartEnd()[0],
        end: getStartEnd()[1],
        label:  getDateLabel(getStartEnd()[0], getStartEnd()[1])
    });

    const dateReference = useRef();

    const { start, end, label } = dateState;

    // var outlabel = "Custom Date Range"
    //todo handle, store somewhere? and then pass start, end to the submit call, which... opens a new page?
    const handleDateCallback = (start, end, label) => {

        dateReference.current.setStartDate(start);
        dateReference.current.setEndDate(end);
        // dateReference.current.setDateState(label)
        // console.log(start.toDate());

        setDateState({ start: start, end: end, label: getDateLabel(start, end) });

        localStorage.setItem('dateStart', start);
        localStorage.setItem('dateEnd', end);
        localStorage.setItem('dateRangeLabel', label);

        // console.log(st,"type: ", typeof st)
    };
    // const label = label;
    // const label = start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY');



    return [dateState, setDateState, ranges, handleDateCallback, dateReference]
}

export default useDateRangeSelection
