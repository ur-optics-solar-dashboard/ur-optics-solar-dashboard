import '../App.css';
import './About.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';
import Toast from '../newcomponents/Toast';

const MeasurementInfoPanel = props => {
    return (
        <div className='measurement-info-panel'>
            <h4>{props.name}</h4><span className='measurement-units'>{props.units}</span>
            <p>{props.description}</p>
        </div>
    );
}

const About = () => {
    
    return (
        <>
        <SidebarLayout width={290}>
            <h1>Flux Solar Dashboard</h1>
            <p>Developed by <a href="https://roclab.io">RocLab</a> for the University of Rochester Optics Department.</p>
            <br />
            <h2>Measurement Information</h2>
            <div className='measurement-info-container'>
                <MeasurementInfoPanel
                    name="Global Horizontal"
                    units="W/m^2"
                    description="TODO" />
                <MeasurementInfoPanel
                    name="Direct Normal"
                    units="W/m^2"
                    description="TODO" />
                <MeasurementInfoPanel
                    name="Diffuse Horizontal"
                    units="W/m^2"
                    description="TODO" />
                <MeasurementInfoPanel
                    name="PR1 Temperature"
                    units="deg C"
                    description="TODO" />
                <MeasurementInfoPanel
                    name="PH1 Temperature"
                    units="deg C"
                    description="TODO" />
                <MeasurementInfoPanel
                    name="Pressure"
                    units="mBar"
                    description="TODO" />
                <MeasurementInfoPanel
                    name="Zenith Angle"
                    units="degrees"
                    description="TODO" />
                <MeasurementInfoPanel
                    name="Azimuth Angle"
                    units="degrees"
                    description="TODO" />
                <MeasurementInfoPanel
                    name="RaZON Status"
                    units="status"
                    description="TODO" />
                <MeasurementInfoPanel
                    name="RaZON Time"
                    units="hhmm"
                    description="TODO" />
                <MeasurementInfoPanel
                    name="Logger Battery"
                    units="VDC"
                    description="TODO" />
                <MeasurementInfoPanel
                    name="Logger Temp"
                    units="deg C"
                    description="TODO" />
            </div>
            <br />
            <Toast />
        </SidebarLayout>
        </>
    )
}

export default About;