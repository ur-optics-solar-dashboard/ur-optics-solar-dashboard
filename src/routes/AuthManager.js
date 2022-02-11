import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';
import AuthRedirectSpinner from '../newcomponents/AuthRedirectSpinner';
import { AuthButton } from '../newcomponents/AuthPrompt';

import { useState, useEffect } from 'react';

import boxAuthConfig from '../secrets/boxconfig.json';
import axios from 'axios';
import { getAuthToken, getBoxUserInfo, setAuthToken } from '../Utils';
import AuthUserInfo from '../newcomponents/AuthUserInfo';

import Toast from '../newcomponents/Toast';

let qs = require('qs');

const AuthRedirect = () => {

    const [hasCode, setHasCode] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        tradeCode();
        getUserInfo();
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
        setAuthToken(accessToken);
        //redirect away
        window.location.href = "/";
    }

    const getUserInfo = async () => {
        let userinfo = await getBoxUserInfo();
        if (userinfo !== null) { setUserInfo(userinfo); }
    }

    return (
        <>
        <SidebarLayout width={290}>
            { /* this is so ugly. */}
            { (hasCode) ? <AuthRedirectSpinner /> :
                (getAuthToken() !== null) ? 
                    <AuthUserInfo
                        name={userInfo.name}
                        email={userInfo.email}
                        space_used={userInfo.space_used}
                        space_total={userInfo.space_total}
                        /> :
                            <>
                                <p>You are not authenticated with Box, please log in.</p>
                                <br />
                                <AuthButton />
                            </>
            }
            <Toast />
        </SidebarLayout>
        </>
    )
}

export default AuthRedirect;