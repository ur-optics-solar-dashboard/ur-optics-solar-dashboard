import axios from 'axios';

export const setAuthToken = (token) => {
    sessionStorage.setItem('access_token', token);
    window.dispatchEvent(new Event('storage'));
}

export const getAuthToken = () => {
    return sessionStorage.getItem('access_token');
}

export const clearAuthToken = () => {
    sessionStorage.removeItem('access_token');
    window.dispatchEvent(new Event('storage'));
}

export const getBoxUserInfo = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken(),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };

    let userdata = await axios.get(
        'https://api.box.com/2.0/users/me',
        { headers: headers }
    )
    .then(response => response.data)
    .catch((error) => {
        if (error.response !== undefined) {
            if (error.response.status === 401) { //prompt for login again
                console.log('re-auth needed');
                clearAuthToken();
            }
        }
        else { //something else went wrong
            console.log('a mysterious error occurred.');
            console.log(error);
        }
    });

    if (userdata !== undefined) {
        let output = {
            name: userdata.name,
            email: userdata.login,
            space_used: userdata.space_used,
            space_total: userdata.space_amount
        }
        console.log(output);
        return output;
    }
    return null;

    // console.log(userdata);

    // return userdata; //might be undefined

}