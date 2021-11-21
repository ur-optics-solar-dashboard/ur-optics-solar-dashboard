import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';

import { useState, useEffect, useRef } from 'react';
import { calculateTime, getBoxAllCSVs, getBoxFile, parseCSV } from '../Utils';

import { Table, Badge } from 'react-bootstrap';

const FilePreviewTest = (props) => {
    return (
        <Table striped hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date/Time</th>
                    <th>Global Horizontal</th>
                    <th>Direct Normal</th>
                    <th>Diffuse Horizontal</th>
                    <th>PR1 Temperature</th>
                    <th>PH1 Temperature</th>
                    <th>Pressure</th>
                    <th>Zenith Angle</th>
                    <th>Azimuth Angle</th>
                    <th>RaZON Status</th>
                    <th>RaZON Time</th>
                    <th>Logger Battery</th>
                    <th>Logger Temp</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((item) => (
                    <tr>
                        <td>{item.index}</td>
                        <td>{item.dt}</td>
                        <td>{item.globalHorizontal}</td>
                        <td>{item.directNormal}</td>
                        <td>{item.diffuseHorizontal}</td>
                        <td>{item.pr1Temperature}</td>
                        <td>{item.ph1Temperature}</td>
                        <td>{item.pressure}</td>
                        <td>{item.zenithAngle}</td>
                        <td>{item.azimuthAngle}</td>
                        <td>{item.razonStatus}</td>
                        <td>{item.razonTime}</td>
                        <td>{item.loggerBattery}</td>
                        <td>{item.loggerTemp}</td>
                    </tr>
                    ))}
            </tbody>
        </Table>
    );
}

const BoxTest = () => {

    // const [csvData, setCSVData] = useState([]);
    const [dataUpdated, setDataUpdated] = useState(false);
    const csvData = useRef([]);

    useEffect(() => {

        const buildTestPage = async () => {
            let ids = await getCSVIds();

            for (let i = 0; i < 1 /*normally ids.length*/; i++) {
                let file = await getBoxFile(ids[i]);
                let csvRows = parseCSV(file);

                let outdata = {
                    id: ids[i],
                    data: []
                }
                for (let j = 0; j < csvRows.length - 1; j++) {
                    let dt = calculateTime(
                        parseInt(csvRows[j]['Year']),
                        parseInt(csvRows[j]['DOY']),
                        parseInt(csvRows[j]['MST'])
                        )
                        .format('MM/DD/YYYY h:mm a');
                    outdata.data.push({
                        index: j + 1,
                        dt: dt,
                        globalHorizontal: csvRows[j]['Global Horizontal [W/m^2]'],
                        directNormal: csvRows[j]['Direct Normal [W/m^2]'],
                        diffuseHorizontal: csvRows[j]['Diffuse Horizontal [W/m^2]'],
                        pr1Temperature: csvRows[j]['PR1 Temperature [deg C]'],
                        ph1Temperature: csvRows[j]['PH1 Temperature [deg C]'],
                        pressure: csvRows[j]['Pressure [mBar]'],
                        zenithAngle: csvRows[j]['Zenith Angle [degrees]'],
                        azimuthAngle: csvRows[j]['Azimuth Angle [degrees]'],
                        razonStatus: csvRows[j]['RaZON Status'],
                        razonTime: csvRows[j]['RaZON Time [hhmm]'],
                        loggerBattery: csvRows[j]['Logger Battery [VDC]'],
                        loggerTemp: csvRows[j]['Logger Temp [deg C]']
                    });
                }

                csvData.current.push(outdata);
                setDataUpdated(true);
            }
        }

        buildTestPage();

    }, [dataUpdated]);

    const getCSVIds = async () => {
        let ids = await getBoxAllCSVs();

        if (ids !== undefined) { return ids; }
        return null;
    }

    return (
        <>
            <ul>
                {csvData.current.map((item) => (
                    <li>
                        <h1>{item.id}</h1>
                        <FilePreviewTest data={item.data} />
                    </li>
                ))}
            </ul>
        </>
    );

}

export default BoxTest;