import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, Legend, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect } from 'react'
import moment from 'moment';

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


const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];
const data2 = [
    { name: 'Page A', uv: 1000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 2000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 3131, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 400, pv: 3908, amt: 2000 },
];

// const data = [
//     { part: 'foo', axisA: 21211, axisB: 1232 },
//     { part: 'foo', axisA: 21211, axisB: 1232 },
//     { part: 'foo', axisA: 21211, axisB: 1232 },
//     { part: 'foo', axisA: 21211, axisB: 1232 },
//     { part: 'foo', axisA: 21211, axisB: 1232 }
// ]
const colors = ["#8884d8", "#1184d8"]
const Chart = () => {

    const [graphData, setGraphData] = useState(null)

    const getGraph = () => {
        fetch('/graph')
            .then(function (response) {
                console.log("response: ", response)
                return response.json();
            })
            .then(function (myJson) {
                console.log("response json: ", myJson);
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
        console.log(graphOptions["show-graph-options"])
        // switch (downloadSelection) {
        //     case 1:
        //         history.push("/graph");
        //         break;
        //     case 2:
        //         history.push("/zip-compressed");
        //         break;
        //     default: // case 0
        //         history.push("/csv");
        // }
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
            {/* <ResponsiveContainer> */}
            <LineChart
                height={600}
                width={1000}
                margin={{ top: 64, right: 30, left: 20, bottom: 64 }}>
                <XAxis dataKey="RaZON Time [hhmm]" />
                <YAxis yAxisId="left" />
                {/* <YAxis yAxisId="right" orientation='right' /> */}
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" data={graphData} type="linear" dataKey="Direct Normal [W/m^2]" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="left" data={graphData} type="linear" dataKey="Global Horizontal [W/m^2]" stroke="#82ca9d" />
                {/* <Line yAxisId="right" data={graphData} type="linear" dataKey="Global Horizontal [W/m^2]" stroke="#82ca9d" /> */}
            </LineChart>
            {/* </ResponsiveContainer> */}
            <Form>
                <Form.Check>
                    <Form.Check inline label="csv" name="group1" type='radio' id={`inline-radio-0`} checked={downloadSelection === 0} value={0} onClick={() => setDownloadSelection(0)} />
                    <Form.Check inline label="Zip Compressed" name="group1" type='radio' id={`inline-radio-1`} checked={downloadSelection === 1} value={1} onClick={() => setDownloadSelection(1)} />
                    <Form.Check inline label="Graph" name="group1" type='radio' id={`inline-radio-2`} checked={downloadSelection === 2} value={2} onClick={() => setDownloadSelection(2)} />
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