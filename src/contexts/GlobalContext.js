
import React from "react"
import { useState } from "react";
import { defaultDataForm, ranges } from "../DefaultConstants";

export const GlobalContext = React.createContext();

/**
 * Provides Global Context for values that need to be passed globally
 * @param  {object} {children}
 */
export const GlobalContextProvider = ({ children }) => {

    /** show the graph for the dashboard */
    const [showGraph, setShowGraph] = useState(false);
    return (
        <GlobalContext.Provider value={{ 
            showGraph:showGraph, setShowGraph:setShowGraph,
            }}>
            {children}
        </GlobalContext.Provider>
    )
}