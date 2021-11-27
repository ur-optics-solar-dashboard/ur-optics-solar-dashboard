import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';
import DataExportTools from '../newcomponents/DataExportTools';
import { AuthPrompt } from '../newcomponents/AuthPrompt';
import Toast from '../newcomponents/Toast';

const Main = () => {
    return (
        <>
            <SidebarLayout width={290}>
                <AuthPrompt />
                <DataExportTools />
                <Toast />
            </SidebarLayout>
        </>
    )
}

export default Main
