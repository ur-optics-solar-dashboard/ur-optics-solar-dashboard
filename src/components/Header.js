import { useHistory, useLocation } from "react-router-dom";

const Header = (props) => {
  let history = useHistory()
  let location = useLocation()
  return (
    <header className={props.className}>
      <h1 
      id="header-text"
      style={{cursor: "pointer"}}
      onClick={() => {
        console.log(location.pathname)
        if(location.pathname !=="/"){
          history.push('/')
        }
      }}>
        Dashboard
      </h1>
    </header>
  )
}

export default Header
