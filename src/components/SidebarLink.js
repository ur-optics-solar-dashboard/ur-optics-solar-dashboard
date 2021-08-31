import React from 'react'
import PropTypes from 'prop-types'

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
            <a href={props.href} style={props.selected ? {backgroundColor:"#EDEDED"}: null}>{props.children}</a>
        </div>
    )
}
SidebarLink.defaultProps = {
    selected: false
}

SidebarLink.propTypes = {
    href: PropTypes.string,
    selected: PropTypes.bool,
}

export default SidebarLink