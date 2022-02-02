import React, { useState, useContext } from 'react'
import ExportButton from './ExportButton'
import './ExportOptionsSection.css'
import "./DataExportTools.css";

import '../App.css';

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
    
    return (
        <div>
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