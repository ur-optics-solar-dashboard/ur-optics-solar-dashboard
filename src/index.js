import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/App';
import Graph from './routes/Graph';
import Live from './routes/Live';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { DataFormProvider } from './contexts/DataFormContext';

// now = new Date().toLocaleString('en-US', { timeZone: 'Indian/Christmas' })
import moment from 'moment';
import 'moment-timezone';
import Main from './routes/Main';
import { GlobalContextProvider } from './contexts/GlobalContext';
import MainGraph from './routes/MainGraph';
import AuthRedirectHandler from './routes/AuthRedirectHandler';

moment.tz.setDefault("America/New_York");

const loggedIn = true // todo handle login with box

ReactDOM.render(
  <GlobalContextProvider>
    <DataFormProvider>
      <Router>
        <Switch>
          <Route path="/graph">
            <Graph />
          </Route>
          <Route path="/live">
            <Live />
          </Route>
          <Route path="/app">
            <App />
          </Route>
          <Route path="/dashboard/graph">
            <MainGraph />
          </Route>
          <Route path="/dashboard">
            <Main />
          </Route>
          <Route path="/auth_redirect">
            <AuthRedirectHandler />
          </Route>
          <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <App />}
          </Route>
        </Switch>
      </Router>
    </DataFormProvider>
  </GlobalContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
