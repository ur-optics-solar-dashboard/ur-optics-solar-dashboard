import {
    LineChart, Line,
    CartesianGrid, XAxis, YAxis, Tooltip,
    Label, Legend, ResponsiveContainer, ReferenceArea,
    AreaChart, Area
} from 'recharts';
// https://recharts.org/en-US/examples

// https://github.com/tsayen/dom-to-image
import domtoimage from 'dom-to-image';


import React, { useState, useEffect, useCallback } from 'react'

import arrowdown from '../images/drop-down-arrow.svg';
import arrowup from '../images/up-arrow.svg';
// import arrow from '../logo.svg';

import {
    useHistory,
} from "react-router-dom";

import '../App.css';

//todo change to only import individual components
import { Button, Form, Collapse, Row, Col } from 'react-bootstrap';
import FileSaver from 'file-saver';


const Chart = () => {

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

    const graphColors = ["#003B71", "red", "blue", "green", "purple", "orange", "pink", "black", "brown", "gray"]

    //todo: handle interval ourselves because having them chose is a bit unreliable (can cause too many points to be rendered)
    const getGraph = () => {
        console.log("fetching data...")
        fetch('/graph')
            .then(function (response) {
                // console.log("response: ", response)
                return response.json();
            })
            .then(function (myJson) {
                // console.log("response json: ", myJson);
                console.log("loading data...")
                setGraphData(myJson["return_data"])

                setGraphLines(myJson["included_headers"])

                setIrridianceGraphLines(myJson["irridiance_headers"])
                setMeteorologicalGraphLines(myJson["meteorological_headers"])
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
        "show-graph-options": false,
        "no-legend": false,
    }

    const [graphOptions, setGraphOptions] = useState(JSON.parse(localStorage.getItem("graphOptions")) || defaultGraphOptions)


    const handleCheckFormChange = (event) => { setGraphOptions({ ...graphOptions, [event.target.name]: event.target.checked }); }

    return (
        <div>
            <h2>Graph</h2>
            <div style={{ marginLeft: "24px" }}>
                <h3
                    style={{ opacity: "0.75", cursor: "pointer" }}
                    onClick={() => setGraphOptions({ ...graphOptions, 'show-graph-options': !graphOptions['show-graph-options'] })}>
                    Additional Graph Options
                    <img src={graphOptions["show-graph-options"] ? arrowup : arrowdown} alt={graphOptions["show-graph-options"] ? "arrow up" : "arrow down"} style={{ marginLeft: "10px" }} width={10} height={10} />
                </h3>
                <Collapse in={graphOptions["show-graph-options"]}>
                    <div>
                        <Form>
                            <Row>
                                <Col sm="2">
                                    <Button variant="outline-primary" onClick={() => setGraphOptions({ ...defaultGraphOptions, "show-graph-options": graphOptions["show-graph-options"] })}>
                                        Reset
                                    </Button>
                                </Col>
                            </Row>

                            <Form.Group as={Row}>
                                <Col sm="2">
                                    <Form.Label style={{ marginTop: "5px" }}>
                                        Line Thickness: {graphOptions["line-thickness"]}
                                    </Form.Label>
                                </Col>
                                <Col sm="4">
                                    <Form.Control type="range" min={1} max={5} step={0.5} style={{ marginTop: "10px" }}
                                        value={graphOptions["line-thickness"]}
                                        onChange={e => setGraphOptions({ ...graphOptions, "line-thickness": e.target.value })}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm="2">
                                    <Form.Label style={{ marginTop: "5px" }}>
                                        Font Size: {graphOptions["font-size"]}
                                    </Form.Label>
                                </Col>
                                <Col sm="4">
                                    <Form.Control type="range" min={12} max={28} step={1} style={{ marginTop: "10px" }}
                                        value={graphOptions["font-size"]}
                                        onChange={e => setGraphOptions({ ...graphOptions, "font-size": e.target.value })}
                                    />
                                </Col>
                            </Form.Group>

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

            <ResponsiveContainer width="95%" height={800} id="lineChart">
                <LineChart
                    data={graphData}
                    margin={{ top: 32, right: 128, left: 16, bottom: 64 }}
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
                    {/* TODO: Xaxis formatter, based on day, month, etc */}
                    <XAxis dataKey="datetime" xAxisId={0} tickCount={3} interval={359}
                        style={{ fontSize: graphOptions["font-size"] }}
                        height={36} />

                    <XAxis dataKey="date" xAxisId={1} tickCount={1} interval={1439} label="American/New_York"
                        style={{ fontSize: graphOptions["font-size"] }} />

                    {
                        (irridianceGraphLines.length === 0) ? null :
                            <YAxis yAxisId="left" label={<Label
                                value="Irridiance"
                                position="insideLeft"
                                angle={-90}
                                style={{ textAnchor: 'middle' }}
                            />}
                                style={{ fontSize: graphOptions["font-size"] }} />}

                    {
                        (meteorologicalGraphLines.length === 0) ? null :
                            <YAxis yAxisId="right" orientation="right" label={<Label
                                value="Meteorological"
                                position="insideRight"
                                angle={90}
                                style={{ textAnchor: 'middle' }}
                            />}
                                style={{ fontSize: graphOptions["font-size"] }} />}

                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />

                    {graphOptions["no-legend"] ? null : <Legend />}

                    {
                        (irridianceGraphLines.length === 0) ? null :
                            irridianceGraphLines.map((line_name, index) => (
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey={line_name}
                                    stroke={graphColors[graphLines[line_name]]}
                                    strokeWidth={graphOptions["line-thickness"]}
                                    fillOpacity={1}
                                    // fill="url(#colorUv)"
                                    dot={false}
                                />
                            ))
                    }

                    {
                        (meteorologicalGraphLines.length === 0) ? null :
                            meteorologicalGraphLines.map((line_name, index) => (
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey={line_name}
                                    stroke={graphColors[graphLines[line_name]]}
                                    strokeWidth={graphOptions["line-thickness"]}
                                    fillOpacity={1}
                                    // fill="url(#colorUv)"
                                    dot={false}
                                />
                            ))}

                    {/* <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="Global Horizontal [W/m^2]"
                        stroke="#8884d8"
                        strokeWidth={graphOptions["line-thickness"]}
                        fillOpacity={1}
                        // fill="url(#colorUv)"
                        type={"natural"}
                        dot={false}
                    />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="Direct Normal [W/m^2]"
                        stroke="#82ca9d"
                        strokeWidth={graphOptions["line-thickness"]}
                        fillOpacity={1}
                        // fill="url(#colorPv)"
                        type={"natural"}
                        dot={false}
                    /> */}
                </LineChart>
            </ResponsiveContainer>

            <Form>
                <Form.Check>
                    <Form.Check inline label="csv" name="group1" type='radio' id={`inline-radio-0`} checked={downloadSelection === 0} value={0} onClick={() => setDownloadSelection(0)} />
                    <Form.Check inline label="zip compressed" name="group1" type='radio' id={`inline-radio-1`} checked={downloadSelection === 1} value={1} onClick={() => setDownloadSelection(1)} />
                    <Form.Check inline label="json" name="group1" type='radio' id={`inline-radio-5`} checked={downloadSelection === 5} value={5} onClick={() => setDownloadSelection(5)} />
                    <Form.Check inline label="png" name="group1" type='radio' id={`inline-radio-2`} checked={downloadSelection === 2} value={2} onClick={() => setDownloadSelection(2)} />
                    <Form.Check inline label="jpeg" name="group1" type='radio' id={`inline-radio-3`} checked={downloadSelection === 3} value={3} onClick={() => setDownloadSelection(3)} />
                    <Form.Check inline label="svg" name="group1" type='radio' id={`inline-radio-4`} checked={downloadSelection === 4} value={4} onClick={() => setDownloadSelection(4)} />

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