import { useState } from 'react';

/** @typedef StateSetter */
/**
 * Custom hook to handles graph data from Graph.js that needs to communicate with other components
 * @returns {[graphData: Array.<string>, setGraphData: StateSetter, graphLines: Array.<string>, setGraphLines: StateSetter, irridianceGraphLines: Array.<string>, setIrridianceGraphLines: StateSetter, meteorologicalGraphLines: Array.<string>, setMeteorologicalGraphLines: StateSetter]} array
 */
const useGraph = () => {
    const [graphData, setGraphData] = useState([{}]);

    const [graphLines, setGraphLines] = useState([]);

    const [irridianceGraphLines, setIrridianceGraphLines] = useState([]);
    const [meteorologicalGraphLines, setMeteorologicalGraphLines] = useState([]);

    return [graphData, setGraphData, graphLines, setGraphLines, 
        irridianceGraphLines, setIrridianceGraphLines, meteorologicalGraphLines, setMeteorologicalGraphLines];
}

export default useGraph
