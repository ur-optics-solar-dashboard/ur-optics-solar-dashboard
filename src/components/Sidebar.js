import React from 'react'
import PropTypes from 'prop-types'

import './Sidebar.css'
import SidebarLink from './SidebarLink';
import solarIcon from '../images/solar-icon.svg';

/**
 * Component for the sidebar
 *
 * @component
 * @example
 * const width = 290
 * return (
 *   <Sidebar width={width}/>
 * )
 */
const Sidebar = props => {
    return (
        <div className="sidebar" style={{width: props.width}}>
            <header>
                <img src={solarIcon} alt="icon" />
                <h2>ur solar dashboard</h2>
            </header>
            <div>
                <SidebarLink href="/main" selected={true}>Data</SidebarLink>
                <SidebarLink href="/main" selected={false}>Main</SidebarLink>
                <SidebarLink href="/main" selected={false}>About</SidebarLink>
            </div>
            <footer>
                <p>Created with love with <br /> Roclab</p>
            </footer>
        </div>
    )
}

Sidebar.propTypes = {
    width: PropTypes.number,
}

export default Sidebar
