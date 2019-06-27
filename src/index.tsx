import React, { useContext } from 'react';
import * as ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { FONT_FAMILY, COLOR_GRAY } from 'config';
import AppProvider, { AppContext } from 'context';
import { CreateHash } from 'pages/create-hash';
import { TimeReports } from 'pages/time-reports';
import { Authenticate } from 'pages/authenticate';

import togglApi from 'lib/toggl-api';
import googleSheetsApi from 'lib/google-sheets-api';

let vars: any = {};

try {
  vars = require('vars');
} catch (error) {
  console.log('Could not load vars');
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${FONT_FAMILY};
    color: ${COLOR_GRAY};
  }

  *::before,
  *::after,
  * {
    box-sizing: border-box;
  }
`;

togglApi.email = vars.TOGGL_EMAIL;
togglApi.token = vars.TOGGL_TOKEN;
togglApi.workspace = vars.TOGGL_WORKSPACE;
googleSheetsApi.sheetId = vars.GOOGLE_SHEET;

const Routes = () => {
  const { state } = useContext(AppContext);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            state.authenticated ? <Redirect to="/calendar" /> : <CreateHash />
          }
        />
        {state.authenticated ? (
          <Route exact path="/calendar" component={TimeReports} />
        ) : (
          <Route exact path="/calendar/:hash" component={Authenticate} />
        )}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <AppProvider>
    <Normalize />
    <GlobalStyle />
    <Routes />
  </AppProvider>,
  document.getElementById('app-root')
);
