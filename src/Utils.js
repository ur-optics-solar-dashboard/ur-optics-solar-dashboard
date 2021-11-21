import axios from 'axios';
import moment from 'moment';

//BOX API HELPERS
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
    console.error(error);
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

    clearAuthToken(); //most likely the auth token expired
    return null;

}

export const getBoxAllCSVs = async () => {
    let folderInfo = await axios.get(
        'https://api.box.com/2.0/folders/0/items/',
        { headers: buildBoxRequestHeaders() }
    )
    .then(response => response.data)
    .catch((error) => handleBoxError(error));

    if (folderInfo !== undefined) {
        let output = [];
        for (let i = 0; i < folderInfo.entries.length; i++) {
            if (folderInfo.entries[i].name.endsWith('.csv')) { output.push(folderInfo.entries[i].id); }
        }
        return output;
    }
    return null;
}

export const getBoxFile = async (fileid) => {
    let file = await axios.get(
        'https://api.box.com/2.0/files/' + fileid + '/content/',
        { headers: buildBoxRequestHeaders() }
    )
    .then(response => response.data)
    .catch((error) => handleBoxError(error));

    if (file !== undefined) { return file; }
    clearAuthToken(); //the problem is probably that the auth token expired
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

//CSV HELPERS
export const parseCSV = (csv) => {
    if (csv === undefined) { return null; }
    let rows = csv.split('\n');
    let hRow = rows[0];
    let headers = hRow.split(',');

    let out = [];

    for (let i = 1; i < rows.length; i++) { //scan all rows
        let rowCells = rows[i].split(',');

        let outRow = {};
        for (let j = 1; j < rowCells.length; j++) {
            outRow[headers[j]] = rowCells[j];
        }
        out.push(outRow);
    }

    return out;
}

const mstToHM = (mst) => {
    let hour = Math.floor(mst / 100);
    let minute = mst % 100;
    return {hour, minute};
}

export const calculateTime = (year, doy, mst) => {
    let time = mstToHM(mst);
    return moment(new Date()).year(year).dayOfYear(doy).hour(time.hour).minute(time.minute);
}