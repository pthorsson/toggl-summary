import React from 'react';
import styled, { css } from 'styled-components';
import { COLOR_ORANGE } from 'config';

const Wrapper: any = styled.div`
  display: flex;
`;

const DayNumber: any = styled.div`
  position: relative;
  height: 18px;
  width: 30px;

  ${(props: any) => props.dayNumber && css`
    ::after {
      display: block;
      margin-top: -10px;
      margin-left: -10px;
      content: '${props.dayNumber}';
      font-size: 22px;
      width: 38px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      border-bottom-right-radius: 13px;
    }
  `}

  ${(props: any) => props.isToday && css`
    ::after {
      background-color: ${COLOR_ORANGE};
      color: white;
    }
  `}
`;

const Occasion: any = styled.div`
  font-size: 10px;
  line-height: 9px;
  margin-left: 5px;
  flex: 1 1 auto;
  text-align: right;
`;

export const DateLabel = ({ dayNumber, occasion, isToday }: any) => (
  <Wrapper>
    <DayNumber isToday={isToday} dayNumber={dayNumber} />
    {occasion && <Occasion>{occasion}</Occasion>}
  </Wrapper>
);
