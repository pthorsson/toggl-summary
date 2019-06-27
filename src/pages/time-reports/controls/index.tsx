import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button } from 'elements';

import {
  COLOR_GRAY,
} from 'config';

import { AppContext } from 'context';

const Header = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: ${COLOR_GRAY};
  padding-left: 2px;
`;

const Nav = styled.nav`
  display: flex;
  margin: 15px 0;
  padding-left: 2px;
`;

export const Controls = () => {
  const { state, actions } = useContext(AppContext);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return (
    <>
      <Header>{state.monthName} {state.year}</Header>
      <Nav>
        <Button
          disabled={state.isLoading}
          onClick={() => actions.previousMonth()}
        >
          prev
        </Button>
        <Button
          disabled={state.isLoading}
          onClick={() => actions.nextMonth()}
        >
          next
        </Button>
        <Button
          disabled={state.isLoading || state.year === year && state.month === month}
          onClick={() => actions.setMonth(year, month)}
        >
          today
        </Button>
      </Nav>
    </>
  );
};