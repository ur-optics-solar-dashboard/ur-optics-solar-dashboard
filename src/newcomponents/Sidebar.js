import React from 'react'
import PropTypes from 'prop-types'

import './Sidebar.css'
import SidebarLink from './SidebarLink';
import solarIcon from '../images/solar-icon.svg';
import { NavLink } from 'react-bootstrap';
import SidebarUsername from './SidebarUsername';

/**
 * Component for the sidebar
 *
 * @component
 * @example
 * const width = 290
 * return (
 *   <Sidebar width={width}>
 *      {sidebar links}
 *   <Sidebar>
 * )
 */
const Sidebar = props => {
    return (
        <div className="sidebar" style={{width: props.width}}>
            <NavLink to="/dashboard" style={{padding: "0"}}>
            <header>
                <img src={solarIcon} alt="icon" />
                <h2>UR Solar Dashboard</h2>
            </header>
            </NavLink>
            <div>
                {props.children}
            </div>
            <footer>
                <SidebarUsername />
                <p>Created with ❤️ by Roclab</p>
            </footer>
        </div>
    )
}

Sidebar.propTypes = {
    width: PropTypes.number,
}

export default Sidebar
