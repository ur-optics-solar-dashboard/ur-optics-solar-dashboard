import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar'

import './SidebarLayout.css'
import SidebarLink from './SidebarLink'
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
                <NavLink to="/dashboard" activeStyle={{backgroundColor:"#EDEDED"}}>Data</NavLink>
                <NavLink to="/dashboard/graph" activeStyle={{backgroundColor:"#EDEDED"}}>Graph</NavLink>
                <NavLink to="/app" activeStyle={{backgroundColor:"#EDEDED"}}>About</NavLink>
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