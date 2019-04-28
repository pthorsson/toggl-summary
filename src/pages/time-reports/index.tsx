import React, { useContext } from 'react';
import styled from 'styled-components';

import { Container, Grid, Cell } from 'elements';

import { Controls } from './controls';
import { Progress } from './progress';
import { Calendar } from './calendar';

export const TimeReports = () => (
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
);
