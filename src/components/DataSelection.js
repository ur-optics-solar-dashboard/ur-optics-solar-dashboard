import React, { useState } from 'react'

//todo change to only import individual components
import { Button, Row, Col, Container, Form, FormGroup, Collapse, Modal } from 'react-bootstrap';

// DateRangePicker: https://github.com/skratchdot/react-bootstrap-daterangepicker
// react wrapper for https://github.com/dangrossman/daterangepicker
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

import 'bootstrap-daterangepicker/daterangepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import arrow from '../images/drop-down-arrow.svg';
import arrowup from '../images/up-arrow.svg';
import arrowright from '../images/keyboard-right-arrow-button.svg';
import closebutton from '../images/close.svg';


const DataSelection = ({ start, end, dateReference, ranges, handleDateCallback, label,
    dataForm, setDataFormState, handleCheckFormChange, handleRadioFormChange, handleRawDataCheckChange, handleSubmit, handleReset,
    initialShowSelection,
    showModal, handleShowModal, handleCloseModal }) => {
    const [show, setShow] = useState(initialShowSelection)

    const handleDataShowSelection = () => {
        if (!show.showDataSelection) {
            setShow({ showDataSelection: true, showIrradiance: true, showMeteorological: true, showInterval: true, showOutputType: true })
        } else {
            setShow({ ...show, showDataSelection: false })
        }
    }

    const button_cal_styles = { backgroundColor: "transparent", boxShadow: "none", borderColor: "transparent", color: "#003B71", padding: "5px" }


    const previousDay = () => {
        handleDateCallback(start.subtract(1, 'days'), end.subtract(1, 'days'), "Custom Range");
    }

    const nextDay = () => {
        handleDateCallback(start.add(1, 'days'), end.add(1, 'days'), "Custom Range");
    }

    const previousMonth = () => {
        handleDateCallback(start.subtract(1, 'month'), end.subtract(1, 'month'), "Custom Range");
    }

    const nextMonth = () => {
        handleDateCallback(start.add(1, 'month'), end.add(1, 'month'), "Custom Range");
    }


    const previousYear = () => {
        handleDateCallback(start.subtract(1, 'year'), end.subtract(1, 'year'), "Custom Range");
    }

    const nextYear = () => {
        handleDateCallback(start.add(1, 'year'), end.add(1, 'year'), "Custom Range");
    }


    return (
        <div>
            <h2
                style={{ cursor: "pointer" }}
                onClick={handleDataShowSelection}>
                Data Selection
                {/* <i className={show.showDataSelection ? "arrow down": "arrow up"}></i> */}
                <img src={show.showDataSelection ? arrowup : arrow} alt={show.showDataSelection ? "arrow up" : "arrow down"} style={{ marginLeft: "10px" }} width={10} height={10} />
            </h2>

            <Collapse in={show.showDataSelection}>
                <div>
                    <Container style={{ marginLeft: "25%", marginTop: "20px" }}>
                        <Row>
                            <Col md={{ span: 10, offset: 1 }}>
                                <DateRangePicker
                                    // todo better predefined ranges that make sense for this product
                                    ref={dateReference}
                                    initialSettings={{
                                        startDate: start.toDate(), endDate: end.toDate(), showDropdowns: true,
                                        ranges: ranges,
                                        minDate: moment().subtract(5, 'year').startOf('year'), maxDate: moment().toDate(), alwaysShowCalendars: true
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
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 3, offset: 0.5 }}>
                                <img src={arrowright} style={{ transform: "rotate(180deg)" }} alt={"arrow left"} width={10} height={10} />
                                <Button style={button_cal_styles} onClick={previousYear}>Year</Button>
                                <Button style={button_cal_styles} onClick={previousMonth}>Month</Button>
                                <Button style={button_cal_styles} onClick={previousDay}>Day</Button>
                            </Col>
                            <Col md={3}>
                                <Button style={button_cal_styles} onClick={nextDay}>Day</Button>
                                <Button style={button_cal_styles} onClick={nextMonth}>Month</Button>
                                <Button style={button_cal_styles} onClick={nextYear}>Year</Button>
                                <img src={arrowright} alt={"arrow right"} width={10} height={10} />
                            </Col>
                        </Row>
                    </Container>
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
                                                {/* <i className={show.showIrradiance ? "arrow down": "arrow up"}/> */}
                                                <img src={show.showIrradiance ? arrowup : arrow} alt={show.showIrradiance ? "arrow up" : "arrow down"} style={{ marginLeft: "10px" }} width={10} height={10} />
                                            </h3>
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
                                                {/* <i className={show.showMeteorological ? "arrow down": "arrow up"}></i> */}
                                                <img src={show.showMeteorological ? arrowup : arrow} alt={show.showMeteorological ? "arrow up" : "arrow down"} style={{ marginLeft: "10px" }} width={10} height={10} />
                                            </h3>
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
                                                {/* <i className={show.showInterval ? "arrow down": "arrow up"}></i> */}
                                                <img src={show.showInterval ? arrowup : arrow} alt={show.showInterval ? "arrow up" : "arrow down"} style={{ marginLeft: "10px" }} width={10} height={10} />
                                            </h3>
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
                                                {/* <i className={show.showOutputType ? "arrow down": "arrow up"}></i> */}
                                                <img src={show.showOutputType ? arrowup : arrow} alt={show.showOutputType ? "arrow up" : "arrow down"} style={{ marginLeft: "10px" }} width={10} height={10} />
                                            </h3>
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
                                                            id={'output-csv'}
                                                            name={"output-group"}
                                                            value={'2'}
                                                            checked={(dataForm["output-group"] === "2" || (dataForm["output-group"] === "1" && dataForm["output-raw"])) ? true : false}
                                                            label={'csv'}
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
                                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>{' '}
                                    <Button variant="outline-primary" onClick={handleReset}>Reset</Button>{' '}

                                    <Modal show={showModal} onHide={handleCloseModal}>
                                        <Modal.Header>
                                            <Modal.Title>Error</Modal.Title>
                                            <img src={closebutton} height={20} width={20} 
                                            alt={"Close Modal"}
                                            onClick={handleCloseModal}
                                            style={{alignSelf:"flex-end", marginBottom:"5px", marginRight:"10px", cursor:"pointer"}}></img>
                                        </Modal.Header>
                                        <Modal.Body>No selection was made</Modal.Body>
                                        <div style={{marginBottom:"10px"}}>
                                        </div>
                                    </Modal>
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
