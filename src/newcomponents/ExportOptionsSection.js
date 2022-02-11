import React, { useContext, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext';
import { useExportOptionsSubmit } from '../hooks/useExportOptionsSubmit';
import { makeToast } from '../Utils';
import ExportButton from './ExportButton'
import ExportGridText from './ExportGridText';

import "./ExportOptionsSection.css"

const ExportOptionsSection = () => {

    const { getPlainData, dateState } = useContext(GlobalContext);
    
    // only select a single option for now (users probably wouldn't need any more)
    const [exportOptionsState, setExportOptionsState] = useState(0);
    const [handleExportOptionsSubmit] = useExportOptionsSubmit({exportOptions: exportOptionsState});

    const [statusLabelText, setStatusLabelText] = useState('');

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
                        makeToast('Preparing data for export, this may take a while.', 'info');
                        getPlainData({
                            start: dateState.start,
                            end: dateState.end,
                            aggregate: false,
                            setStatusTextFunction: setStatusLabelText,
                            callback: (data) => {
                                makeToast('Export complete, data will be available for download shortly.', 'success');
                                setStatusLabelText('');
                                handleExportOptionsSubmit(data);
                            }
                        });
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

                <ExportGridText text={statusLabelText}></ExportGridText>
            </div>
        </div>
    )
}

ExportOptionsSection.propTypes = {

}

export default ExportOptionsSection
