import { Nav } from "react-bootstrap";

/**
 * Header functional component
 * @param  {} props
 */
const Header = (props) => {
  return (
    <header className={props.className}>
      <Nav
        activeKey="/"
        id="header-nav">

        <Nav.Item>
          <Nav.Link style={{color:"white", fontSize:32, paddingLeft:0, fontWeight:"bold"}} href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{color:"white", fontSize:32, fontWeight:"bold"}} href="/graph">Graph</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{color:"white", fontSize:32, fontWeight:"bold"}} href="/live">Live</Nav.Link>
        </Nav.Item>
      </Nav>
    </header>
  )
}

export default Header