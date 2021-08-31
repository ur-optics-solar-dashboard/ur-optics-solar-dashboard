
import Select from 'react-select';

// import { colourOptions } from '../data';

import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../components/SidebarLayout';
import ExportButton from '../components/ExportButton';
import { useState } from 'react';
import DateSelection from '../components/DateSelection';

const IrridianceOptions = [
    { value: 'irradiance-global-horizontal', label: 'Global Horizontal', color: '#00B8D9' },
    { value: 'irradiance-direct-normal', label: 'Direct Normal', color: '#0052CC' },
    { value: 'irradiance-diffuse-horizontal', label: 'Diffuse Horizontal', color: '#5243AA' },
];

const Main = () => {
    const [exportOptionsState, setExportOptionsState] = useState(0)

    return (
        <>
            <SidebarLayout width={290}>
                <div className="main-content">
                    <h2 id="main-title">Data Export Tool</h2>
                    <section className="section-selection">
                        <h4 id="section-title-selection">Data Selection</h4>
                        <div className="data-wrapper">
                            <div className="data-half-section">
                                <h6>Irradiance</h6>

                                <div style={{ paddingRight: 10 }}>
                                    <Select
                                        isMulti
                                        options={IrridianceOptions}>
                                    </Select>
                                </div>

                            </div>
                            <div className="data-half-section">
                                <h6>Meteorological</h6>

                                <div style={{ paddingRight: 10 }}>
                                    <Select
                                        isMulti
                                        options={IrridianceOptions}>
                                    </Select>
                                </div>

                            </div>
                        </div>
                    </section>


                    <section className="section-options">
                        <div className="options-wrapper">
                            <div className="options-half-section">
                                <h4>Export Options</h4>
                                <div className="options-export-wrapper">
                                    <div className="options-export-half-section">
                                        {/* <button className="export-option-button">csv</button> */}

                                        <ExportButton backgroundColor="#8F677F80" hoverColor="#8F677F" textColor="#FFFFFF" selected={exportOptionsState === 1}
                                            onClick={() => { setExportOptionsState(1) }}>
                                            csv
                                        </ExportButton>

                                        <ExportButton backgroundColor="#8F677F80" hoverColor="#8F677F" textColor="#FFFFFF" selected={exportOptionsState === 2}
                                            onClick={() => { setExportOptionsState(2) }}>
                                            ASCII Text
                                        </ExportButton>

                                        <ExportButton backgroundColor="#8F677F" hoverColor="#8F677F80" textColor="#FFFFFF" selected={false}
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
                            </div>
                            <div className="options-half-section">
                                <h4>Graph Options</h4>
                                <div className="graph-options-wrapper" style={{ paddingRight: 10 }}>
                                    <DateSelection/>
                                </div>
                            </div>
                        </div>
                    </section>


                    <Select
                        options={IrridianceOptions}>
                    </Select>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                    <h1>Iusto ipsum accusamus vero recusandae! </h1>
                    <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                    <h1>minus unde culpa harum veniam nulla. Impedit.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                    <h1>Iusto ipsum accusamus vero recusandae! </h1>
                    <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                    <h1>minus unde culpa harum veniam nulla. Impedit.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                    <h1>Iusto ipsum accusamus vero recusandae! </h1>
                    <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                    <h1>minus unde culpa harum veniam nulla. Impedit.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                    <h1>Iusto ipsum accusamus vero recusandae! </h1>
                    <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                    <h1>minus unde culpa harum veniam nulla. Impedit.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                    <h1>Iusto ipsum accusamus vero recusandae! </h1>
                    <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                    <h1>minus unde culpa harum veniam nulla. Impedit.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h1>
                    <h1>Iusto ipsum accusamus vero recusandae! </h1>
                    <h1>Aperiam, molestias autem dicta fugit alias neque eum deleniti cupiditate, </h1>
                    <h1>minus unde culpa harum veniam nulla. Impedit.</h1>
                </div>
            </SidebarLayout>


        </>
    )
}

export default Main
