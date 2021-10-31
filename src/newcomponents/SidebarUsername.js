import '../App.css'

import './SidebarUsername.css'
import 'react-pro-sidebar/dist/css/styles.css';
import { AuthButton } from './AuthPrompt';

import { useState, useEffect } from 'react';

const SidebarUsername = () => {

    const [authStatus, setAuthStatus] = useState([]);
    const [username, setUsername] = useState([]);

    useEffect(() => {
        checkHasAuth();
        getUserInfo();
    }, []);

    const checkHasAuth = async () => {
        const response = await fetch('/get_box_has_auth');
        const data = await response.text();
        setAuthStatus(data);
    }

    const getUserInfo = async () => { //get box username from backend
        const response = await fetch('/get_box_user_info');
        const data = await response.json();
        setUsername(data['name']);
    }

    if (authStatus !== 'false') { //logged in, show profile info
        return (
            <>
                <div className="sidebar-user-wrapper">
                    <a className="sidebar-user-name" href="/auth">{ username }</a>
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