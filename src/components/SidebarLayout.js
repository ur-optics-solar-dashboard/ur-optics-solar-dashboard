import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar'

import './SidebarLayout.js'

/**
 * Component for the layout with the sidebar
 *
 * @component
 * @example
 * const width = 290
 * return (
 *   <SidebarLayout width={width}>
 *      {children}
 *   </SidebarLayout>
 * )
 */
const SidebarLayout = props => {
    return (
        <>
            <Sidebar width={props.width} />
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
