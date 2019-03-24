import React from 'react';

import { getMonth } from 'lib/get-month';

export const AppContext = React.createContext<IContext|null>(null);

interface IProps {}

export interface IState {
  year: number;
  month: number;
  monthName: string;
  days: Array<any>;
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

    const date = new Date();

    const monthData = getMonth(date.getFullYear(), date.getMonth() + 1);

    this.state = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      monthName: monthData.date.format('MMMM'),
      days: monthData.days
    };
  }

  public setMonth(year: number, month: number) {
    const monthData = getMonth(year, month);

    this.setState({
      year,
      month,
      monthName: monthData.date.format('MMMM'),
      days: monthData.days
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