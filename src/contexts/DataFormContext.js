
import React from "react"
import { defaultDataForm } from "../DefaultValues";

// todo: if I need multiple contexts https://stackoverflow.com/questions/53346462/react-multiple-contexts
export const DataFormContext = React.createContext()
/**
 * Provides Global Context for values that need to be passed globally
 * @param  {object} {children}
 */
export const DataFormProvider = ({ children }) => {

    // start=${start}&end=${end}&${query_fetch_array.join("&")}`

    const [dataForm, setDataFormState] = React.useState(JSON.parse(localStorage.getItem("dataForm")) || defaultDataForm);

    React.useEffect(() => {
        localStorage.setItem('dataForm', JSON.stringify(dataForm)); //set in Storage each update
        // console.log("dataForm: ", dataForm);
    }, [dataForm]);

    return (
        <DataFormContext.Provider value={[dataForm, setDataFormState, ]}>
            {children}
        </DataFormContext.Provider>
    )
}