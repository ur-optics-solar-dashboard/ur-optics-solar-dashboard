import React from 'react'
import PropTypes from 'prop-types'

import './Sidebar.css'
import solarIcon from '../images/solar-icon.svg';
import roclabIcon from '../images/roclab.png';
import SidebarUsername from './SidebarUsername';
import { Link } from 'react-router-dom';

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
            {/* <NavLink to="/dashboard" style={{padding: "0"}}> */}
            <Link to="/" id="header-link">
            <header>
                <img src={solarIcon} alt="icon" />
                <h2>Flux</h2>
            </header>
            </Link>
            {/* </NavLink> */}
            <div>
                {props.children}
            </div>
            <footer>
                <SidebarUsername />
                <p>Created with ❤️ by <img className="roclab-logo" src={roclabIcon} alt="Logo" /> RocLab</p>
            </footer>
        </div>
    )
}

Sidebar.propTypes = {
    width: PropTypes.number,
}

export default Sidebar
