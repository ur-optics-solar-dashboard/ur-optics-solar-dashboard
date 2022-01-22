import React, { useState, useContext } from 'react'
import ExportButton from './ExportButton'
import './ExportOptionsSection.css'
import "./DataExportTools.css";

import '../App.css';

//todo change to only import individual components
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


import { useDownloadChartSubmit } from '../hooks/useDownloadChartSubmit';
import { GlobalContext } from '../contexts/GlobalContext';

/**
 * Download graph options
 *
 * @component
 * @example
 * return (
 *   <DownloadGraphOptions/>
 * )
 */
const DownloadGraphOptions = () => {
    const {graphData} = useContext(GlobalContext);

    const [downloadSelection, setDownloadSelection] = useState(0);
    const [handleChartSubmit] = useDownloadChartSubmit({ downloadSelection, graphData });

    // useEffect(() => {
    //     console.log("down ",downloadSelection)
    // }, [])

    return (
        <div>
            {/* <fieldset onChange={(value) => setDownloadSelection(value)}>
            <label><input type="radio" name="group1" value={0} checked={downloadSelection === 0}/>csv</label>
            <label><input type="radio" name="group1" value={1} checked={downloadSelection === 1}/>json</label>
            <label><input type="radio" name="group1" value={2} checked={downloadSelection === 2}/>png</label>
            <label><input type="radio" name="group1" value={3} checked={downloadSelection === 3}/>jpeg</label>
            <label><input type="radio" name="group1" value={4} checked={downloadSelection === 4}/>svg</label>
            </fieldset> */}

            {/* <h2>Graph Download Options</h2> */}
            {/* <Form>
                <Form.Check>
                    <Form.Check inline label="CSV" name="group1" type='radio' id={`inline-radio-0`} value={0} onClick={() => {setDownloadSelection(0); console.log("hi")}} />
                    <Form.Check inline label="ZIP Compressed" name="group1" type='radio' id={`inline-radio-1`} value={1} onChange={() => setDownloadSelection(1)} />
                    <Form.Check inline label="JSON" name="group1" type='radio' id={`inline-radio-5`} value={5} onChange={() => setDownloadSelection(5)} />
                    <Form.Check inline label="PNG" name="group1" type='radio' id={`inline-radio-2`} value={2} onChange={() => setDownloadSelection(2)} />
                    <Form.Check inline label="JPEG" name="group1" type='radio' id={`inline-radio-3`} value={3} onChange={() => setDownloadSelection(3)} />
                    <Form.Check inline label="SVG" name="group1" type='radio' id={`inline-radio-4`} value={4} onChange={() => setDownloadSelection(4)} />
                </Form.Check>

                <Button variant="primary" style={{ margin: "20px 0px 10px 50px" }} onClick={handleChartSubmit}>
                    Download Data
                </Button>
            </Form> */}

            <div className="graph-options-wrapper" style={{width: "50%"}}>
                <h4>Graph Download Options</h4>
                <div className="options-export-wrapper">
                    <div className="options-export-half-section">
                        <ExportButton selected={downloadSelection === 0}
                            onClick={() => { setDownloadSelection(0); }}>
                            CSV
                        </ExportButton>
                        <ExportButton selected={downloadSelection === 1}
                            onClick={() => { setDownloadSelection(1); }}>
                            ZIP Compressed
                        </ExportButton>
                        <ExportButton selected={downloadSelection === 5}
                            onClick={() => { setDownloadSelection(5); }}>
                            JSON
                        </ExportButton>
                        <ExportButton selected={false} variant={"submit"}
                            onClick={handleChartSubmit}>
                            Download Graph
                        </ExportButton>
                    </div>
                    <div className="options-export-half-section">
                        <ExportButton selected={downloadSelection === 2}
                            onClick={() => { setDownloadSelection(2); }}>
                            PNG
                        </ExportButton>
                        <ExportButton selected={downloadSelection === 3}
                            onClick={() => { setDownloadSelection(3); }}>
                            JPEG
                        </ExportButton>
                        <ExportButton selected={downloadSelection === 4}
                            onClick={() => { setDownloadSelection(4); }}>
                            SVG
                        </ExportButton>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DownloadGraphOptions