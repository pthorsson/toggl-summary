import React from 'react';

import { getMonth } from 'lib/get-month';

import weekendsApi from 'lib/weekends-api';
import googleSheetsApi from 'lib/google-sheets-api';
import togglApi from 'lib/toggl-api';

import { applyData, summerizeHours } from 'lib/utils';
import { parseSettings } from 'lib/settings-parser';

export const AppContext = React.createContext<IContext | null>(null);

interface IProps {}

export interface IState {
  initiated: boolean;
  authenticated: boolean;
  hash: string;
  config: string;
  email: string;
  year: number;
  month: number;
  monthName: string;
  days: Array<any>;
  selectedWeek: Array<number>;
  weekHours: {
    billable?: number;
    regular?: number;
    sick?: number;
    available?: number;
  };
  monthHours: {
    billable?: number;
    regular?: number;
    sick?: number;
    available?: number;
    past?: number;
  };
  isLoading: boolean;
}

export interface IContext {
  state: IState;
  actions: {
    isAuthenticated: (hash: string) => boolean;
    setMonth: (year: number, month: number) => void;
    nextMonth: () => void;
    previousMonth: () => void;
    selectWeek: (year: number, week: number) => void;
    setConfig: (hash: string, config: string, email: string) => void;
    clearConfig: () => void;
  };
}

export default class AppProvider extends React.Component<IProps, IState> {
  constructor(props?: IProps, state?: IState) {
    super(props, state);

    this.state = {
      initiated: false,
      authenticated: false,
      hash: sessionStorage.hash || null,
      config: sessionStorage.config || null,
      email: sessionStorage.email || null,
      year: null,
      month: null,
      monthName: null,
      days: [],
      weekHours: {},
      monthHours: {},
      isLoading: false,
      selectedWeek: [0, 0],
    };
  }

  public setConfig(hash: string, config: string, email: string) {
    sessionStorage.setItem('hash', hash);
    sessionStorage.setItem('config', config);
    sessionStorage.setItem('email', email);

    const settings = parseSettings(config);

    togglApi.email = email;
    togglApi.token = settings.togglToken;
    togglApi.workspace = settings.togglWorkspace;
    googleSheetsApi.sheetId = settings.googleSpreatsheet || null;

    this.setState({ hash, config, email });
  }

  public clearConfig() {
    sessionStorage.removeItem('config');
    sessionStorage.removeItem('hash');
    sessionStorage.removeItem('email');

    togglApi.email = null;
    togglApi.token = null;
    togglApi.workspace = null;
    googleSheetsApi.sheetId = null;

    this.setState({ config: null, hash: null, email: null });
  }

  public isAuthenticated(hash: string): boolean {
    if (this.state.config && this.state.email && this.state.hash === hash) {
      return true;
    }

    return false;
  }

  public setMonth(year: number, month: number) {
    const monthData = getMonth(year, month);

    this.setState({
      year,
      month,
      monthName: monthData.date.format('MMMM'),
      isLoading: true,
      initiated: true,
    });

    Promise.all([
      weekendsApi.loadDays(
        monthData.monthSpanPadded[0],
        monthData.monthSpanPadded[1]
      ),
      googleSheetsApi.loadDays(
        monthData.monthSpanPadded[0],
        monthData.monthSpanPadded[1]
      ),
      togglApi.loadDays(monthData.monthSpan[0], monthData.monthSpan[1]),
    ]).then(data => {
      const [weekendData, googleData, togglData] = data;

      applyData(monthData, {
        weekendData,
        googleData,
        togglData,
      });

      let { weekHours, monthHours } = summerizeHours(
        monthData.days,
        monthData.monthSpan[0],
        monthData.monthSpan[1]
      );

      this.setState({
        days: monthData.days.slice(),
        weekHours,
        monthHours,
        isLoading: false,
      });

      console.groupCollapsed(`Monthly data: ${month}/${year}`);
      console.log('days', this.state.days);
      console.log('weekHours', this.state.weekHours);
      console.log('monthHours', this.state.monthHours);
      console.groupEnd();
    });
  }

  public nextMonth() {
    const year =
      this.state.month === 12 ? this.state.year + 1 : this.state.year;
    const month = this.state.month === 12 ? 1 : this.state.month + 1;
    this.setMonth(year, month);
  }

  public previousMonth() {
    const year = this.state.month === 1 ? this.state.year - 1 : this.state.year;
    const month = this.state.month === 1 ? 12 : this.state.month - 1;
    this.setMonth(year, month);
  }

  public selectWeek(year: number, week: number) {
    this.setState({ selectedWeek: [year, week] });
  }

  render() {
    const context: IContext = {
      state: this.state,
      actions: {
        isAuthenticated: this.isAuthenticated.bind(this),
        setMonth: this.setMonth.bind(this),
        nextMonth: this.nextMonth.bind(this),
        previousMonth: this.previousMonth.bind(this),
        selectWeek: this.selectWeek.bind(this),
        setConfig: this.setConfig.bind(this),
        clearConfig: this.clearConfig.bind(this),
      },
    };

    return (
      <AppContext.Provider value={context}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
