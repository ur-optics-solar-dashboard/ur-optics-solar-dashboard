
import React from "react"

// todo: if I need multiple contexts https://stackoverflow.com/questions/53346462/react-multiple-contexts
export const GlobalContext = React.createContext()
/**
 * Provides Global Context for values that need to be passed globally
 * @param  {object} {children}
 */
export const GlobalProvider = ({ children }) => {

    return (
        <GlobalContext.Provider value={[]}>
            {children}
        </GlobalContext.Provider>
    )
}