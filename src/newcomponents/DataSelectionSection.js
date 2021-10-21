import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

import "./DataSelectionSection.css";
import { GlobalContext } from '../contexts/GlobalContext';

const IrridianceOptions = [
    { value: 'irradiance-global-horizontal', label: 'Global Horizontal', color: '#00B8D9' },
    { value: 'irradiance-direct-normal', label: 'Direct Normal', color: '#0052CC' },
    { value: 'irradiance-diffuse-horizontal', label: 'Diffuse Horizontal', color: '#5243AA' },
];

const MeteorologicalOptions = [
    {"value": "meteorological-pr1-temperature", label: "PR1 Temperature", color: ""},
    {"value": "meteorological-ph1-temperature", label: "PH1 Temperature", color: ""},
    {"value": "meteorological-pressure", label: "Pressure", color: ""},
    {"value": "meteorological-zenith-angle", label: "Zenith Angle", color: ""},
    {"value": "meteorological-azimuth-angle", label: "Azimuth Angle", color: ""},
    {"value": "meteorological-razon-status", label: "RaZON Status", color: ""},
    {"value": "meteorological-razon-time", label: "RaZON Time", color: ""},
    {"value": "meteorological-logger-battery", label: "Logger Battery", color: ""},
    {"value": "meteorological-logger-temp", label: "Logger Temp", color: ""},
];

const DataSelectionSection = props => {
    const {selectedIrridianceOptions, setSelectedIrridianceOptions, selectedMeteorologicalOptions, setSelectedMeteorologicalOptions} = useContext(GlobalContext);

    const handleIrridianceChange = (selectedOptions) => {
        setSelectedIrridianceOptions(selectedOptions)
    }
    const handleMeteorologicalChange = (selectedOptions) => {
        setSelectedMeteorologicalOptions(selectedOptions)
    }

    useEffect(() => {
        console.log("start irr",selectedIrridianceOptions)
    }, [])
    return (
        <div className="data-wrapper">
            <div className="data-half-section">
                <h6>Irradiance</h6>
                <div style={{ paddingRight: 10 }}>
                    <Select isMulti options={IrridianceOptions} 
                    defaultValue={selectedIrridianceOptions}
                    onChange={handleIrridianceChange}
                    />
                </div>
            </div>
            <div className="data-half-section">
                <h6>Meteorological</h6>
                <div style={{ paddingRight: 10 }}>
                    <Select isMulti options={MeteorologicalOptions}
                    defaultValue={selectedMeteorologicalOptions}
                    onChange={handleMeteorologicalChange}
                    />
                </div>
            </div>
        </div>
    )
}

DataSelectionSection.propTypes = {

}

export default DataSelectionSection
