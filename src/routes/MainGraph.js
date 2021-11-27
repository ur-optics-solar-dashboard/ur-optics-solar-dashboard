import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';
import Graph from '../newcomponents/Graph';
import { AuthPrompt } from '../newcomponents/AuthPrompt';
import Toast from '../newcomponents/Toast';

const MainGraph = () => {
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
