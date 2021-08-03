
import React from "react"


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