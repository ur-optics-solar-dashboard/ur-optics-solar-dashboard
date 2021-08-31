import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DataFormContext } from "../contexts/DataFormContext";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { ranges } from "../DefaultConstants";
import "./DateSelection.css";
import arrowright from '../images/keyboard-right-arrow-button.svg';
import useDateShift from "../hooks/useDateShift";

const DateSelection = (props) => {
  const { dateState, dateReference, handleDateCallback } =
    useContext(DataFormContext);

    const [previousDay, nextDay, previousMonth, nextMonth, previousYear, nextYear] = useDateShift();
  return (
    <>
      <div className="date-selection-wrapper">
          <div className="date-shift-wrapper">
              <div className="date-shift-left">
                <img src={arrowright} style={{ transform: "rotate(180deg)", marginBottom:2}} alt={"arrow left"} width={10} height={10} />
                  <button className="date-shift-button" style={{paddingLeft:1, paddingRight:3}} onClick={previousYear}>Year</button>
                  <button className="date-shift-button" style={{paddingRight:3}} onClick={previousMonth}>Month</button>
                  <button className="date-shift-button" onClick={previousDay}>Day</button>
              </div>
              <div className="date-shift-right">
                  <button className="date-shift-button" style={{paddingRight:3}} onClick={nextDay}>Day</button>
                  <button className="date-shift-button" style={{paddingRight:3}} onClick={nextMonth}>Month</button>
                  <button className="date-shift-button" style={{paddingRight:1}} onClick={nextYear}>Year</button>
                  <img src={arrowright} style={{ marginBottom:2}} alt={"arrow left"} width={10} height={10} />

              </div>
          </div>
        <DateRangePicker
          // todo better predefined ranges that make sense for this product
          ref={dateReference}
          initialSettings={{
            startDate: dateState.start.toDate(),
            endDate: dateState.end.toDate(),
            showDropdowns: true,
            ranges: ranges,
            minDate: moment().subtract(5, "year").startOf("year"),
            maxDate: moment().toDate(),
            alwaysShowCalendars: true,
          }}
          onCallback={handleDateCallback}
        >
          <div
            id="reportrange"
            style={{
              background: "#fff",
              cursor: "pointer",
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: 5,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            <i className="fa fa-calendar"></i>&nbsp;
            <span style={{ marginRight: "5px" }}>{dateState.label}</span>{" "}
            <i className="fa fa-caret-down"></i>
          </div>
        </DateRangePicker>
      </div>
    </>
  );
};

DateSelection.propTypes = {
  // className: PropTypes.string
};

export default DateSelection;
