import React, { useContext } from "react";
import PropTypes from "prop-types";
import ExportButton from "./ExportButton";
import DateSelection from "./DateSelection";
import { GlobalContext } from "../contexts/GlobalContext";

const GraphOptionsSection = (props) => {
    const {setShowGraph} = useContext(GlobalContext);
  return (
    <div
      className="graph-options-wrapper"
      style={{ paddingLeft: 10, paddingRight: 10 }}
    >
      <DateSelection />
      <ExportButton backgroundColor="#8F677F" hoverColor="#8F677F80" textColor="#FFFFFF" selected={false} marginTop={97} width="50%"
      // use export button for the styling
        onClick={() => {
            setShowGraph(true)
        }}
      >
        View Graph
      </ExportButton>
    </div>
  );
};

GraphOptionsSection.propTypes = {};

export default GraphOptionsSection;
