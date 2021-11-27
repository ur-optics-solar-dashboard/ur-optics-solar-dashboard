import arrowright from '../images/keyboard-right-arrow-button.svg';
import useDateShift from '../hooks/useDateShift';
import "./DateSelection.css";

const DateShifter = props => {
    const [previousDay, nextDay, previousMonth, nextMonth, previousYear, nextYear] = useDateShift();
    return (
        <div className="date-shift-wrapper">
              <div className="date-shift-left">
                <img src={arrowright} style={{ transform: "rotate(180deg)", marginBottom:2}} alt={"arrow left"} width={10} height={10} />
                <button className="date-shift-button" style={{marginLeft: 2, paddingLeft:10, "borderRadius": "5px 0px 0px 5px"}} onClick={previousYear}>Year</button>
                <button className="date-shift-button" onClick={previousMonth}>Month</button>
                <button className="date-shift-button" style={{paddingRight:10, "borderRadius": "0px 0px 0px 0px"}} onClick={previousDay}>Day</button>
              </div>
              <div className="date-shift-right">
                <button className="date-shift-button" style={{paddingLeft:10, "borderRadius": "0px 0px 0px 0px"}} onClick={nextDay}>Day</button>
                <button className="date-shift-button" onClick={nextMonth}>Month</button>
                <button className="date-shift-button" style={{marginRight: 2, paddingRight:10, "borderRadius": "0px 5px 5px 0px"}} onClick={nextYear}>Year</button>
                <img src={arrowright} style={{ marginBottom:2}} alt={"arrow left"} width={10} height={10} />
              </div>
          </div>
    )
}

DateShifter.propTypes = {

}

export default DateShifter
