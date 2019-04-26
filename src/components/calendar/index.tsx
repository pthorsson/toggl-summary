import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import chunk from 'lodash/chunk';

import { AppContext } from 'context';

import { DateLabel } from './date-label';
import { DailyHours } from './daily-hours';

const Table: any = styled.table`
  padding: 0;
  margin: 0;
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
`;

const Row: any = styled.tr`
  padding: 0;
`;

const TableHead: any = styled.thead`

`;

const HeadCell: any = styled.th`
  border: 2px solid white;
  padding: 0;
  margin: 0;
  text-transform: uppercase;
  font-size: 85%;
  letter-spacing: 1px;
  text-align: left;

  ${(props: any) => props.isWeek && css`
    width: 45px;
    text-align: center;
  `}
`;

const TableBody: any = styled.tbody`

`;

const Cell: any = styled.td`
  border: 2px solid white;
  padding: 0;
  margin: 0;
`;

const WeekDay: any = styled.div`
  background: #454545;
  color: white;
  padding: 5px 10px;
`;

const WeekNumber: any = styled.div`
  background: #979797;
  color: white;
  padding: 10px;
  height: 100px;
  text-align: center;

  ${(props: any) => props.isCurrentWeek && css`
    background: #6aa2ed;
  `}
`; 

const Day: any = styled.div`
  background: #f5f5f5;
  color: #999999;
  padding: 10px;
  height: 100px;
  position: relative;

  ${(props: any) => props.isCurrentWeek && css`
    &::after, &::before {
      content: '';
      position: absolute;
      width: calc(100% + 2px);
      left: -2px;
      border-top: 3px solid #6aa2ed;
    }

    &::before {
      bottom: 0;
    }

    &::after {
      top: 0;
    }
  `}

  ${(props: any) => props.isWorkFree && css`
    color: #777777;
    background: repeating-linear-gradient(
      -54.2deg,
      #e5e5e5,
      #e5e5e5 10px,
      #e9e9e9 10px,
      #e9e9e9 20px
    );
  `}

  ${(props: any) => props.isToday && css`
    font-weight: bold;
  `}

  ${(props: any) => props.isVacation && css`
    color: #7475cc;
    background: repeating-linear-gradient(
      -54.2deg,
      #dfedff,
      #dfedff 10px,
      #d6e7ff 10px,
      #d6e7ff 20px
    );
  `}

  ${(props: any) => props.isRedDay && css`
    color: #c94141;
    background: repeating-linear-gradient(
      -54.2deg,
      #ffe2e2,
      #ffe2e2 10px,
      #ffdbdb 10px,
      #ffdbdb 20px
    );
  `}

  ${(props: any) => !props.isCurrentMonth && css`
    opacity: .3;
  `}
`;

const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const Calendar = () => {
  const { state } = useContext(AppContext);

  console.log('---------------------------------');
  console.log('days', state.days);
  console.log('weekHours', state.weekHours);
  console.log('monthHours', state.monthHours);

  return (
    <Table>
      <TableHead>
        <Row>
          <HeadCell isWeek={true}>
            <WeekDay>v.</WeekDay>
          </HeadCell>
          {weekDays.map((weekDay: any, i: number) => (
            <HeadCell key={i}>
              <WeekDay>{weekDay}</WeekDay>
            </HeadCell>
          ))}
        </Row>
      </TableHead>
      <TableBody>
        {chunk(state.days, 7).map((days: any, i: number) => (
          <Row key={i} week={days[0].week}>
            <Cell isWeek={true}>
              <WeekNumber
                isCurrentWeek={days[0].isCurrentWeek}
              >
                {days[0].week}
              </WeekNumber>
            </Cell>
            {days.map((day: any, i: number) => (
              <Cell key={i}>
                <Day
                  isCurrentMonth={day.isCurrentMonth}
                  isCurrentWeek={day.isCurrentWeek}
                  isWorkFree={day.isWorkFree}
                  isRedDay={day.isRedDay}
                  isToday={day.isToday}
                  isVacation={day.isVacation}
                >
                  <DateLabel
                    dayNumber={day.dateArr[2]}
                    occasion={day.timeReport.hours.available === 4 ? '(Halvdag)' : day.occasion}
                  />
                  { day.isCurrentMonth && 
                    <DailyHours timeReport={day.timeReport} availableHours={day.availableHours} />
                  }
                </Day>
              </Cell>
            ))}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};
