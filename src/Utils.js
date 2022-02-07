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
        makeToast('An unknown error occurred when accessing Box. Your session may have expired.', 'danger');
        clearAuthToken(); //something probably broke with the login
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
            return dateIds[i]['id'];
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

export const getBoxDataFromDate = async(date, queryArray, aggregate) => {

    if (dateIds === null || dateIds.length === 0) {
        loadDateIds();
        if (dateIds === null) { //that load didn't work
            makeToast('Box file metadata cache must be rebuilt. This may take a while, but will speed up future queries.', 'warning');
            sessionRecache = true;
            await recacheDateIds();
        }
    }

    //seach for the date, and try one more time to find it if we didn't just recache
    let foundDate = searchCacheForDate(date);
    if (foundDate === null && sessionRecache) {
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

    //formatted will be used for full data, aggregated will be used for aggregated
    let fullData = [];
    let aggData = [];

    let lastDay = -1;
    for (let j = 0; j < csv.length; j++) {

        let year = parseInt(csv[j]['Year']);
        let doy = parseInt(csv[j]['DOY']);
        let mst = parseInt(csv[j]['MST']);

        if (isNaN(year) || isNaN(doy) || isNaN(mst)) //skip NaN days
            continue;

        let pointTime = calculateTime(year, doy, mst);

        if (!aggregate) {
            let point = {};
            point['date'] = pointTime.format('YYYY-MM-DD');
            point['datetime'] = pointTime.format('hh:mm A');
            queryArray.forEach(q => { point[q] = parseFloat(csv[j][q]); });
            fullData.push(point);
        }
        else {
            //ensure that aggregated data is separated by day
            if (lastDay !== doy) {
                console.log("new day: " + doy);
                let agPoint = {};
                agPoint['date'] = pointTime.format('YYYY-MM-DD');
                agPoint['datetime'] = '12:00 AM';
                queryArray.forEach(q => { //start with blank values
                    agPoint[q] = 0.0;
                })
                aggData.push(agPoint);
                lastDay = doy;
            }

            queryArray.forEach(q => {
                aggData[aggData.length - 1][q] += parseFloat(csv[j][q]);
            });
        }
    }

    if (aggregate) { fullData = aggData; }
    return fullData;

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

    sessionRecache = true;

    //update cache and current
    try {
        localStorage.setItem('cache_dateIds', JSON.stringify(newDateIds));
    }
    catch (e) { //it is best to assume all exceptions are quota exceeded
        makeToast('Couldn\'t cache file information from Box (' + e.name + ')', 'warning');
        return;
    }
    dateIds = newDateIds;
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

    sessionRecache = true;

    try {
        localStorage.setItem('cache_dateIds', JSON.stringify(dateIds));
    }
    catch (e) { //it is best to assume all exceptions are quota exceeded
        makeToast('Failed to cache file information from Box, localStorage is likely full (' + e.name + ')', 'warning');
        sessionRecache = true;
        return;
    }
}

export const getExactData = async (startStr, endStr, queryArray, aggregate, setGraphTitleFunction) => {
    let start = moment(startStr, 'YYYY-MM-DD');
    let end = moment(endStr, 'YYYY-MM-DD');

    console.time('load_files');

    let totalData = [];

    let dataToasts = [];
    let dataToastsCt = 0;

    let current = start.clone();

    let totalDays = end.diff(start, 'days') + 1;

    //interpolate between start and end date
    let i = 0;
    while (current.isSameOrBefore(end)) {
        i++;

        setGraphTitleFunction('Loading data... (day ' + i + '/' + totalDays + ')');
        
        let currentData = await getBoxDataFromDate(current, queryArray, aggregate);
        if (currentData === null) {
            if (dataToasts.length < 5) { //no point in pushing a ton of these
                dataToasts.push('Data for ' + current.format('YYYY-MM-DD') + ' could not be found');
            }
            dataToastsCt++;
        }
        else {
            console.log('pushed for ' + current.format('YYYY-MM-DD'));
            totalData.push(...currentData); //add all to current data
            console.log('total data size: ' + totalData.length);
        }
        current.add(1, 'day');
    }

    //display warnings for missing data (or combine if theres a lot)
    if (dataToasts.length < 4) {
        dataToasts.forEach(e => {
            makeToast(e, 'warning');
        });
    }
    else {
        makeToast('Data for ' + dataToastsCt + ' days could not be found.', 'warning');
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

//TODO: convert back to old time format
export const objectToCSV = (rows) => {
    let out = '';

    //parse headers
    let keys = Object.keys(rows[0]);
    for (let i = 0; i < keys.length; i++) {
        out += keys[i];
        if (i < keys.length - 1)
            out += ',';
    }
    out += '\n';

    //fill in data for each row
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < keys.length; j++) {
            out += rows[i][keys[j]];
            if (j < keys.length - 1)
                out += ',';
        }
        out += '\n';
    }

    return out;

}