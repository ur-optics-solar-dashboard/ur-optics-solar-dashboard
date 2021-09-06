import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { GlobalContext } from '../contexts/GlobalContext'
import {
    LineChart, Line,
    CartesianGrid, XAxis, YAxis, Tooltip,
    Label, Legend
} from 'recharts';
import { DataFormContext } from '../contexts/DataFormContext';
import { defaultGraphOptions, graphColors } from '../DefaultConstants';
import { useDownloadChartSubmit } from '../hooks/useDownloadChartSubmit';

const Graph = props => {

    //todo reformat
    const graphData = [];
    const graphLines = [];
    const irridianceGraphLines = [];
    const meteorologicalGraphLines = [];
    const { graphTitle, scrollRef } = useContext(DataFormContext);

    const [graphOptions, setGraphOptions] = useState(JSON.parse(localStorage.getItem("graphOptions")) || defaultGraphOptions);
    const [downloadSelection, setDownloadSelection] = useState(0);
    const [handleChartSubmit] = useDownloadChartSubmit({ downloadSelection, graphData });
    //todo reformat above

    const {setShowGraph} = useContext(GlobalContext);
    return (
        <div>
            <p onClick={() => setShowGraph(false)}>Go back</p>
            <div id="lineChart">
                <h3 style={{ paddingTop: 12 }}>{graphTitle}</h3>
                <>
                    <LineChart
                        data={graphData}
                        margin={{ top: 24, right: 128, left: 64, bottom: 108 }}
                        width={1000} height={1000}
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
                        <XAxis dataKey="datetime" xAxisId={0} tickCount={1} minTickGap={359} interval={graphOptions["font-size"] > 24 ? 359 : 179}
                            style={{ fontSize: graphOptions["font-size"] }}
                            height={36} />

                        <XAxis dataKey="date" xAxisId={1} tickCount={1} interval={1439}
                            style={{ fontSize: graphOptions["font-size"] }} >
                            <Label dy={20} value="America/New_York" offset={0} position="insideBottom" style={{ fontSize: graphOptions["font-size"] }} />
                        </XAxis>


                        {(irridianceGraphLines.length === 0) ? null :
                            <YAxis yAxisId="left" label={<Label
                                value="Irridiance"
                                position="insideLeft"
                                angle={-90}
                                style={{ textAnchor: 'middle', fontSize: graphOptions["font-size"] }} />}
                            />}

                        {(meteorologicalGraphLines.length === 0) ? null :
                            <YAxis yAxisId="right" orientation="right" label={<Label
                                value="Meteorological"
                                position="insideRight"
                                angle={90}
                                style={{ textAnchor: 'middle', fontSize: graphOptions["font-size"] }} />}
                            />}

                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />

                        {graphOptions["legend"] ?
                            <Legend dy={10}
                                wrapperStyle={{ position: 'relative', marginTop: '16px' }}
                            />
                            : null}

                        {(irridianceGraphLines.length === 0) ? null :
                            irridianceGraphLines.map((line_name, index) => (
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    key={`left-${line_name}`}
                                    dataKey={line_name}
                                    stroke={graphColors[graphLines[line_name]]}
                                    strokeWidth={graphOptions["line-thickness"]}
                                    fillOpacity={1}
                                    // fill="url(#colorUv)"
                                    dot={graphOptions["dot"] ? { strokeWidth: 1, r: 1 } : false}
                                />
                            ))}

                        {(meteorologicalGraphLines.length === 0) ? null :
                            meteorologicalGraphLines.map((line_name, index) => (
                                <Line
                                    yAxisId="right"
                                    type="linear"
                                    key={`right-${line_name}`}
                                    dataKey={line_name}
                                    stroke={graphColors[graphLines[line_name]]}
                                    strokeWidth={graphOptions["line-thickness"]}
                                    fillOpacity={1}
                                    // fill="url(#colorUv)"
                                    dot={graphOptions["dot"] ? { strokeWidth: 1, r: 1 } : false}
                                />
                            ))}
                    </LineChart>
                </>
            </div>
        </div>
    )
}

Graph.propTypes = {

}

export default Graph
