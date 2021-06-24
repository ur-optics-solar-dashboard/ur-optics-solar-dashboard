import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import LiveIrradianceLogic from './LiveIrradianceLogic'
import LiveIrradianceCard from './LiveIrradiance'

/**
 * import individual components
 */

//  import { Link } from “react-router-dom”;

//todo change to only import individual components
import {Button, Alert, Breadcrumb, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Alert from 'react-bootstrap/Alert';

// class App extends React.Component{

//   state={
//     curTime : new Date().toLocaleString(),
//   }

//   render()  {
//     return (
//       <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" style={{width:"50px",height:"50px"}}/> */}
//         <h1 id="header-text">Dashboard</h1>
//       </header>

//       <main className="App-main">

//         <section className="App-main-header">
//           <h1>UR Optics Solar Radiation Research Laboratory (RaZON+)</h1>
//           <h1>Current Irradiance and Meteorological Conditions</h1>
//           <hr/>
//         </section>

//         <section className="App-main-live" style={{marginTop:"24px"}}>
//           <h2>Live Measurements</h2>
//           <p>The current time is {this.state.curTime}.</p>
 
//           <Alert variant="success">Test Button</Alert>
//           <Button>Test Button</Button>
//           {/* <p>The current time is {currentTime}.</p> */}
//         </section>

//       </main>


//     </div>
//     );
//   }

// }

// export default App;

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  const list = LiveIrradianceLogic();

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" style={{width:"50px",height:"50px"}}/> */}
        <h1 id="header-text">Dashboard</h1>
      </header>

      <main className="App-main">
        <section className="App-main-header">
          <h1>UR Optics Solar Radiation Research Laboratory (RaZON+)</h1>
          <h1>Current Irradiance and Meteorological Conditions</h1>
          <hr/>
        </section>

        <section className="App-main-live" style={{marginTop:"24px"}}>
          <h2>Live Measurements</h2>
          <p>The current time is {currentTime}.</p>

          <div className="App-main-live-cards" style={{flexDirection:"row"}}>
            <LiveIrradianceCard/>

            <Card style={{ width: '18rem' , margin: '16px'}}>
              <Card.Body>
                <Card.Title>Irradiance</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem><a target="_blank" href="https://google.com">
                  Cras justo odio</a>
                </ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                {list.map(function(item) {
                  return <ListGroupItem key={item}>{item}</ListGroupItem>;
                })}
              </ListGroup>
              <Card.Body>
                {/* empty card body */}
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>

            <Card style={{ width: '18rem', margin: '16px' }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
              </ListGroup>
              <Card.Body>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </div>
 
          <Alert variant="success">Test Button</Alert>
          <Button>Test Button</Button>
          {/* <p>The current time is {currentTime}.</p> */}
        </section>
      </main>


    </div>
  );
}

export default App;

