import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';

//todo change to only import individual components
import {Button, Alert, Breadcrumb, Card, ListGroup, ListGroupItem} from 'react-bootstrap';

function arrAdd(list, add) {
    return list.map(function(element) {
        return element+add;
    });
    // return p1 * p2;   // The function returns the product of p1 and p2
  }

//todo have this autorefresh every 60 seconds
class LiveIrradianceCard extends React.Component {
    intervalID;

    state = {
        counter: 1,
        data: [1,2,3],
    }

    constructor (props) {
        super(props);
    }

    componentDidMount() {
        this.getData();
        this.intervalID = setInterval(this.getData.bind(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    getData = () => {
        fetch('/time')
          .then(response => response.json())
          .then(time => {
            this.setState({data:arrAdd(this.state.data, this.state.counter)});
            this.setState({counter:this.state.counter+1});
            // call getData() again in 5 seconds
            console.log("time: " + time+" counter: "+this.state.counter + " | Data: "+this.state.data);
            this.intervalID = setTimeout(this.getData.bind(this), 5000);
          });
    }

    render(){
        return(
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
                {this.state.data.map(function(item) {
                  return <ListGroupItem key={item}>{item}</ListGroupItem>;
                })}
              </ListGroup>
              <Card.Body>
                {/* empty card body */}
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
        );
    }
}

export default LiveIrradianceCard;