import './ExportButton.css';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ExportButton = props => {

    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(props.selected);
    }, [props, setSelected])

    return (
        <button
            className={
                `export-button
                ${(selected) ? 'export-button-selected' : ''}
                ${props.variant}
                `}
            onClick={ () => {
                    props.onClick();
                }}
            >
            {props.children}
        </button>
    )
}

ExportButton.propTypes = {
    variant: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
}


export default ExportButton
