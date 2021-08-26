import PropTypes from 'prop-types'
// import './ExportButton.css'

const ExportButton = props => {
    return (
        <button
        className="export-button"
            style={{
                backgroundColor: props.selected ? props.hoverColor : props.backgroundColor,
                border: props.selected ? props.hoverColor : props.backgroundColor,
                borderRadius: props.borderRadius,
                marginTop: props.marginTop,
                color: props.textColor,
                fontWeight: props.fontWeight,
                height: props.height,
                width: props.width,
            }}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

ExportButton.defaultProps = {
    selected: false,
    borderRadius: 5,
    marginTop: 5,
    fontWeight: 500,
    height: 42,
    width: "100%",
}

ExportButton.propTypes = {
    selected: PropTypes.bool,

    backgroundColor: PropTypes.string,
    hoverColor: PropTypes.string,

    borderRadius: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    marginTop: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),

    fontWeight: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    textColor: PropTypes.string,

    width: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),

    onClick: PropTypes.func

}


export default ExportButton
