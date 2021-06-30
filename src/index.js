import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/App';
import Graph from './routes/Graph';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// now = new Date().toLocaleString('en-US', { timeZone: 'Indian/Christmas' })


ReactDOM.render(
  <Router>

    <Switch>
      <Route path="/graph">
        <Graph />
      </Route>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  </Router>,
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
