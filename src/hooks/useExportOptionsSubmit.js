import { objectToCSV } from '../Utils';
import FileSaver, { saveAs } from 'file-saver';
import JSZip from 'jszip';

export const useExportOptionsSubmit = ({exportOptions, data}) => {

    const downloadCSV = (data) => {
        let blob = new Blob([objectToCSV(data)], { type: 'text/csv;charset=utf-8'});
        FileSaver.saveAs(blob, 'data.csv');
    }

    const downloadASCII = (data) => {
        //todo
    }

    const downloadJSON = (data) => {
        let blob = new Blob([JSON.stringify(data)], { type: "application/json;charset=utf-8"});
        FileSaver.saveAs(blob, 'data.json');
    }

    const downloadZip = (data) => {
        let blob = new Blob([objectToCSV(data)], { type: 'text/csv;charset=utf-8'});
        let zip = new JSZip();

        let csvFolder = zip.folder('data');
        csvFolder.file('data.csv', blob);

        zip.generateAsync({type: 'blob'}).then(function(content) {
            saveAs(content, 'data.zip');
        });
    }

    const handleChartSubmit = (event) => {
        switch (exportOptions) {
            case 1: //csv
                downloadCSV(data);
                break;
            case 2: //ascii
                downloadASCII(data);
                break;
            case 3: //json
                downloadJSON(data);
                break;
            case 4: //zip
                downloadZip(data);
                break;
            default:
                break;
        }
    }

    return [handleChartSubmit]

}