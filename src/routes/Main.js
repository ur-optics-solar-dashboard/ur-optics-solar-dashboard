
import Select from 'react-select';

// import { colourOptions } from '../data';

import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';
import { useContext, useState } from 'react';
import DataExportTools from '../newcomponents/DataExportTools';
import Graph from '../newcomponents/Graph';
import { GlobalContext } from '../contexts/GlobalContext';
import AuthPrompt from '../newcomponents/AuthPrompt';

const Main = () => {
    const { showGraph } = useContext(GlobalContext);
    return (
        <>
            <SidebarLayout width={290}>
                <AuthPrompt />
                <DataExportTools />
            </SidebarLayout>
        </>
    )
}

export default Main
