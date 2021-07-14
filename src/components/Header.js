import { useHistory, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Header = (props) => {
  let history = useHistory()
  let location = useLocation()
  return (
    <header className={props.className}>
      {/* <h1
        id="header-dashboard"
        style={{ cursor: "pointer" }}
        onClick={() => {
          console.log(location.pathname)
          if (location.pathname !== "/") {
            history.push('/')
          }
        }}>
        Dashboard
      </h1> */}
      <Nav
        activeKey="/"
        id="header-nav">

        <Nav.Item>
          <Nav.Link style={{color:"white", fontSize:32, paddingLeft:0, fontWeight:"bold"}} href="/">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{color:"white", fontSize:32, fontWeight:"normal"}} href="/graph">Graph</Nav.Link>
        </Nav.Item>
      </Nav>
    </header>
  )
}

export default Header