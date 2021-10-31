import './AuthPrompt.css';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const AuthButton = () => {
    return (
        <Button onClick={
            () => { window.location.href = 'http://localhost:5000/get_box_auth_url'}
        }>Login with Box</Button>
    );
}

const AuthPrompt = () => {

    const [authStatus, setAuthStatus] = useState([]);

    useEffect(() => {
        checkHasAuth();
    }, []);

    const checkHasAuth = async () => { //check if the backend has an access_token
        const response = await fetch('/get_box_has_auth');
        const data = await response.text();
        setAuthStatus(data);
    }

    if (authStatus === 'false') { //no access token, so prompt for sign in
        return (
            <>
                <div className="auth-prompt-wrapper">
                    <p className="auth-prompt-text">You must log in with your Box account to view and download sensor data.</p>
                    <AuthButton />
                </div>
            </>
        );
    }
    else { //auth token is already stored, no need for a new one
        return <></>
    }
}

export { AuthPrompt, AuthButton };