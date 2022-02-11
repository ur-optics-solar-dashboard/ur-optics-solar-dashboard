import '../App.css'

import './SidebarUsername.css'
import 'react-pro-sidebar/dist/css/styles.css';
import { AuthButton } from './AuthPrompt';

import { useState, useEffect } from 'react';

import { getAuthToken, getBoxUserInfo } from '../Utils';

const SidebarUsername = () => {

    const [authStatus, setAuthStatus] = useState([]);
    const [username, setUsername] = useState([]);

    useEffect(() => {
        checkHasAuth();
        getUserInfo();
    }, []);

    const checkHasAuth = () => {
        setAuthStatus(getAuthToken() !== null);
    }

    const getUserInfo = async () => { //get box username
        let userinfo = await getBoxUserInfo();
        if (userinfo !== null) { setUsername(userinfo.name); }

    }

    if (authStatus) { //logged in, show profile info
        return (
            <>
                <div className="sidebar-user-wrapper">
                    <a className="sidebar-user-name" href="/auth">Box Settings ({ username })</a>
                </div>
            </>
        )
    }
    else { //prompt for login real quick
        return (
        <>
            <div className="sidebar-user-wrapper">
                <AuthButton />
            </div>
        </>);
    }

}

export default SidebarUsername;