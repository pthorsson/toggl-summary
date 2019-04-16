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
  margin-left: 5px;
  flex: 1 1 auto;
  text-align: right;
`;

export const DateLabel = ({ dayNumber, occasion, isRedDay }: any) => (
  <Wrapper isRedDay={isRedDay}>
    <DayNumber>{dayNumber}</DayNumber>
    {occasion && <Occasion>{occasion}</Occasion>}
  </Wrapper>
);
