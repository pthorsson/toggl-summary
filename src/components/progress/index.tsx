import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { AppContext } from 'context';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Value: any = styled.div`
  position: relative;
  font-size: 36px;
  padding: 10px 20px 30px 20px;

  ::after {
    opacity: .4;

    ${(props: any) => css`
      content: '${props.suffix}';
    `}
  }

  ::before {
    position: absolute;
    bottom: 12px;
    left: 0;
    width: 100%;
    text-align: center;
    opacity: .25;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;

    ${(props: any) => css`
      content: '${props.label}';
    `}
  }
`;



export const Progress = () => {
  const { state } = useContext(AppContext);
  const { available, billable, past, regular, sick } = state.monthHours;

  if (typeof available !== 'number') {
    return null;
  }

  const balance = (billable + regular) - past;
  const billablePercentage = Math.round((billable / past) * 100) || 0;

  console.log(billablePercentage);

  return (
    <Wrapper>
      <Value label="balance" suffix="h">{(balance > 0 ? '+' : '') + balance}</Value>
      <Value label="billable" suffix="%">{billablePercentage}</Value>
    </Wrapper>
  );
};