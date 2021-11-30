import React, { useState } from 'react'
import ExportButton from './ExportButton'

import "./ExportOptionsSection.css"

const ExportOptionsSection = () => {
    // only select a single option for now (users probably wouldn't need any more)
    const [exportOptionsState, setExportOptionsState] = useState(0);

    return (
        <div className="options-export-wrapper">
            <div className="options-export-half-section">

                <ExportButton backgroundColor="#8F677F80" hoverColor="#8F677F" textColor="#FFFFFF" selected={exportOptionsState === 1}
                    onClick={() => { setExportOptionsState(1) }}>
                    csv
                </ExportButton>

                <ExportButton backgroundColor="#8F677F80" hoverColor="#8F677F" textColor="#FFFFFF" selected={exportOptionsState === 2}
                    onClick={() => { setExportOptionsState(2) }}>
                    ASCII Text
                </ExportButton>

                <ExportButton backgroundColor="#8F677F" hoverColor="#8F677F80" textColor="#FFFFFF" selected={false}
                    // use export button for the styling
                    marginTop={40}
                    onClick={() => {
                        //todo: export
                    }}>
                    Export Files
                </ExportButton>

            </div>
            <div className="options-export-half-section">
                <ExportButton backgroundColor="#8F677F80" hoverColor="#8F677F" textColor="#FFFFFF" selected={exportOptionsState === 3}
                    onClick={() => { setExportOptionsState(3) }}>
                    json
                </ExportButton>

                <ExportButton backgroundColor="#8F677F80" hoverColor="#8F677F" textColor="#FFFFFF" selected={exportOptionsState === 4}
                    onClick={() => { setExportOptionsState(4) }}>
                    ZIP Compressed
                </ExportButton>
            </div>
        </div>
    )
}

ExportOptionsSection.propTypes = {

}

export default ExportOptionsSection
