import React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

import togglApi from 'lib/toggl-api';
import googleSheetsApi from 'lib/google-sheets-api';

let vars: any = {};

try {
  vars = require('../vars');
} catch (error) {
  console.log('Could not load vars');
}

import AppProvider from 'context';

import { Progress } from 'components/progress';
import { Controls } from 'components/controls';
import { Calendar } from 'components/calendar';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: system, -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif;
  }

  *::before,
  *::after,
  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  min-width: 800px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 10px;
`;

const Grid = styled.div`
  display: flex;
`;

const Cell = styled.div`
  flex: 1;
`;

togglApi.email = vars.TOGGL_EMAIL;
togglApi.token = vars.TOGGL_TOKEN;
togglApi.workspace = vars.TOGGL_WORKSPACE;
googleSheetsApi.sheetId = vars.GOOGLE_SHEET;

ReactDOM.render(
  <AppProvider>
    <Normalize />
    <GlobalStyle />
    <Container>
      <Grid>
        <Cell>
          <Controls />
        </Cell>
        <Cell>
          <Progress />
        </Cell>
      </Grid>
      <Calendar />
    </Container>
  </AppProvider>,
  document.getElementById('app-root')
);
