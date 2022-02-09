import './ExportGridText.css'

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ExportGridText = props => {
    const [text, setText] = useState('');

    useEffect(() => {
        setText(props.text);
    }, [props, setText]);

    return (
        <p
            className='export-grid-text'
        >
            {props.text}
        </p>
    );
}

ExportGridText.propTypes = {
    text: PropTypes.string,
}

export default ExportGridText