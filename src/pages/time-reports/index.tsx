import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavBar } from 'components/nav-bar';

import { Container, Grid, Cell } from 'elements';

import { Controls } from './controls';
import { Progress } from './progress';
import { Calendar } from './calendar';

export const TimeReports = () => (
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
