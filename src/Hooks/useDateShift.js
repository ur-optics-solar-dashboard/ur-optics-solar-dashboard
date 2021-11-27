
import {useContext} from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
/**
 * Provide handler functions to shift the datePicker by a full day, month, or year
 * @returns {[previousDay: function, nextDay: function, previousMonth: function, nextMonth: function, previousYear: function, nextYear: function]} array
 */
const useDateShift = () => {

    const {dateState, handleDateCallback} = useContext(GlobalContext)
    
    /***/
     const previousDay = () => {
        handleDateCallback(dateState.start.subtract(1, 'days'), dateState.end.subtract(1, 'days'), "Custom Range");
    }

    /***/
    const nextDay = () => {
        handleDateCallback(dateState.start.add(1, 'days'), dateState.end.add(1, 'days'), "Custom Range");
    }

    /***/
    const previousMonth = () => {
        handleDateCallback(dateState.start.subtract(1, 'month').startOf('month'), dateState.end.subtract(1, 'month').endOf('month'), "Custom Range");
    }

    /***/
    const nextMonth = () => {
        handleDateCallback(dateState.start.add(1, 'month').startOf('month'), dateState.end.add(1, 'month').endOf('month'), "Custom Range");
    }

    /***/
    const previousYear = () => {
        handleDateCallback(dateState.start.subtract(1, 'year').startOf('year'), dateState.end.subtract(1, 'year').endOf('year'), "Custom Range");
    }

    /***/
    const nextYear = () => {
        handleDateCallback(dateState.start.add(1, 'year').startOf('year'), dateState.end.add(1, 'year').endOf('year'), "Custom Range");
    }

    return [previousDay, nextDay, previousMonth, nextMonth, previousYear, nextYear]
}

export default useDateShift
