import React, { useState, useContext } from 'react'

//todo change to only import individual components
import { Button, Row, Col, Container, Form, FormGroup, Collapse, Modal } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

import 'bootstrap-daterangepicker/daterangepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import arrow from '../images/drop-down-arrow.svg';
import arrowup from '../images/up-arrow.svg';
import arrowright from '../images/keyboard-right-arrow-button.svg';
import closebutton from '../images/close.svg';
import { DataFormContext } from '../contexts/DataFormContext';
import { ranges } from '../DefaultConstants';
import useDateShift from '../Hooks/useDateShift';
import useHandleDataSelectionForm from '../Hooks/useHandleDataSelectionForm';

/** @typedef StateSetter */
/**
 * DataSelection functional component to handle data selection form process
 * @param  {{ handleSubmit: Function, handleReset: Function, initialShowSelection: object, showModal: boolean, setShowModalState: StateSetter}} props
 */
const DataSelection = ({
    handleSubmit, handleReset,
    initialShowSelection,
    showModal, setShowModalState }) => {

    // button styles
    const button_cal_styles = { backgroundColor: "transparent", boxShadow: "none", borderColor: "transparent", color: "#003B71", padding: "5px" }

    const { dataForm, dateState, dateReference, handleDateCallback } = useContext(DataFormContext);
    const [show, setShow] = useState(initialShowSelection);
    const [handleCheckFormChange, handleRadioFormChange, handleRawDataCheckChange] = useHandleDataSelectionForm();
    const [previousDay, nextDay, previousMonth, nextMonth, previousYear, nextYear] = useDateShift();


    return (
        <div>
            <h2
                style={{ cursor: "pointer" }}
                onClick={() => {
                    if (!show.showDataSelection) {
                        setShow({ showDataSelection: true, showIrradiance: true, showMeteorological: true, showInterval: true, showOutputType: true })
                    } else {
                        setShow({ ...show, showDataSelection: false })
                    }
                }}>
                Data Selection
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
                                        startDate: dateState.start.toDate(), endDate: dateState.end.toDate(), showDropdowns: true,
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
                                        }}
                                    >
                                        <i className="fa fa-calendar"></i>&nbsp;
                                        <span>{dateState.label}</span> <i className="fa fa-caret-down"></i>
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
                                                <img src={show.showIrradiance ? arrowup : arrow} alt={show.showIrradiance ? "arrow up" : "arrow down"} style={{ marginLeft: "10px" }} width={10} height={10} />
                                            </h3>
                                            <Collapse in={show.showIrradiance}>
                                                <div>
                                                    <Form.Check
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

                                        {/* Output Group */}
                                        <div key={'radio-output'} className="mb-3">
                                            <h3
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setShow({ ...show, showOutputType: !show.showOutputType })}>Output Type
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
                                                        label={'graph'}
                                                        onChange={handleRadioFormChange} />

                                                    {/* Download Group */}
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
                                                            label={'zip compressed'}
                                                            onChange={handleRadioFormChange} />

                                                        {/* Interval Group */}
                                                        <div key={'radio-interval'} className="mb-3" style={{ marginLeft: "24px" }}>
                                                            <h4
                                                                style={{ fontWeight: "normal", opacity: "0.75", marginTop: "12px" }}>Interval
                                                            </h4>
                                                            <Collapse in={show.showInterval}>
                                                                <div>
                                                                    <Form.Check
                                                                        type={'radio'}
                                                                        id={'interval-minute'}
                                                                        name={"interval-group"}
                                                                        value={'1'}
                                                                        checked={(dataForm["interval-group"] === "1") ? true : false}
                                                                        //FIXED: bug: interval is not enabled if output type is originally graph after checking raw data, check during submit
                                                                        disabled={(dataForm["output-group"] !== "1" || (dataForm["output-group"] === "1" && dataForm["output-raw"])) ? false : true}
                                                                        label={'1-minute'}
                                                                        onChange={handleRadioFormChange} />
                                                                    <Form.Check
                                                                        type={'radio'}
                                                                        id={'interval-hourly'}
                                                                        name={"interval-group"}
                                                                        value={'2'}
                                                                        checked={(dataForm["interval-group"] === "2") ? true : false}
                                                                        disabled={(dataForm["output-group"] !== "1" || (dataForm["output-group"] === "1" && dataForm["output-raw"])) ? false : true}
                                                                        label={'hourly'}
                                                                        onChange={handleRadioFormChange} />
                                                                    <Form.Check
                                                                        type={'radio'}
                                                                        id={'interval-daily'}
                                                                        name={"interval-group"}
                                                                        value={'3'}
                                                                        checked={(dataForm["interval-group"] === "3") ? true : false}
                                                                        disabled={(dataForm["output-group"] !== "1" || (dataForm["output-group"] === "1" && dataForm["output-raw"])) ? false : true}
                                                                        label={'daily'}
                                                                        onChange={handleRadioFormChange} />
                                                                </div>
                                                            </Collapse>
                                                        </div>
                                                    </div>
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        id={'output-raw'}
                                                        name={"output-raw"}
                                                        checked={dataForm["output-raw"]}
                                                        label={'Raw (All) Data'}
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
                                    <Button variant="primary" onClick={handleSubmit} type="submit">Submit</Button>{' '}
                                    <Button variant="outline-primary" onClick={handleReset}>Reset</Button>{' '}

                                    <Modal show={showModal} onHide={() => { setShowModalState(false) }}>
                                        <Modal.Header>
                                            <Modal.Title>Error</Modal.Title>
                                            <img src={closebutton} height={20} width={20}
                                                alt={"Close Modal"}
                                                onClick={() => { setShowModalState(false) }}
                                                style={{ alignSelf: "flex-end", marginBottom: "5px", marginRight: "10px", cursor: "pointer" }}></img>
                                        </Modal.Header>
                                        <Modal.Body>No selection was made</Modal.Body>
                                        <div style={{ marginBottom: "10px" }}>
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
