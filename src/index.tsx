import React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

import togglApi from 'lib/toggl-api';
import weekendsApi from 'lib/weekends-api';
import googleSheetsApi from 'lib/google-sheets-api';

import { buildUrl } from 'lib/utils';

import AppProvider from 'context';

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

ReactDOM.render(
  <AppProvider>
    <Normalize />
    <GlobalStyle />
    <Calendar />
  </AppProvider>,
  document.getElementById('app-root')
);
