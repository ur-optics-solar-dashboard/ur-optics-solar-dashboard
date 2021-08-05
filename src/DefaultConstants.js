import moment from "moment"

export const defaultDataForm = {
    "irradiance-global-horizontal": false,
    "irradiance-direct-normal": false,
    "irradiance-diffuse-horizontal": false,
    "meteorological-pr1-temperature": false,
    "meteorological-ph1-temperature": false,
    "meteorological-pressure": false,
    "meteorological-zenith-angle": false,
    "meteorological-azimuth-angle": false,
    "meteorological-razon-status": false,
    "meteorological-razon-time": false,
    "meteorological-logger-battery": false,
    "meteorological-logger-temp": false,
    "interval-group": "1",
    "output-group": "1",
    "output-raw": false,
    "options-black-white": false,
    "options-english-conversion": false,
}

export const initialShowSelectionTrue = { showDataSelection: true, showIrradiance: true, showMeteorological: true, showInterval: true, showOutputType: true }

export const initialShowSelectionFalse = { showDataSelection: false, showIrradiance: false, showMeteorological: false, showInterval: false, showOutputType: false }

export const defaultGraphOptions = {
    "show-graph-options": false,
    "line-thickness": 1,
    "font-size": 16,
    "legend": true,
    "dot": false,
}

export const graphColors = ["#003B71", "red", "green", "purple", "orange", "pink", "black", "brown", "gray", "blue", "lightgreen", "lightorange"];

export const ranges = {
    Today: [moment().toDate(), moment().toDate()],
    'Past 7 Days': [
        moment().subtract(6, 'days').toDate(),
        moment().toDate(),
    ],
    'Past 30 Days': [
        moment().subtract(29, 'days').toDate(),
        moment().toDate(),
    ],
    'Past Month': [
        moment().subtract(1, 'month').toDate(),
        moment().toDate(),
    ],
    'Past Year': [
        moment().subtract(1, 'year').toDate(),
        moment().toDate(),
    ],
    'Past 5 Years': [
        moment().subtract(5, 'year').toDate(),
        moment().toDate(),
    ],
    'This Week': [
        moment().startOf('week').toDate(),
        moment().endOf('week').toDate(),
    ],
    'This Month': [
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate(),
    ],
    'All 5 Years': [
        moment().subtract(5, 'year').startOf('year').toDate(),
        moment().toDate(),
    ],
}