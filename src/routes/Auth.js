import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';
import AuthPrompt from '../newcomponents/AuthPrompt'
import { Button } from 'react-bootstrap';

const AuthButton = () => {
    return (
        <Button onClick={ () => { window.location.href = 'http://localhost:5000/get_box_auth_url' } }>Authenticate with Box</Button>
    )
}

const Auth = () => {
    return (
        <>
        <SidebarLayout width={290}>
            <AuthPrompt /> { /* for testing */ }
            <h1>Login</h1>
            <p>You must log in with your Box account in order to view and download sensor data.</p>
            <AuthButton></AuthButton>
        </SidebarLayout>
        </>
    )
}

export default Auth;