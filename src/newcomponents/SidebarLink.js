import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

/**
 * Component for showing links of the sidebar
 *
 * @component
 * @example
 * const href = "/"
 * const selected = true
 * return (
 *   <SidebarLink href={href} selected={selected}>{children}</SidebarLink>
 * )
 */
const SidebarLink = props => {
    return (
        <div>
            <Link to={props.to} style={(props.selected) ? {backgroundColor:"#EDEDED"}: null}>{props.children}</Link>
        </div>
    )
}
SidebarLink.defaultProps = {
    selected: false
}

SidebarLink.propTypes = {
    // href: PropTypes.string,
    selected: PropTypes.bool,
}

export default SidebarLink