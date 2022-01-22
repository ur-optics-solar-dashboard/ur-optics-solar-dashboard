import React, { useState } from 'react'
import ExportButton from './ExportButton'

import "./ExportOptionsSection.css"

const ExportOptionsSection = () => {
    // only select a single option for now (users probably wouldn't need any more)
    const [exportOptionsState, setExportOptionsState] = useState(0);

    return (
        <div className="options-export-wrapper">
            <div className="options-export-half-section">

                <ExportButton selected={exportOptionsState === 1}
                    onClick={() => { setExportOptionsState(1) }}>
                    CSV
                </ExportButton>

                <ExportButton selected={exportOptionsState === 2}
                    onClick={() => { setExportOptionsState(2); }}>
                    ASCII Text
                </ExportButton>

                <ExportButton variant='submit' selected={false}
                    onClick={() => {
                        //todo: export
                    }}>
                    Export Files
                </ExportButton>

            </div>
            <div className="options-export-half-section">
                <ExportButton selected={exportOptionsState === 3}
                    onClick={() => { setExportOptionsState(3) }}>
                    JSON
                </ExportButton>

                <ExportButton selected={exportOptionsState === 4}
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
