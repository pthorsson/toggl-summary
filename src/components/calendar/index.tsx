import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import chunk from 'lodash/chunk';

import { AppContext } from 'context';

const Table: any = styled.table`
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
  padding: 0;
  margin: 0;
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%
  min-width: 800px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Row: any = styled.tr`
  padding: 0;
`;

const TableHead: any = styled.thead`

`;

const HeadCell: any = styled.th`
  border-top: 1px solid grey;
  border-left: 1px solid grey;
  padding: 0;
  margin: 0;

  ${(props: any) => props.isWeek && css`
    width: 50px;
  `}
`;

const TableBody: any = styled.tbody`

`;

const Cell: any = styled.td`
  border-top: 1px solid grey;
  border-left: 1px solid grey;
  padding: 0;
  margin: 0;
`;

const Day: any = styled.div`
  background: #f5f5f5;
  padding: 10px;

  ${(props: any) => props.isWeekend && css`
    background: #e5e5e5;
  `}

  ${(props: any) => props.isRedDay && css`
    color: red;
  `}

  ${(props: any) => props.isToday && css`
    border: 2px solid rgba(0,0,0,.2);
    padding: 8px;
  `}

  ${(props: any) => props.isCurrentWeek && css`
    background-color: green;
  `}

  ${(props: any) => !props.isCurrentMonth && css`
    opacity: .3;
  `}
`;

const WeekDay: any = styled.div`
  background: #454545;
  color: white;
  padding: 5px 10px;
  text-align: left;
`;

const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const Calendar = () => {
  const { state, setMonth, nextMonth, previousMonth } = useContext(AppContext);
  const date = new Date();

  return (
    <>
      <div style={{maxWidth: '1200px', margin: '30px auto'}}>
        <button onClick={() => previousMonth()}>prev</button>
        <button onClick={() => nextMonth()}>next</button>
        <button onClick={() => setMonth(date.getFullYear(), date.getMonth() + 1)}>today</button>
        <span>{state.year} {state.month} - {state.monthName}</span>
      </div>

      <Table>
        <TableHead>
          <Row>
            <HeadCell isWeek={true}>v</HeadCell>
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
                {days[0].week}
              </Cell>
              {days.map((day: any, i: number) => (
                <Cell key={i}>
                  <Day
                    isCurrentMonth={day.isCurrentMonth}
                    isCurrentWeek={day.isCurrentWeek}
                    isWeekend={day.isWeekend}
                    isRedDay={day.isRedDay}
                    isToday={day.isToday}
                  >
                    {day.date[2]}
                  </Day>
                </Cell>
              ))}
            </Row>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
