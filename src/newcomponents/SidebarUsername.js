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
        // const response = await fetch('/get_box_user_info');
        // const data = await response.json();
        // setUsername(data['name']);
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + getAuthToken(),
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Credentials': true
        // }
        // let userdata = await axios.get(
        //     'https://api.box.com/2.0/users/me',
        //     { headers: headers }
        // )
        // .then(response => response.data)
        // .catch(function(error) {
        //     if (error.response) {
        //         if (error.response.status === 401) { //prompt for login again
        //             //clear out access_token
        //             clearAuthToken();
        //             console.log("sign in again")
        //         }
        //         else { //something else went wrong
        //             console.log(error.response.status);
        //         }
        //     }
        // });

        // if (userdata !== undefined) {
        //     console.log(userdata);
        //     setUsername(userdata.name);
        // }

        let userinfo = await getBoxUserInfo();
        if (userinfo !== null) { setUsername(userinfo.name); }

    }

    if (authStatus) { //logged in, show profile info
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