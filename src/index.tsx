import React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

import togglApi from 'lib/toggl-api';

import AppProvider from 'context';

import { Calendar } from 'components/calendar';

const GlobalStyle = createGlobalStyle`
  *::before,
  *::after,
  * {
    box-sizing: border-box;
  }
`;

// togglApi.setConfig({
//   token: ,

// });

togglApi.getMonth(2019, 5);

ReactDOM.render(
  <AppProvider>
    <Normalize />
    <GlobalStyle />
    <Calendar />
  </AppProvider>,
  document.getElementById('app-root')
);
