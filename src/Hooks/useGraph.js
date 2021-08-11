import { useState } from 'react';

/** @typedef StateSetter */
/**
 * Custom hook to handles graph data from Graph.js that needs to communicate with other components
 * @returns {[graphData: string[], setGraphData: StateSetter, graphLines: string[], setGraphLines: StateSetter, irridianceGraphLines: string[], setIrridianceGraphLines: StateSetter, meteorologicalGraphLines: string[], setMeteorologicalGraphLines: StateSetter]} array
 */
const useGraph = () => {

    /**Graph data */
    const [graphData, setGraphData] = useState([{}]);

    /** Which lines to include in the graph */
    const [graphLines, setGraphLines] = useState([]);

    /** Which irridiance lines to include in the graph */
    const [irridianceGraphLines, setIrridianceGraphLines] = useState([]);

    /** Which meteorological lines to include in the graph */
    const [meteorologicalGraphLines, setMeteorologicalGraphLines] = useState([]);

    return [graphData, setGraphData, graphLines, setGraphLines, 
        irridianceGraphLines, setIrridianceGraphLines, meteorologicalGraphLines, setMeteorologicalGraphLines];
}

export default useGraph
