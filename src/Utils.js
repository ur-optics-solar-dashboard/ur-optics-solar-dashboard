import axios from 'axios';
import moment from 'moment';

//VARS
let dateIds = [];
let sessionRecache = false;

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

const searchCacheForDate = (date) => {
    let datestr = date.format('YYYY-MM-DD');
    for (let i = 0; i < dateIds.length; i++) {
        if (dateIds[i]['date'] === datestr) {
            console.log(dateIds[i]['date'] + ' is ' + datestr + ' (' + dateIds[i]['id'] + ')');
            return dateIds[i]['id'];
        }
        else {
            console.log(dateIds[i]['date'] + ' is not ' + datestr);
        }
    }
    return null;
}

const searchCacheForId = (id) => {
    for (let i = 0; i < dateIds.length; i++) {
        if (dateIds[i]['id'] === id) {
            return dateIds[i]['id'];
        }
    }
    return null;
}

export const getBoxDataFromDate = async(date, queryArray) => {
    if (dateIds === null || dateIds.length === 0) {
        loadDateIds();
        if (dateIds === null) { //that load didn't work
            makeToast('Box file metadata cache must be rebuilt. This may take a while, but will speed up future queries.', 'warning');
            sessionRecache = true;
            await recacheDateIds();
        }
    }
    console.log(dateIds);

    //seach for the date, and try one more time to find it if we didn't just recache
    let foundDate = searchCacheForDate(date);
    if (foundDate === null && sessionRecache) {
        console.log('couldn\'t find date');
        return null;
    }
    else {
        console.log('recent recache performed: ' + sessionRecache);
        await cacheMissingDateIds();
        foundDate = searchCacheForDate(date);
        console.log('found date: ');
        console.log(foundDate);
        if (foundDate === null) { console.log('still not found'); return null; }
    }

    console.log('getting file ' + foundDate)
    let file = await getBoxFile(foundDate);
    if (file === undefined || file === null) { return null; }

    let csv = parseCSV(file);

    //safe to assume the date is correct
    let formatted = [];
    for (let j = 0; j < csv.length; j++) {
        let pointTime = calculateTime(
            parseInt(csv[j]['Year']), parseInt(csv[j]['DOY']),
            parseInt(csv[j]['MST']));
        
        let point = {};
        point['date'] = pointTime.format('YYYY-MM-DD');
        point['datetime'] = pointTime.format('hh:mm A');

        queryArray.forEach(q => {
            point[q] = parseFloat(csv[j][q]);
        });
        formatted.push(point);
    }
    console.log('formatted: ');
    console.log(formatted);
    return formatted;

}

const loadDateIds = () => {
    console.log('loading date ids');
    if (localStorage.getItem('cache_dateIds') !== undefined) { //it exists
        dateIds = JSON.parse(localStorage.getItem('cache_dateIds'));
    }
}

const recacheDateIds = async () => {
    let newDateIds = [];

    let csvIds = await getBoxAllCSVs();
    if (csvIds === null) { return; }

    for (let i = 0; i < csvIds.length; i++) {
        let file = await getBoxFile(csvIds[i]);
        let csv = parseCSV(file);
        
        //build moment date
        let fileDate = moment()
            .year(parseInt(csv[0]['Year']))
            .dayOfYear(parseInt(csv[0]['DOY']));
        //add to list
        newDateIds.push({
            'date': fileDate.format('YYYY-MM-DD'),
            'id': csvIds[i]
        });
    }
    
    //update cache and current
    localStorage.setItem('cache_dateIds', JSON.stringify(newDateIds));
    dateIds = newDateIds;
    sessionRecache = true;
}

//note: try not to use this for batches of IDs since it requires so much parsing and stringifying
const cacheMissingDateIds = async () => {

    if (dateIds === null || dateIds.length === 0) {
        await recacheDateIds();
        return;
    }

    let csvIds = await getBoxAllCSVs();
    if (csvIds === null) { return; }

    for (let i = 0; i < csvIds.length; i++) { //foreach was being weird with the async
        let id = csvIds[i];
        if (searchCacheForId(id) === null) {
            console.log('New ID: ' + id);
            let file = await getBoxFile(id);
            if (file === null) { continue; }
            let csv = parseCSV(file);

            //build moment date
            let fileDate = moment()
                .year(parseInt(csv[0]['Year']))
                .dayOfYear(parseInt(csv[0]['DOY']));
            //add to list
            dateIds.push({
                'date': fileDate.format('YYYY-MM-DD'),
                'id': id
            });
        }
    }

    localStorage.setItem('cache_dateIds', JSON.stringify(dateIds));
    sessionRecache = true;
}

export const getExactData = async (startStr, endStr, queryArray) => {
    let start = moment(startStr, 'YYYY-MM-DD');
    let end = moment(endStr, 'YYYY-MM-DD');

    console.time('load_files');
    //interpolate between start and end date

    let totalData = [];

    let current = start.clone();
    while (current.isSameOrBefore(end)) {
        console.log('loading ' + current.format('YYYY-MM-DD'));
        let currentData = await getBoxDataFromDate(current, queryArray);
        if (currentData === null) {
            makeToast('Data for ' + current.format('YYYY-MM-DD') + ' could not be found', 'info');
        }
        else {
            totalData.push(...currentData); //add all to current data
        }
        current.add(1, 'day');
    }
    console.timeEnd('load_files');
    return totalData;
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