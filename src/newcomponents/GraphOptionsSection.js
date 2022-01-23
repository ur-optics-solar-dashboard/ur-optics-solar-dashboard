import "./ExportOptionsSection.css";

import React, { useContext, useState } from "react";
import ExportButton from "./ExportButton";
import DateSelection from "./DateSelection";
import { GlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const GraphOptionsSection = () => {
  const { getChartData, dateState } = useContext(GlobalContext);
  const [aggOptionsState, setAggOptionsState] = useState(0);

  return (
    <div
      className="graph-options-wrapper"
      style={{ paddingLeft: 10, paddingRight: 10 }}
    >
      <center>
      <DateSelection/>
      </center>
      <div className="options-export-wrapper">
      <div className="options-export-half-section">
        <ExportButton selected={aggOptionsState === 0}
          onClick={() => { setAggOptionsState(0); }}>
          Aggregated
        </ExportButton>
        <Link to={"/dashboard/graph"}>
          <ExportButton selected={false} variant='submit'
            onClick={() => {
              getChartData({
                start: dateState.start,
                end: dateState.end,
                aggregate: (aggOptionsState === 0)
              });
              }
            }
          >
            View Graph
          </ExportButton>
        </Link>
      </div>
      <div className="options-export-half-section">
        <ExportButton selected={aggOptionsState === 1}
          onClick={() => { setAggOptionsState(1); }}>
          Full
        </ExportButton>
      </div>
      </div>
    </div>
  );
};

GraphOptionsSection.propTypes = {};

export default GraphOptionsSection;
