import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { AppContext } from 'context';

export const Controls = () => {
  const { state, actions } = useContext(AppContext);
  const date = new Date();

  return (
    <div style={{maxWidth: '1200px', margin: '30px auto'}}>
      <button disabled={state.isLoading} onClick={() => actions.previousMonth()}>prev</button>
      <button disabled={state.isLoading} onClick={() => actions.nextMonth()}>next</button>
      <button disabled={state.isLoading} onClick={() => actions.setMonth(date.getFullYear(), date.getMonth() + 1)}>today</button>
      <span>{state.year} {state.month} ({state.monthName})</span>
    </div>
  );
};