import React, { useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

//todo change to only import individual components
import { Button, Row, Col, Container, Form, FormGroup, Collapse } from 'react-bootstrap';

// DateRangePicker: https://github.com/skratchdot/react-bootstrap-daterangepicker
// react wrapper for https://github.com/dangrossman/daterangepicker
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'



const DataSelection = ({ start, end, ranges, handleDateCallback, label, dataForm, setDataFormState, handleCheckFormChange, handleRadioFormChange, handleRawDataCheckChange, handleSubmit, handleReset, initialShowSelection}) => {
    const [show, setShow] = useState(initialShowSelection)
    const handleDataShowSelection = () => {
        if(!show.showDataSelection){
            setShow({ showDataSelection: true, showIrradiance: true, showMeteorological: true, showInterval: true, showOutputType: true })
        }else{
            setShow({ ...show, showDataSelection:false })
        }
    }
    return (
        <div>
            <h2
                style={{ cursor: "pointer" }}
                onClick={handleDataShowSelection}>
                Data <i className={show.showDataSelection ? "arrow down": "arrow up"}></i></h2>

            <Collapse in={show.showDataSelection}>
                <div>
                    <DateRangePicker
                        // todo better predefined ranges that make sense for this product
                        initialSettings={{
                            startDate: start.toDate(), endDate: end.toDate(), showDropdowns: true,
                            ranges: ranges,
                        }}
                        onCallback={handleDateCallback}
                    >
                        <div
                            id="reportrange"
                            className="col-4"
                            style={{
                                background: '#fff',
                                cursor: 'pointer',
                                padding: '5px 10px',
                                border: '1px solid #ccc',
                                // width: '50%',
                            }}
                        >
                            <i className="fa fa-calendar"></i>&nbsp;
                            <span>{label}</span> <i className="fa fa-caret-down"></i>
                        </div>
                    </DateRangePicker>
                    <Form>
                        <FormGroup style={{ marginTop: "24px" }}>
                            <Container>
                                <Row>
                                    {/* Irradiance Column*/}
                                    <Col style={{ width: '18rem' }}>
                                        <div key={'irradiance-checkbox'} className="mb-3">
                                            <h3
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setShow({ ...show, showIrradiance: !show.showIrradiance })}>
                                                Irradiance 
                                                <i className={show.showIrradiance ? "arrow down": "arrow up"}></i></h3>
                                            <Collapse in={show.showIrradiance}>
                                                <div>
                                                    <Form.Check
                                                        // todo... I prob can make all of this cleaner with a map or something
                                                        type={'checkbox'}
                                                        id={'irradiance-global-horizontal'}
                                                        name={'irradiance-global-horizontal'}
                                                        checked={dataForm["irradiance-global-horizontal"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'Global Horizontal'}
                                                        onChange={handleCheckFormChange} />
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'irradiance-direct-normal'}
                                                        name={'irradiance-direct-normal'}
                                                        checked={dataForm["irradiance-direct-normal"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'Direct Normal'}
                                                        onChange={handleCheckFormChange} />
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'irradiance-diffuse-horizontal'}
                                                        name={'irradiance-diffuse-horizontal'}
                                                        checked={dataForm["irradiance-diffuse-horizontal"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'Diffuse Horizontal'}
                                                        onChange={handleCheckFormChange} />
                                                </div></Collapse>
                                        </div>
                                    </Col>
                                    {/* Meteorological Column*/}
                                    <Col style={{ width: '18rem' }}>
                                        <div key={'meteorological-checkbox'} className="mb-3">
                                            <h3
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setShow({ ...show, showMeteorological: !show.showMeteorological })}>
                                                Meteorological
                                                <i className={show.showMeteorological ? "arrow down": "arrow up"}></i></h3>
                                            <Collapse in={show.showMeteorological}>
                                                <div>
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'meteorological-pr1-temperature'}
                                                        name={'meteorological-pr1-temperature'}
                                                        checked={dataForm["meteorological-pr1-temperature"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'PR1 Temperature'}
                                                        onChange={handleCheckFormChange} />
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'meteorological-ph1-temperature'}
                                                        name={'meteorological-ph1-temperature'}
                                                        checked={dataForm["meteorological-ph1-temperature"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'PH1 Temperature'}
                                                        onChange={handleCheckFormChange} />
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'meteorological-pressure'}
                                                        name={'meteorological-pressure'}
                                                        checked={dataForm["meteorological-pressure"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'Pressure'}
                                                        onChange={handleCheckFormChange} />
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'meteorological-zenith-angle'}
                                                        name={'meteorological-zenith-angle'}
                                                        checked={dataForm["meteorological-zenith-angle"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'Zenith Angle'}
                                                        onChange={handleCheckFormChange} />
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'meteorological-azimuth-angle'}
                                                        name={'meteorological-azimuth-angle'}
                                                        checked={dataForm["meteorological-azimuth-angle"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'Azimuth Angle'}
                                                        onChange={handleCheckFormChange} />
                                                    <Form.Check
                                                        //dup
                                                        type={'checkbox'}
                                                        id={'meteorological-razon-status'}
                                                        name={'meteorological-razon-status'}
                                                        checked={dataForm["meteorological-razon-status"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'Razon Status'}
                                                        onChange={handleCheckFormChange} />
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'meteorological-razon-time'}
                                                        name={'meteorological-razon-time'}
                                                        checked={dataForm["meteorological-razon-time"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'Razon Time'}
                                                        onChange={handleCheckFormChange} />
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'meteorological-logger-battery'}
                                                        name={'meteorological-logger-battery'}
                                                        checked={dataForm["meteorological-logger-battery"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'Logger Battery'}
                                                        onChange={handleCheckFormChange} />
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'meteorological-logger-temp'}
                                                        name={'meteorological-logger-temp'}
                                                        checked={dataForm["meteorological-logger-temp"]}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'Logger Temp'}
                                                        onChange={handleCheckFormChange} />
                                                </div>
                                            </Collapse>
                                        </div>
                                    </Col>
                                    {/* Other Options Column */}
                                    <Col style={{ width: '18rem' }}>
                                        {/* Interval Group */}
                                        <div key={'radio-interval'} className="mb-3">
                                            <h3
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setShow({ ...show, showInterval: !show.showInterval })}>Interval 
                                            <i className={show.showInterval ? "arrow down": "arrow up"}></i></h3>
                                            <Collapse in={show.showInterval}>
                                            <div>
                                                <Form.Check
                                                    type={'radio'}
                                                    id={'interval-minute'}
                                                    name={"interval-group"}
                                                    value={'1'}
                                                    checked={(dataForm["interval-group"] === "1") ? true : false}
                                                    label={'1-minute'}
                                                    onChange={handleRadioFormChange} />
                                                <Form.Check
                                                    type={'radio'}
                                                    id={'interval-hourly'}
                                                    name={"interval-group"}
                                                    value={'2'}
                                                    checked={(dataForm["interval-group"] === "2") ? true : false}
                                                    label={'hourly'}
                                                    onChange={handleRadioFormChange} />
                                                <Form.Check
                                                    type={'radio'}
                                                    id={'interval-daily'}
                                                    name={"interval-group"}
                                                    value={'3'}
                                                    checked={(dataForm["interval-group"] === "3") ? true : false}
                                                    label={'daily'}
                                                    onChange={handleRadioFormChange} />
                                            </div>
                                            </Collapse>
                                        </div>
                                        {/* Output Group */}
                                        <div key={'radio-output'} className="mb-3">
                                            <h3
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setShow({ ...show, showOutputType: !show.showOutputType })}>Output Type 
                                            <i className={show.showOutputType ? "arrow down": "arrow up"}></i></h3>
                                            <Collapse in={show.showOutputType}>
                                                <div>
                                                    <Form.Check
                                                        type={'radio'}
                                                        id={'output-graph'}
                                                        name={"output-group"}
                                                        value={'1'}
                                                        checked={(dataForm["output-group"] === "1") ? true : false}
                                                        disabled={dataForm["output-raw"]}
                                                        label={'Graph'}
                                                        onChange={handleRadioFormChange} />
                                                    <div key={'radio-download'} className="mb-3" style={{ marginLeft: "24px" }}>
                                                        <h4 style={{ fontWeight: "normal", opacity: "0.75", marginTop: "12px" }}>Download</h4>
                                                        <Form.Check
                                                            type={'radio'}
                                                            id={'output-ascii'}
                                                            name={"output-group"}
                                                            value={'2'}
                                                            checked={(dataForm["output-group"] === "2" || (dataForm["output-group"] === "1" && dataForm["output-raw"])) ? true : false}
                                                            label={'Ascii Text'}
                                                            onChange={handleRadioFormChange} />
                                                        <Form.Check
                                                            type={'radio'}
                                                            id={'output-zip'}
                                                            name={"output-group"}
                                                            value={'3'}
                                                            checked={(dataForm["output-group"] === "3") ? true : false}
                                                            label={'Zip Compressed'}
                                                            onChange={handleRadioFormChange} />
                                                    </div>
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'output-raw'}
                                                        name={"output-raw"}
                                                        checked={dataForm["output-raw"]}
                                                        label={'Raw Data'}
                                                        onChange={handleRawDataCheckChange} />
                                                </div>
                                            </Collapse>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </FormGroup>
                    </Form>
                    <Container style={{ marginTop: "44px" }}>
                        <Row>
                            <Col className="mb-4" style={{ padding: "0 45px" }} xs={4}>
                                <div className="mb-4">
                                    <Button variant="primary" to="/graph" onClick={handleSubmit}>Submit</Button>{' '}
                                    <Button variant="outline-primary" onClick={handleReset}>Reset</Button>{' '}
                                </div>
                            </Col>
                            <Col className="mb-4" xs={3}>
                                <div key={'options-checkbox'} className="mb-4">
                                    <Form.Check
                                        type={'checkbox'}
                                        id={'options-black-white'}
                                        name={'options-black-white'}
                                        checked={dataForm["options-black-white"]}
                                        disabled={dataForm["output-raw"]}
                                        label={'Black and White Plot'}
                                        onChange={handleCheckFormChange} />
                                    <Form.Check
                                        type={'checkbox'}
                                        id={'options-english-conversion'}
                                        name={'options-english-conversion'}
                                        checked={dataForm["options-english-conversion"]}
                                        label={'English Conversion'}
                                        onChange={handleCheckFormChange} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Collapse>

        </div>
    )
}

export default DataSelection
