import PropTypes from 'prop-types'

const ExportButton = props => {
    // todo: change the exportbutton component name?
    const MouseOver = (event) => {
        if(props.selected){
            event.target.style.background = props.backgroundColor
        }else{
            event.target.style.background = props.hoverColor
        }
    }

    const MouseOut = (event) => {
        if(props.selected){
            event.target.style.background = props.hoverColor
        }else{
            event.target.style.background = props.backgroundColor
        }
    }

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
                paddingTop: props.paddingTop,
                paddingBottom: props.paddingBottom,
                height: "auto",
                width: props.width,
                
            }}
            onClick={props.onClick}
            onMouseEnter={MouseOver}
            onMouseLeave={MouseOut}>
            {props.children}
        </button>
    )
}

ExportButton.defaultProps = {
    selected: false,
    borderRadius: 5,
    marginTop: 5,
    fontWeight: 500,
    paddingTop: 10,
    paddingBottom: 10,
    height: 42,
    width: "100%",
}

ExportButton.propTypes = {
    selected: PropTypes.bool,

    backgroundColor: PropTypes.string,
    hoverColor: PropTypes.string,

    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    textColor: PropTypes.string,

    paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    onClick: PropTypes.func

}


export default ExportButton
