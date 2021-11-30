import React, { useContext } from "react";
import ExportButton from "./ExportButton";
import DateSelection from "./DateSelection";
import { GlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";

const GraphOptionsSection = () => {
  const {selectedIrridianceOptions, getChartData, dateState} = useContext(GlobalContext);
  return (
    <div
      className="graph-options-wrapper"
      style={{ paddingLeft: 10, paddingRight: 10 }}
    >
      <DateSelection />
      <Link to={"/dashboard/graph"}>
      <ExportButton backgroundColor="#8F677F" hoverColor="#8F677F80" textColor="#FFFFFF" selected={false} marginTop={97} width="50%"
      onClick={() => {
        console.log(selectedIrridianceOptions);
        getChartData({start: dateState.start, end: dateState.end})
        }}
      // use export button for the styling
      >
        View Graph
      </ExportButton>
      </Link>
    </div>
  );
};

GraphOptionsSection.propTypes = {};

export default GraphOptionsSection;
