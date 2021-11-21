// import { colourOptions } from '../data';

import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';
// import { useContext } from 'react';
import Graph from '../newcomponents/Graph';
// import { GlobalContext } from '../contexts/GlobalContext';
import { AuthPrompt } from '../newcomponents/AuthPrompt';
import Toast from '../newcomponents/Toast';

const MainGraph = () => {
    // const { showGraph } = useContext(GlobalContext);
    return (
        <>
            <SidebarLayout width={290}>
                <AuthPrompt />
                <Graph />
                <Toast />
            </SidebarLayout>
        </>
    )
}

export default MainGraph
