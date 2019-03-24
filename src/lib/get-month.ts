import moment from 'moment';

const currentDate = moment();

// TODO: Optimize!

export const getMonth = (year: number, month: number) => {

  // All days to display will be pushed into this array
  const days = [];

  const dates = {
    current: {
      year,
      month
    },
    previous: {
      year: month === 1 ? year - 1 : year,
      month: month === 1 ? 12 : month - 1
    },
    next: {
      year: month === 12 ? year + 1 : year,
      month: month === 12 ? 1 : month + 1
    }
  };

  const currentMonth = moment([dates.current.year, dates.current.month - 1]);
  const previousMonth = moment([dates.previous.year, dates.previous.month - 1]);
  const nextMonth = moment([dates.next.year, dates.next.month - 1]);

  const dataCurrent: any = {
    year: dates.current.year,
    month: dates.current.month,
    firstDayOfWeek: currentMonth.isoWeekday(),
    day: currentMonth.day(),
    daysInMonth: currentMonth.daysInMonth(),
    days: []
  };

  const dataPrev: any = {
    year: dates.previous.year,
    month: dates.previous.month,
    daysInMonth: previousMonth.daysInMonth()
  };

  const dataNext: any = {
    year: dates.next.year,
    month: dates.next.month,
    daysInMonth: nextMonth.daysInMonth()
  };

  // Pad month with days from previous and next months
  dataCurrent.paddingLeft = dataCurrent.firstDayOfWeek - 1;
  dataCurrent.paddingRight = 42 - (dataCurrent.paddingLeft + dataCurrent.daysInMonth);

  // Adjust padding (only for feburari in same cases)
  if (dataCurrent.paddingRight >= 14) {
    dataCurrent.paddingLeft = 7;
    dataCurrent.paddingRight = dataCurrent.paddingRight - 7;
  }

  // Add last visible days of previous month
  for (let i = dataCurrent.paddingLeft; i > 0; i--) {
    let day: any = {
      date: [dataPrev.year, dataPrev.month, dataPrev.daysInMonth - i + 1],
      isCurrentMonth: false,
      isToday: false
    };

    day.dateStr = `${day.date[0]}-${('0' + day.date[1]).slice(-2)}-${('0' + day.date[2]).slice(-2)}`;

    days.push(day);
  }

  // Add all days of current month
  for (let i = 0; i < dataCurrent.daysInMonth; i++) {
    let day: any = {
      date: [dataCurrent.year, dataCurrent.month, i + 1],
      isCurrentMonth: true
    };

    day.isToday = day.date.join('-') === currentDate.format('YYYY-M-D');

    day.dateStr = `${day.date[0]}-${('0' + day.date[1]).slice(-2)}-${('0' + day.date[2]).slice(-2)}`;

    days.push(day);
  }

  // Add first visible days of next month
  for (let i = 0; i < dataCurrent.paddingRight; i++) {
    let day: any = {
      date: [dataNext.year, dataNext.month, i + 1],
      isCurrentMonth: false,
      isToday: false
    };

    day.dateStr = `${day.date[0]}-${('0' + day.date[1]).slice(-2)}-${('0' + day.date[2]).slice(-2)}`;

    days.push(day);
  }


  // Apply additional data to days
  // (() => {
  //   let week: any;

  //   days.forEach((day: any, i: number) => {
  //     let d = i + 1;
  //     day.isWeekend = d % 7 === 0 || (d + 1) % 7 === 0;
  //     day.isRedDay = d % 7 === 0;
  
  //     if (i % 7 === 0) {
  //       week = moment([day.date[0], day.date[1] - 1, day.date[2]]);
  //     }
  
  //     day.week = week.isoWeek();
  //     day.isCurrentWeek = week.year() === currentDate.year() && week.isoWeek() === currentDate.isoWeek();
  //   });
  // })();
  

  return {
    days,
    date: currentMonth
  };
};
