import React, { useContext } from 'react';
import { NavBar } from 'components/nav-bar';
import { parseSettings } from 'lib/settings-parser';
import toggleApi from 'lib/toggl-api';
import googleSheetsApi from 'lib/google-sheets-api';

import { Container, Grid, Cell } from 'elements';

import { Controls } from './controls';
import { Progress } from './progress';
import { Calendar } from './calendar';

export const TimeReports = () => {
  const settings = parseSettings(sessionStorage.config);

  toggleApi.email = sessionStorage.email;
  toggleApi.token = settings.togglToken;
  toggleApi.workspace = settings.togglWorkspace;
  googleSheetsApi.sheetId = settings.googleSpreatsheet;

  return (
    <>
      <NavBar />
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
    </>
  );
};
