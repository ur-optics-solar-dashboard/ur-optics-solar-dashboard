import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar'

import './SidebarLayout.css'
import { NavLink } from 'react-router-dom'

/**
 * Component for the layout with the sidebar
 *
 * @component
 * @example
 * const width = 290
 * return (
 *   <SidebarLayout width={width}>
 *      {content}
 *   </SidebarLayout>
 * )
 */
const SidebarLayout = props => {
    return (
        <>
            <Sidebar width={props.width}>
                <NavLink exact to="/dashboard" activeStyle={{backgroundColor:"#EDEDED"}}>Data</NavLink>
                <NavLink exact to="/dashboard/graph" activeStyle={{backgroundColor:"#EDEDED"}}>Graph</NavLink>
                <NavLink exact to="/app" activeStyle={{backgroundColor:"#EDEDED"}}>About</NavLink>
            </Sidebar>
            <main className="content" style={{ marginLeft: props.width }}>
                {props.children}
            </main>
        </>
    )
}

SidebarLayout.propTypes = {
    width: PropTypes.number,
}

export default SidebarLayout
