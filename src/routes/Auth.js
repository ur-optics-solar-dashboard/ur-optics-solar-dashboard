import '../App.css';

import 'react-pro-sidebar/dist/css/styles.css';

import SidebarLayout from '../newcomponents/SidebarLayout';
import { Button } from 'react-bootstrap';

import qs from 'qs';

//https://developer.box.com/guides/authentication/oauth2/without-sdk/
const boxAuthBaseUrl = 'https://account.box.com/api/oauth2/authorize';
const boxClientId = '53auv0kpu78s3zck9rfpah1lcz3or05z'; //TODO: replace with real app id
const boxAuthorizationUrl = boxAuthBaseUrl + '?client_id=' + boxClientId + '&response_type=code';

const AuthButton = () => {
    return (
        <Button onClick={ () => { window.location.href = boxAuthorizationUrl } }>Authenticate with Box</Button>
    )
}

const AuthCallbackResponse = (code) => {
    return (
        <p>Callback: { code }</p>
    )
}

//check for auth callback key
let query = qs.parse(window.location.href.split('?')[1]);

const Auth = () => {
    return (
        <>
        <SidebarLayout width={290}>
            <h1>Authentication Flow</h1>
            { (!query.hasOwnProperty('code')) ? AuthButton() : AuthCallbackResponse(query['code']) }
        </SidebarLayout>
        </>
    )
}

export default Auth;