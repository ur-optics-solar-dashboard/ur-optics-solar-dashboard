import { useContext } from 'react';
import { DataFormContext } from '../contexts/DataFormContext';

/**
 * Custom hook that provides handlers for data form normal checkbox, radio, and raw data checkbox change
 * @returns {[handleCheckFormChange: function, handleRadioFormChange: function, handleRawDataCheckChange: function]}
 */
const useHandleDataSelectionForm = () => {

    const {dataForm, setDataFormState} = useContext(DataFormContext);

    /**
     * handle when the checkboxes changes in the form
     * @param  {} event
     */
     const handleCheckFormChange = (event) => { setDataFormState({ ...dataForm, [event.target.name]: event.target.checked }); }

     /**
      * handle when the radio button changes in the form
      * @param  {} event
      */
     const handleRadioFormChange = (event) => { setDataFormState({ ...dataForm, [event.target.name]: event.target.value }); }
 
     /**
      * handle when the raw checkbox changes in the form
      * @param  {} event
      */
     const handleRawDataCheckChange = (event) => {
         if (dataForm["output-group"] === "1") {
             //todo strange bug, for some reason, this line of code does not work if I have the regular setdataformstate. 
             // Workaround: detect if raw data === true and outputgroup === 1, then we assume outputgroup = 2
             setDataFormState({ ...dataForm, "output-group": "2" });
         }
         setDataFormState({ ...dataForm, [event.target.name]: event.target.checked });
     }

    return [handleCheckFormChange, handleRadioFormChange, handleRawDataCheckChange]
}

export default useHandleDataSelectionForm
