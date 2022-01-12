import React, { useContext, useEffect } from 'react'
import Select from 'react-select'

import "./DataSelectionSection.css";
import { GlobalContext } from '../contexts/GlobalContext';

const IrridianceOptions = [
    { value: 'global_horizontal', label: 'Global Horizontal [W/m^2]', color: '#00B8D9' },
    { value: 'direct_normal', label: 'Direct Normal [W/m^2]', color: '#0052CC' },
    { value: 'diffuse_horizontal', label: 'Diffuse Horizontal [W/m^2]', color: '#5243AA' },
];

const MeteorologicalOptions = [
    {"value": "pr1_temperature", label: "PR1 Temperature [deg C]", color: ""},
    {"value": "ph1_temperature", label: "PH1 Temperature [deg C]", color: ""},
    {"value": "pressure", label: "Pressure [mBar]", color: ""},
    {"value": "zenith_angle", label: "Zenith Angle [degrees]", color: ""},
    {"value": "azimuth_angle", label: "Azimuth Angle [degrees]", color: ""},
    {"value": "razon_status", label: "RaZON Status", color: ""},
    {"value": "razon_time", label: "RaZON Time [hhmm]", color: ""},
    {"value": "logger_battery", label: "Logger Battery [VDC]", color: ""},
    {"value": "logger_temp", label: "Logger Temp [deg C]", color: ""},
];

const DataSelectionSection = () => {
    const {selectedIrridianceOptions, setSelectedIrridianceOptions, selectedMeteorologicalOptions, setSelectedMeteorologicalOptions} = useContext(GlobalContext);

    const handleIrridianceChange = (selectedOptions) => {
        setSelectedIrridianceOptions(selectedOptions);
        let storeOptionsList = [];
        selectedOptions.forEach(o => {
            storeOptionsList.push(o.value);
        });
        localStorage.setItem('irrOptions', JSON.stringify(storeOptionsList));
    }
    const handleMeteorologicalChange = (selectedOptions) => {
        setSelectedMeteorologicalOptions(selectedOptions);
        let storeOptionsList = [];
        selectedOptions.forEach(o => {
            storeOptionsList.push(o.value);
        });
        localStorage.setItem('metOptions', JSON.stringify(storeOptionsList));
    }

    useEffect(() => {
        let irrOptions = JSON.parse(localStorage.getItem('irrOptions'));
        let metOptions = JSON.parse(localStorage.getItem('metOptions'));

        //calculate selected options
        let fullIrrOptions = [];
        if (irrOptions !== null) {
            irrOptions.forEach(o => {
                for (let i = 0; i < IrridianceOptions.length; i++) {
                    if (IrridianceOptions[i].value === o) {
                        fullIrrOptions.push(IrridianceOptions[i]);
                    }
                }
            });
        }

        let fullMetOptions = [];
        if (metOptions !== null) {
            metOptions.forEach(o => {
                for (let i = 0; i < MeteorologicalOptions.length; i++) {
                    if (MeteorologicalOptions[i].value === o) {
                        fullMetOptions.push(MeteorologicalOptions[i]);
                    }
                }
            });
        }

        setSelectedIrridianceOptions(fullIrrOptions);
        setSelectedMeteorologicalOptions(fullMetOptions);
    }, [setSelectedIrridianceOptions, setSelectedMeteorologicalOptions]);

    return (
        <div className="data-wrapper">
            <div className="data-half-section">
                <h6>Irradiance</h6>
                <div style={{ paddingRight: 10 }}>
                    <Select isMulti options={IrridianceOptions} 
                    value={selectedIrridianceOptions}
                    onChange={handleIrridianceChange}
                    />
                </div>
            </div>
            <div className="data-half-section">
                <h6>Meteorological</h6>
                <div style={{ paddingRight: 10 }}>
                    <Select isMulti options={MeteorologicalOptions}
                    value={selectedMeteorologicalOptions}
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
