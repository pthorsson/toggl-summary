import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper: any = styled.div`
  display: flex;
`;

const DayNumber: any = styled.div`
  font-size: 22px;
  line-height: 18px;
`;

const Occasion: any = styled.div`
  font-size: 10px;
  line-height: 9px;
  padding-left: 8px;
  margin-left: 8px;
  border-left: 1px solid rgba(0, 0, 0, .1);
`;

export const DateLabel = ({ dayNumber, occasion, isRedDay }: any) => (
  <Wrapper isRedDay={isRedDay}>
    <DayNumber>{dayNumber}</DayNumber>
    {occasion && <Occasion>{occasion}</Occasion>}
  </Wrapper>
);
