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
import { DecryptHash } from 'pages/decrypt-hash';

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

const Routes = () => {
  const { state, actions } = useContext(AppContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/create-calendar" component={CreateHash} />
        <Route
          exact
          path="/authenticate/:hash?"
          render={({ match, history }) => (
            <DecryptHash hash={match.params.hash} history={history} />
          )}
        />
        <Route
          exact
          path="/calendar/:hash"
          render={({ match }) =>
            actions.isAuthenticated(match.params.hash) ? (
              <TimeReports />
            ) : (
              <Redirect to={`/authenticate/${match.params.hash}`} />
            )
          }
        />
        <Route render={() => <Redirect to="/authenticate" />} />
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
