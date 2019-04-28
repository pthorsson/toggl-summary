import React from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished'
import { COLOR_GREEN, COLOR_BLUE, COLOR_RED, COLOR_GRAY } from 'config';

const Wrapper: any = styled.div`
  font-size: 13px;
  margin-top: 10px;
  font-family: monospace;
`;

const Line: any = styled.div`
  display: flex;
  padding: 2px 0;

  ${(props: any) => props.status === 'billable' && css`
    color: ${COLOR_GREEN};
  `}

  ${(props: any) => props.status === 'sick' && css`
    color: ${COLOR_RED};
  `}

  ${(props: any) => props.status === 'regular' && css`
    color: ${COLOR_BLUE};
  `}

  &:last-child {
    border: 0;  
  }
`;

const Hours: any = styled.div`
  font-weight: bold;

  &::after {
    content: 'h';
    opacity: .5;
  }
`;

const Label: any = styled.div`
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  color: ${lighten(.36, COLOR_GRAY)};
  padding-left: 5px;
`;

export const DailyHours = ({ timeReport }: any) => (
  <Wrapper>
    { timeReport.hours.billable > 0 &&
      <Line status="billable">
        <Hours>{timeReport.hours.billable.toFixed(2)}</Hours>
        <Label>billable</Label>
      </Line>
    }
    { timeReport.hours.regular > 0 &&
      <Line status="regular">
        <Hours>{timeReport.hours.regular.toFixed(2)}</Hours>
        <Label>regular</Label>
      </Line>
    }
    { timeReport.hours.sick > 0 &&
      <Line status="sick">
        <Hours>{timeReport.hours.sick.toFixed(2)}</Hours>
        <Label>sick</Label>
      </Line>
    }
  </Wrapper>
);
