import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { AppContext } from 'context';

const Header = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #454545;
`;

const Nav = styled.nav`
  display: flex;
  margin: 15px 0;
`;

const Button = styled.button`
  color: white;
  background-color: #454545;
  border: 0;
  text-transform: uppercase;
  padding: 6px 15px;
  margin-right: 2px;

  :hover {
    background-color: #656565;
    cursor: pointer;
  }

  :disabled {
    background-color: #656565;
    color: #e5e5e5;
    opacity: .5;
    cursor: default;
  }

  :focus {
    outline: 0;
  }
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