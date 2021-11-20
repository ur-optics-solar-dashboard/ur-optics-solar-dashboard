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

const buildBoxRequestHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken(),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
}

const handleBoxError = (error) => {
    if (error.response !== undefined) {
        if (error.response.status === 401) { //needs login
            clearAuthToken();
        }
        else {
            makeToast('Box API threw error ' + error.response.status, 'danger');
        }
    }
    else {
        makeToast('An unknown error occurred when accessing Box', 'danger');
    }
    console.log(error);
}

export const getBoxUserInfo = async () => {
    let userdata = await axios.get(
        'https://api.box.com/2.0/users/me',
        { headers: buildBoxRequestHeaders() }
    )
    .then(response => response.data)
    .catch((error) => handleBoxError(error));

    if (userdata !== undefined) {
        let output = {
            name: userdata.name,
            email: userdata.login,
            space_used: userdata.space_used,
            space_total: userdata.space_amount
        }
        return output;
    }
    return null;

}

export const getBoxAllCSVs = async () => {
    let folderInfo = await axios.get(
        'https://api.box.com/2.0/folders/0/items/',
        { headers: buildBoxRequestHeaders() }
    )
    .then(response => response.data)
    .catch((error) => handleBoxError(error));

    console.log(folderInfo);

    if (folderInfo !== undefined) {
        let output = [];
        for (let i = 0; i < folderInfo.entries.length; i++) {
            if (folderInfo.entries[i].name.endsWith('.csv')) { output.push(folderInfo.entries[i].id); }
        }
        return output;
    }
    return null;

}

export const makeToast = (message, category) => {
    window.dispatchEvent(new CustomEvent('toast', {
        detail: {
            message: message,
            category: category
        }
    }));
}