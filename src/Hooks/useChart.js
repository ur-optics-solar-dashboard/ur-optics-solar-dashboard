import { useState, useRef } from 'react';

import moment from 'moment-timezone';
import domtoimage from 'dom-to-image';

import React from 'react'

import {
    useHistory,
} from "react-router-dom";
import FileSaver from 'file-saver';

//TODO useContext
/**
 * Custom hook to handle graph data
 */
const useChart = () => {
    
    /**
     * downloads a document element as a png to file `chart.png`
     * @param  {string} elementId element id from document
     * @param  {string} bgcolor background color
     */
    const downloadLineChartPNG = (elementId, bgcolor) => {
        domtoimage.toBlob(document.getElementById(elementId),  { bgcolor: bgcolor })
            .then(function (blob) {
                FileSaver.saveAs(blob, 'chart.png');
            });
    }
    
    /**
     * downloads a document element as a jpeg to file `chart.jpeg`
     * @param  {string} elementId element id from document
     * @param  {number} quality quality of jpeg
     * @param  {string} bgcolor background color
     */
    const downloadLineChartJPEG = (elementId, quality, bgcolor) => {
        domtoimage.toJpeg(document.getElementById(elementId), { quality: quality, bgcolor: bgcolor })
            .then(function (dataUrl) {
                FileSaver.saveAs(dataUrl, 'chart.jpeg');
            });
    }

    
    const downloadGraphJson = (graphData) => {
        var blob = new Blob([JSON.stringify(graphData)], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "graph_data.json")
    }

    /**
     * downloads a document element as an svg to file `chart.svg`
     * @param  {string} elementId
     */
    const downloadLineChartSVG = (elementId) => {
        domtoimage.toSvg(document.getElementById(elementId),)
            .then(function (dataUrl) {
                FileSaver.saveAs(dataUrl, 'chart.svg');
            });
    }

    /**
     * 
     */
    const [graphData, setGraphData] = useState([{}]);

    const [graphLines, setGraphLines] = useState([]);

    const [irridianceGraphLines, setIrridianceGraphLines] = useState([]);
    const [meteorologicalGraphLines, setMeteorologicalGraphLines] = useState([]);

    const graphColors = ["#003B71", "red", "green", "purple", "orange", "pink", "black", "brown", "gray", "blue", "lightgreen", "lightorange"];

    
    let history = useHistory();
    const [downloadSelection, setDownloadSelection] = useState(0);

    const handleChartSubmit = (event) => {
        // console.log(graphOptions["show-graph-options"])
        switch (downloadSelection) {
            case 1:
                history.push("/zip-compressed"); //todo
                break;
            case 2: // png
                downloadLineChartPNG('lineChart', "white");
                break;
            case 3: //jpeg
                downloadLineChartJPEG('lineChart', 0.75, "white");
                break;
            case 4: //svg
                downloadLineChartSVG('lineChart');
                break;
            case 5: //json
                downloadGraphJson(graphData);
                break;
            default: // case 0
                history.push("/csv"); //todo
        }
    }

    const defaultGraphOptions = {
        "show-graph-options": false,
        "line-thickness": 1,
        "font-size": 16,
        "legend": true,
        "dot": false,
    }

    const [graphOptions, setGraphOptions] = useState(JSON.parse(localStorage.getItem("graphOptions")) || defaultGraphOptions);


    const handleChartCheckFormChange = (event) => { setGraphOptions({ ...graphOptions, [event.target.name]: event.target.checked }); };

    return [graphData, setGraphData, graphLines, setGraphLines, 
        irridianceGraphLines, setIrridianceGraphLines, meteorologicalGraphLines, setMeteorologicalGraphLines,
        graphColors,
        downloadSelection, setDownloadSelection, handleChartSubmit,
        defaultGraphOptions, graphOptions, setGraphOptions,
        handleChartCheckFormChange];
}

export default useChart
