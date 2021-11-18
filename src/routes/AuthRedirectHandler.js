import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';
import AuthRedirectSpinner from '../newcomponents/AuthRedirectSpinner';
import { AuthButton } from '../newcomponents/AuthPrompt';

import { useState, useEffect } from 'react';

import boxAuthConfig from '../secrets/boxconfig.json';
import axios from 'axios';

let qs = require('qs');

const AuthRedirect = () => {

    const [hasCode, setHasCode] = useState([]);

    useEffect(() => {
        tradeCode();
    }, []);

    const tradeCode = async () => {
        let params = qs.parse(window.location.href.split('?')[1]);
        let code = params.code;
        
        //check for code 
        if (code === undefined) { setHasCode(false); return; }

        //has code
        setHasCode(true);

        let authenticationUrl = boxAuthConfig.authenticationUrl;

        let accessToken = await axios.post(
            authenticationUrl,
            qs.stringify({
                grant_type: 'authorization_code',
                code: code,
                client_id: boxAuthConfig.clientID,
                client_secret: boxAuthConfig.clientSecret
            })
        )
        .then(response => response.data.access_token);

        //store access token, only for session
        sessionStorage.setItem('access_token', accessToken);
        //redirect away
        window.location.href = "/";
    }

    return (
        <>
        <SidebarLayout width={290}>
            { (hasCode) ? <AuthRedirectSpinner /> : <>
                    <p>Invalid redirect, try again with the login button below.</p>
                    <br />
                    <AuthButton />
                </>}
            {/* <AuthRedirectSpinner /> */}
        </SidebarLayout>
        </>
    )
}

export default AuthRedirect;