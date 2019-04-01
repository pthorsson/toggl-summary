import React from 'react';

import { getMonth } from 'lib/get-month';

import weekendsApi from 'lib/weekends-api';
import googleSheetsApi from 'lib/google-sheets-api';
import togglApi from 'lib/toggl-api';

import { summarizeData } from 'lib/utils';

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
    };
  }

  componentDidMount() {
    const date = new Date();
    this.setMonth(date.getFullYear(), date.getMonth() + 1); 
  }

  public setMonth(year: number, month: number) {
    const monthData = getMonth(year, month);
    const startDate = monthData.days[0].dateStr;
    const endDate = monthData.days[41].dateStr;

    this.setState({
      year,
      month,
      monthName: monthData.date.format('MMMM'),
      days: monthData.days.slice(),
      isLoading: true
    });

    Promise.all([
      weekendsApi.loadDays(startDate, endDate),
      googleSheetsApi.loadDays(startDate, endDate),
      togglApi.loadDays(startDate, endDate)
    ]).then(data => {
      const [weekendData, googleData, toggleData] = data;

      summarizeData(monthData, {
        weekendData,
        googleData,
        toggleData
      });

      this.setState({
        days: monthData.days.slice(),
        isLoading: false
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