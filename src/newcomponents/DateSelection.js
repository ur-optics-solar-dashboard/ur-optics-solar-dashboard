import { useContext } from "react";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { ranges } from "../DefaultConstants";
import "./DateSelection.css";
import DateShifter from "./DateShifter";
import { GlobalContext } from "../contexts/GlobalContext";

const DateSelection = (props) => {
  const { dateState, dateReference, handleDateCallback } =
    useContext(GlobalContext);
  
  return (
    <>
      <div className="date-selection-wrapper">
        <DateShifter />
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
              marginLeft: 0,
              marginRight: 0,
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
