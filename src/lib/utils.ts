import moment from 'moment';

/**
 * Builds an url with params.
 *
 * @param {string} url
 * @param {any} params
 *
 * @return {string} URL
 */
export const buildUrl = (url: string, params: any) =>
  url +
  Object.keys(params)
    .map(
      (key: string, i: number) =>
        `${!i ? '?' : '&'}${key}=${encodeURIComponent(params[key])}`
    )
    .join('');

/**
 * Rounds given number by given point.
 *
 * @param {number} value
 * @param {number} point
 *
 * @return {number} Rounded number
 */
export const roundWith = (value: number, point: number) =>
  Math.round(value * (1 / point)) / (1 / point);

const HOURS_TEMPLATE = {
  sick: 0,
  billable: 0,
  regular: 0,
  available: 0,
};

/**
 * Applies data given from the APIs to month days.
 */
export const applyData = (
  month: any,
  { togglData, weekendData, googleData }: any
) => {
  month.days.forEach((day: any, i: number) => {
    let tomorrow = weekendData[i + 1] || {};

    if (weekendData) {
      day.isRedDay = weekendData[i].redDay;
      day.isWorkFree = weekendData[i].workFree;
      day.occasion = weekendData[i].occasion;
    }

    if (googleData) {
      let gsDay = googleData.find((d: any) => d.date === day.date);

      if (gsDay) {
        day.isVacation = gsDay.type === 'vacation';
      }
    }

    day.timeReport = {
      hours: { ...HOURS_TEMPLATE },
      projects: [],
    };

    if (day.dayOfWeek > 5 || day.isWorkFree) {
      day.timeReport.hours.available = 0;
    } else if (day.dayOfWeek < 6 && tomorrow.redDay) {
      day.timeReport.hours.available = 4;
    } else {
      day.timeReport.hours.available = 8;
    }

    if (togglData) {
      let tgDay = togglData.find((d: any) => d.date === day.date);

      if (tgDay) {
        const { hours, projects } = tgDay;

        day.timeReport.hours.sick = hours.sick;
        day.timeReport.hours.regular = hours.regular;
        day.timeReport.hours.billable = hours.billable;
        day.timeReport.projects = projects;
      }
    }
  });
};

export const summerizeHours = (
  days: any,
  startDate: string,
  endDate: string
) => {
  const todayDate = moment()
    .add(1, 'day')
    .format('YYYY-MM-DD');

  let weekHours: any = {};
  let monthHours = { ...HOURS_TEMPLATE, past: 0 };

  days.forEach((day: any) => {
    if (day.date < startDate || day.date > endDate) return;

    weekHours[day.week] = weekHours[day.week] || { ...HOURS_TEMPLATE };

    weekHours[day.week].available += day.timeReport.hours.available;
    weekHours[day.week].sick += day.timeReport.hours.sick;
    weekHours[day.week].billable += day.timeReport.hours.billable;
    weekHours[day.week].regular += day.timeReport.hours.regular;

    if (day.date < todayDate) {
      monthHours.past +=
        day.timeReport.hours.available - day.timeReport.hours.sick;
    }
  });

  Object.keys(weekHours).forEach(week => {
    monthHours.available += weekHours[week].available;
    monthHours.sick += weekHours[week].sick;
    monthHours.billable += weekHours[week].billable;
    monthHours.regular += weekHours[week].regular;
  });

  return { weekHours, monthHours };
};

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (email: string): boolean =>
  EMAIL_PATTERN.test(email);
