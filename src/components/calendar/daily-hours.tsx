import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper: any = styled.div`
  font-size: 13px;
  margin-top: 10px;
  font-family: monospace;
`;

const Line: any = styled.div`
  display: flex;
  /* border-bottom: 1px solid rgba(0,0,0,.05); */
  padding: 2px 0;

  ${(props: any) => props.status === 'billable' && css`
    color: #3f9b6a;
  `}

  ${(props: any) => props.status === 'sick' && css`
    color: #c94141;
  `}

  ${(props: any) => props.status === 'regular' && css`
    color: #7475cc;
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
  color: #999999;
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
