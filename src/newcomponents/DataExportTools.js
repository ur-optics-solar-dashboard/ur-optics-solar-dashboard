import React from 'react'

import "./DataExportTools.css";
import DataSelectionSection from './DataSelectionSection';
import ExportOptionsSection from './ExportOptionsSection';
import GraphOptionsSection from './GraphOptionsSection';

const DataExportTools = () => {
    return (
        <div className="main-content">
            <h2 id="main-title">Data Export Tool</h2>
            <section className="section-selection">
                <h4 id="section-title-selection">Data Selection</h4>
                <DataSelectionSection/>
            </section>

            <section className="section-options">
                <div className="options-wrapper">
                    <div className="options-half-section">
                        <h4>Export Options</h4>
                        <ExportOptionsSection />
                    </div>
                    <div className="options-half-section">
                        <h4>Graph Options</h4>
                        <GraphOptionsSection />
                    </div>
                </div>
            </section>
        </div>
    )
}

DataExportTools.propTypes = {

}

export default DataExportTools
