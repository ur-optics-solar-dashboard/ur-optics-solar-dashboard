import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';
import { Button } from 'react-bootstrap';

const Auth = () => {
    return (
        <>
        <SidebarLayout width={290}>
            <h1>Authentication Flow</h1>
            <Button>Authenticate with Box</Button>
        </SidebarLayout>
        </>
    )
}

export default Auth;