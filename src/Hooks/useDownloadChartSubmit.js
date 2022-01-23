import domtoimage from 'dom-to-image';
import { objectToCSV } from '../Utils';
import FileSaver from 'file-saver';

/**
 * @param  {{downloadSelection: number, graphData: string}} props
 * @returns {[handleChartSubmit: function]} array
 */
export const useDownloadChartSubmit = ({downloadSelection, graphData}) => {

    const downloadGraphCSV = (graphData) => {
        let blob = new Blob([objectToCSV(graphData)], { type: 'text/csv;charset=utf-8'});
        FileSaver.saveAs(blob, 'graph_data.csv');
    }

    /**
     * downloads a document element as a png to file `chart.png`
     * @param  {string} elementId element id from document
     * @param  {string} bgcolor background color
     */
     const downloadLineChartPNG = (elementId, bgcolor) => {
        domtoimage.toBlob(document.getElementById(elementId),  { bgcolor: bgcolor })
            .then(function (blob) {
                FileSaver.saveAs(blob, 'chart.png');
            });
    }
    
    /**
     * downloads a document element as a jpeg to file `chart.jpeg`
     * @param  {string} elementId element id from document
     * @param  {number} quality quality of jpeg
     * @param  {string} bgcolor background color
     */
    const downloadLineChartJPEG = (elementId, quality, bgcolor) => {
        domtoimage.toJpeg(document.getElementById(elementId), { quality: quality, bgcolor: bgcolor })
            .then(function (dataUrl) {
                FileSaver.saveAs(dataUrl, 'chart.jpeg');
            });
    }
    
    /**
     * downloads graph data from recharts as a json to file `graph_data.json`
     * @param  {object} graphData graph object
     */
    const downloadGraphJson = (graphData) => {
        var blob = new Blob([JSON.stringify(graphData)], { type: "application/json;charset=utf-8" });
        FileSaver.saveAs(blob, "graph_data.json")
    }

    /**
     * downloads a document element as an svg to file `chart.svg`
     * @param  {string} elementId element id from document
     */
    const downloadLineChartSVG = (elementId) => {
        domtoimage.toSvg(document.getElementById(elementId),)
            .then(function (dataUrl) {
                FileSaver.saveAs(dataUrl, 'chart.svg');
            });
    }

    /**
     * handler to submit optional chart options
     * @param {*} event
     */
    const handleChartSubmit = (event) => {
        switch (downloadSelection) {
            case 0:
                downloadGraphCSV(graphData);
                break;
            case 1:
                //todo
                alert('TODO');
                break;
            case 2: // png
                downloadLineChartPNG('lineChart', "white");
                break;
            case 3: //jpeg
                downloadLineChartJPEG('lineChart', 0.75, "white");
                break;
            case 4: //svg
                downloadLineChartSVG('lineChart');
                break;
            case 5: //json
                downloadGraphJson(graphData);
                break;
            default: break;
        }
    }

    return [handleChartSubmit]
}
