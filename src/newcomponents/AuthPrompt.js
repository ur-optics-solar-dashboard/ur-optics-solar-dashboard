import './AuthPrompt.css';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

//TODO: this is so bad don't ever do this
import boxAuthConfig from '../secrets/boxconfig.json';
import { getAuthToken } from '../Utils';

//box auth
var authorizationUrl = boxAuthConfig.baseUrl + '?client_id=' + boxAuthConfig.clientID + '&response_type=code';

const AuthButton = () => {
    return (
        <Button onClick={
            () => { window.location.href = authorizationUrl}
        }>Login with Box</Button>
    );
}

const AuthPrompt = () => {

    const [authStatus, setAuthStatus] = useState([]);

    useEffect(() => {
        checkHasAuth();
        window.addEventListener('keydown', (e)=>{
            if (e.storageArea === sessionStorage) {
            console.log('checked');
            checkHasAuth();
            }
        });
    }, []);

    const checkHasAuth = async () => { //check if the session has an access_token
        setAuthStatus(getAuthToken() !== null);
    }

    //if access_token is ever suspected to disappear, check again
    // window.addEventListener('storage', function(e) {
    //     console.log('checked');
    //     checkHasAuth();
    // });

    if (!authStatus) { //no access token, so prompt for sign in
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