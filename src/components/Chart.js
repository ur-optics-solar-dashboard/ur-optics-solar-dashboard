import {
    LineChart, Line,
    CartesianGrid, XAxis, YAxis, Tooltip,
    Label, Legend, ResponsiveContainer, ReferenceArea,
    AreaChart, Area
} from 'recharts';
// https://recharts.org/en-US/examples

// https://github.com/tsayen/dom-to-image
import domtoimage from 'dom-to-image';

import FileSaver from "file-saver";

import { useCurrentPng } from "recharts-to-png";
import React, { useState, useEffect, useCallback } from 'react'

import arrowdown from '../images/drop-down-arrow.svg';
import arrowup from '../images/up-arrow.svg';
// import arrow from '../logo.svg';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useHistory,
    useParams
} from "react-router-dom";

import '../App.css';

//todo change to only import individual components
import { Button, Form, Collapse } from 'react-bootstrap';

const Chart = () => {

    const downloadLineChartPNG = () => {
        domtoimage.toBlob(document.getElementById('lineChart'))
    .then(function (blob) {
        window.saveAs(blob, 'chart.png');
    });
    }

    const downloadLineChartJPEG = () => {
        domtoimage.toJpeg(document.getElementById('lineChart'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'chart.jpeg';
        link.href = dataUrl;
        link.click();
    });
    }

    const [graphData, setGraphData] = useState([{"uv":1,"pv":2}])

    const getGraph = () => {
        fetch('/graph')
            .then(function (response) {
                // console.log("response: ", response)
                return response.json();
            })
            .then(function (myJson) {
                // console.log("response json: ", myJson);
                setGraphData(myJson["return_data"])
            });
    }
        //
    //initialize stuff
    //
    useEffect(() => {
        // api data
        getGraph() // initial data
    }, [])

    let history = useHistory();
    const [downloadSelection, setDownloadSelection] = useState(0)

    const handleSubmit = (event) => {
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
            default: // case 0
                history.push("/csv");
        }
    }

    const defaultGraphOptions = {
        "show-graph-options": false,
        "large-font": false,
        "thick-lines": false,
        "no-legend": false,
    }

    const [graphOptions, setGraphOptions] = useState(JSON.parse(localStorage.getItem("graphOptions")) || defaultGraphOptions)


    const handleCheckFormChange = (event) => { setGraphOptions({ ...graphOptions, [event.target.name]: event.target.checked }); }

    return (
        <div style={{ width: "1000px" }}>
            <h2>Graph</h2>
            <div style={{ marginLeft: "24px" }}>
                <h3
                    style={{ opacity: "0.75", cursor: "pointer" }}
                    onClick={() => setGraphOptions({ ...graphOptions, 'show-graph-options': !graphOptions['show-graph-options'] })}>
                    Additional Graph Options
                    <img src={graphOptions["show-graph-options"] ? arrowup : arrowdown} style={{ marginLeft: "10px" }} width={10} height={10} />
                </h3>
                <Collapse in={graphOptions["show-graph-options"]}>
                    <div>
                        <Form>
                            <Form.Check
                                // todo... I prob can make all of this cleaner with a map or something
                                type={'checkbox'}
                                id={'large-font'}
                                name={'large-font'}
                                checked={graphOptions["large-font"]}
                                label={'Large Font'}
                                onChange={handleCheckFormChange} />

                            <Form.Check
                                // todo... I prob can make all of this cleaner with a map or something
                                type={'checkbox'}
                                id={'thick-lines'}
                                name={'thick-lines'}
                                checked={graphOptions["thick-lines"]}
                                label={'Thick Lines'}
                                onChange={handleCheckFormChange} />

                            <Form.Check
                                // todo... I prob can make all of this cleaner with a map or something
                                type={'checkbox'}
                                id={'no-legend'}
                                name={'no-legend'}
                                checked={graphOptions["no-legend"]}
                                label={'No Legend'}
                                onChange={handleCheckFormChange} />
                        </Form>
                    </div>
                </Collapse>
            </div>
            <hr />

            <ResponsiveContainer width="100%" height={600} id="lineChart">
                <LineChart
                    data={graphData}
                    margin={{ top: 32, right: 30, left: 0, bottom: 64 }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="datetime" tickCount={3} interval={359} />
                    <YAxis yAxisId="left" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="Global Horizontal [W/m^2]"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                        dot={false}
                    />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="Direct Normal [W/m^2]"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorPv)"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
            <Form>
                <Form.Check>
                    <Form.Check inline label="csv" name="group1" type='radio' id={`inline-radio-0`} checked={downloadSelection === 0} value={0} onClick={() => setDownloadSelection(0)} />
                    <Form.Check inline label="zip compressed" name="group1" type='radio' id={`inline-radio-1`} checked={downloadSelection === 1} value={1} onClick={() => setDownloadSelection(1)} />
                    <Form.Check inline label="png" name="group1" type='radio' id={`inline-radio-2`} checked={downloadSelection === 2} value={2} onClick={() => setDownloadSelection(2)} />
                    <Form.Check inline label="jpeg" name="group1" type='radio' id={`inline-radio-3`} checked={downloadSelection === 3} value={3} onClick={() => setDownloadSelection(3)} />

                </Form.Check>

                {/* top right bottom left */}
                <Button variant="primary" style={{ margin: "20px 0px 10px 50px" }} onClick={handleSubmit}>
                    Download Data
                </Button>
            </Form>
        </div>
    )
}

export default Chart