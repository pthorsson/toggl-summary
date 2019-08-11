import React, { useContext } from 'react';
import styled, { css,  } from 'styled-components';
import { darken, lighten } from 'polished'
import chunk from 'lodash/chunk';

import {
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_ORANGE,
  COLOR_RED
} from 'config';

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

  td:first-child ~ td > div::after,
  td:first-child ~ td > div::before {
    content: '';
    position: absolute;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  ${(props: any) => props.hasHover !== false && css`
    :hover {
      cursor: pointer;

      td:first-child > div {
        background: ${lighten(.455, COLOR_GRAY)};
      }

      td:first-child ~ td > div::before {
        top: 0;
        border-top: 3px solid ${lighten(.455, COLOR_GRAY)};
        border-bottom: 3px solid ${lighten(.455, COLOR_GRAY)};
        width: calc(100% + 2px);
        left: -2px;
      }

      td:last-child > div::after {
        top: 0;
        right: 0;
        width: 100%;
        border-right: 3px solid ${lighten(.455, COLOR_GRAY)};
      }
    }
  `}

  ${(props: any) => props.selected && css`
    td:first-child > div {
      background: ${COLOR_BLUE} !important;
    }

    td:first-child ~ td > div::before {
      top: 0;
      border-top: 3px solid ${COLOR_BLUE} !important;;
      border-bottom: 3px solid ${COLOR_BLUE} !important;;
      width: calc(100% + 2px);
      left: -2px;
    }

    td:last-child > div::after {
      top: 0;
      right: 0;
      width: 100%;
      border-right: 3px solid ${COLOR_BLUE} !important;;
    }
  `}
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
  background: ${COLOR_GRAY};
  color: white;
  padding: 5px 10px;
`;

const WeekNumber: any = styled.div`
  background: ${lighten(.32, COLOR_GRAY)};
  color: white;
  padding: 10px;
  height: 100px;
  text-align: center;

  ${(props: any) => props.isCurrentWeek && css`
    background: ${COLOR_ORANGE};
  `}
`;

const Day: any = styled.div`
  position: relative;
`;

const DayContent: any = styled.div`
  background: ${lighten(.69, COLOR_GRAY)};
  color: ${lighten(.35, COLOR_GRAY)};
  padding: 10px;
  height: 100px;

  ${(props: any) => props.isWorkFree && css`
    color: ${lighten(.20, COLOR_GRAY)};
    background: repeating-linear-gradient(
      -54.2deg,
      ${lighten(.625, COLOR_GRAY)},
      ${lighten(.625, COLOR_GRAY)} 10px,
      ${lighten(.65, COLOR_GRAY)} 10px,
      ${lighten(.65, COLOR_GRAY)} 20px
    );
  `}

  ${(props: any) => props.isVacation && css`
    color: ${darken(.12, COLOR_BLUE)};
    background: repeating-linear-gradient(
      -54.2deg,
      ${lighten(.27, COLOR_BLUE)},
      ${lighten(.27, COLOR_BLUE)} 10px,
      ${lighten(.255, COLOR_BLUE)} 10px,
      ${lighten(.255, COLOR_BLUE)} 20px
    );
  `}

  ${(props: any) => props.isRedDay && css`
    color: ${darken(.23, COLOR_RED)};
    background: repeating-linear-gradient(
      -54.2deg,
      ${lighten(.27, COLOR_RED)},
      ${lighten(.27, COLOR_RED)} 10px,
      ${lighten(.255, COLOR_RED)} 10px,
      ${lighten(.255, COLOR_RED)} 20px
    );
  `}

  ${(props: any) => !props.isCurrentMonth && css`
    opacity: .3;
  `}
`;

const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const Calendar = () => {
  const { state, actions } = useContext(AppContext);

  if (!state.initiated) {
    const date = new Date();
    actions.setMonth(date.getFullYear(), date.getMonth() + 1); 
  }

  const getDayLabel = (day: any) => {
    let label;

    if (day.isVacation) {
      return `Vacation ${day.occasion || ''}`;
    } else {
      return `${day.occasion || ''} ${day.timeReport.hours.available === 4 ? '(Halvdag)' : ''}`;
    }
  }

  return (
    <Table>
      <TableHead>
        <Row hasHover={false}>
          <HeadCell isWeek={true}>
            <WeekDay>v.</WeekDay>
          </HeadCell>
          {weekDays.map((weekDay: any, i: number) => (
            <HeadCell key={weekDay}>
              <WeekDay>{weekDay}</WeekDay>
            </HeadCell>
          ))}
        </Row>
      </TableHead>
      <TableBody>
        {chunk(state.days, 7).map((days: any, i: number) => (
          <Row
            key={days[0].week}
            week={days[0].week}
            selected={days[0].dateArr[0] === state.selectedWeek[0] && days[0].week === state.selectedWeek[1]}
            onClick={() => actions.selectWeek(days[0].dateArr[0], days[0].week)}
          >
            <Cell isWeek={true}>
              <WeekNumber
                isCurrentWeek={days[0].isCurrentWeek}
              >
                {days[0].week}
              </WeekNumber>
            </Cell>
            {days.map((day: any, i: number) => (
              <Cell key={day.date}>
                <Day>
                  <DayContent
                    isCurrentMonth={day.isCurrentMonth}
                    isCurrentWeek={day.isCurrentWeek}
                    isWorkFree={day.isWorkFree}
                    isRedDay={day.isRedDay}
                    isToday={day.isToday}
                    isVacation={day.isVacation}
                  >
                    <DateLabel
                      isToday={day.isToday}
                      dayNumber={day.dateArr[2]}
                      occasion={getDayLabel(day).trim()}
                    />
                    { day.isCurrentMonth && 
                      <DailyHours timeReport={day.timeReport} availableHours={day.availableHours} />
                    }
                  </DayContent>
                </Day>
              </Cell>
            ))}
          </Row>
        ))}
      </TableBody>
    </Table>
  );
};
