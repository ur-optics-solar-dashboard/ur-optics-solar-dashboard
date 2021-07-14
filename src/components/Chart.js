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


const Chart = ({graphData, graphLines, irridianceGraphLines, meteorologicalGraphLines, graphColors,
    downloadSelection, setDownloadSelection, handleChartSubmit,
    defaultGraphOptions, graphOptions, setGraphOptions,
    handleChartCheckFormChange}) => {

    //
    //initialize stuff
    //
    useEffect(() => {

        // api data
        // getGraph() // initial data
    }, [])

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
                                id={'legend'}
                                name={'legend'}
                                checked={graphOptions["legend"]}
                                label={'Legend'}
                                onChange={handleChartCheckFormChange} />


                        </Form>
                    </div>
                </Collapse>
            </div>
            {/* <hr /> */}
            <ResponsiveContainer width="90%" height={800} id="lineChart">
                <LineChart
                    data={graphData}
                    margin={{ top: 64, right: 128, left: 64, bottom: 64 }}
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

                    <XAxis dataKey="date" xAxisId={1} tickCount={1} interval={1439} label="America/New_York"
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

                    {graphOptions["legend"] ?  <Legend />:null}

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
                <Button variant="primary" style={{ margin: "20px 0px 10px 50px" }} onClick={handleChartSubmit}>
                    Download Data
                </Button>
            </Form>

        </div>
    )
}

export default Chart