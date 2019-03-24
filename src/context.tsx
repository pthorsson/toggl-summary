import React from 'react';

import { getMonth } from 'lib/get-month';
import weekendsApi from 'lib/weekends-api';

export const AppContext = React.createContext<IContext|null>(null);

interface IProps {}

export interface IState {
  year: number;
  month: number;
  monthName: string;
  days: Array<any>;
  weekendData: Array<any>;
  togglData: Array<any>;
  isLoading: boolean;
  weekendDataLoading: boolean;
  togglDataLoading: boolean;
}

export interface IContext {
  state: IState;
  setMonth: (year: number, month: number) => void;
  nextMonth: () => void;
  previousMonth: () => void;
}

export default class AppProvider extends React.Component<IProps, IState> {
  constructor(props?: IProps, state?: IState) {
    super(props, state);

    this.state = {
      year: null,
      month: null,
      monthName: null,
      days: [],
      weekendData: [],
      togglData: [],
      isLoading: false,
      weekendDataLoading: false,
      togglDataLoading: false
    };
  }

  componentDidMount() {
    const date = new Date();
    this.setMonth(date.getFullYear(), date.getMonth() + 1); 
  }

  public setMonth(year: number, month: number) {
    const monthData = getMonth(year, month);
    let weekendData;

    this.setState({
      year,
      month,
      monthName: monthData.date.format('MMMM'),
      days: monthData.days,
      weekendDataLoading: true,
      isLoading: true
    });

    weekendsApi.loadDays(monthData.days[0].dateStr, monthData.days[41].dateStr)
      .then(data => {
        const monthData = getMonth(year, month);

        monthData.days.forEach((day, i) => {
          day.isRedDay = data[i].redDay;
          day.isWorkFree = data[i].workFree;
          day.week = data[i].week;
        });

        this.setState({
          days: monthData.days,
          isLoading: false,
          weekendDataLoading: false,
        });
      });

  }

  public nextMonth() {
    const year = this.state.month === 12 ? this.state.year + 1 : this.state.year;
    const month = this.state.month === 12 ? 1 : this.state.month + 1;
    this.setMonth(year, month);
  }

  public previousMonth() {
    const year = this.state.month === 1 ? this.state.year - 1 : this.state.year;
    const month = this.state.month === 1 ? 12 : this.state.month - 1;
    this.setMonth(year, month);
  }

  render() {
    const context: IContext = {
      state: this.state,
      setMonth: this.setMonth.bind(this),
      nextMonth: this.nextMonth.bind(this),
      previousMonth: this.previousMonth.bind(this)
    };

    return (
      <AppContext.Provider value={context}>
        { this.props.children }
      </AppContext.Provider>
    );
  }
}