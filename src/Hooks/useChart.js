import { useState, useRef } from 'react';

import moment from 'moment-timezone';
import domtoimage from 'dom-to-image';

import React from 'react'

import {
    useHistory,
} from "react-router-dom";
import FileSaver from 'file-saver';


const useChart = () => {
    
    const downloadLineChartPNG = () => {
        domtoimage.toBlob(document.getElementById('lineChart'))
            .then(function (blob) {
                FileSaver.saveAs(blob, 'chart.png');
            });
    }

    const downloadLineChartJPEG = () => {
        domtoimage.toJpeg(document.getElementById('lineChart'), { quality: 0.75, bgcolor: "white" })
            .then(function (dataUrl) {
                FileSaver.saveAs(dataUrl, 'chart.jpeg');
            });
    }

    const downloadLineChartSVG = () => {
        domtoimage.toSvg(document.getElementById('lineChart'),)
            .then(function (dataUrl) {
                FileSaver.saveAs(dataUrl, 'chart.svg');
            });
    }

    const [graphData, setGraphData] = useState([{ "uv": 1, "pv": 2 }])


    const downloadJson = () => {
        var blob = new Blob([JSON.stringify(graphData)], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "graph_data.json")
    }

    const [graphLines, setGraphLines] = useState([])

    const [irridianceGraphLines, setIrridianceGraphLines] = useState([])
    const [meteorologicalGraphLines, setMeteorologicalGraphLines] = useState([])

    const graphColors = ["#003B71", "red", "green", "purple", "orange", "pink", "black", "brown", "gray", "blue", "lightgreen", "lightorange"]

    
    let history = useHistory();
    const [downloadSelection, setDownloadSelection] = useState(0);

    const handleChartSubmit = (event) => {
        // console.log(graphOptions["show-graph-options"])
        switch (downloadSelection) {
            case 1:
                history.push("/zip-compressed");
                break;
            case 2: // png
                downloadLineChartPNG();
                break;
            case 3: //jpeg
                downloadLineChartJPEG();
                break;
            case 4: //svg
                downloadLineChartSVG();
                break;
            case 5: //json
                downloadJson();
                break;
            default: // case 0
                history.push("/csv");
        }
    }

    const defaultGraphOptions = {
        "line-thickness": 1,
        "font-size": 16,
        "legend": true,
        "show-graph-options": false,
    }

    const [graphOptions, setGraphOptions] = useState(JSON.parse(localStorage.getItem("graphOptions")) || defaultGraphOptions)


    const handleChartCheckFormChange = (event) => { setGraphOptions({ ...graphOptions, [event.target.name]: event.target.checked }); }

    return [graphData, setGraphData, graphLines, setGraphLines, 
        irridianceGraphLines, setIrridianceGraphLines, meteorologicalGraphLines, setMeteorologicalGraphLines,
        graphColors,
        downloadSelection, setDownloadSelection, handleChartSubmit,
        defaultGraphOptions, graphOptions, setGraphOptions,
        handleChartCheckFormChange]
}

export default useChart
