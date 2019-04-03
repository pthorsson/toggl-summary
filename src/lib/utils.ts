/**
 * Builds an url with params.
 * 
 * @param {string} url
 * @param {any} params
 * 
 * @return {string} URL 
 */
export const buildUrl = (url: string, params: any) => url + Object.keys(params)
  .map((key: string, i: number) => 
    `${!i ? '?' : '&'}${key}=${encodeURIComponent(params[key])}`)
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


/**
 * Applies data given from the APIs to month days.
 */
export const applyData = (month: any, { togglData, weekendData, googleData }: any) => {
  month.days.forEach((day: any, i: number) => {
    if (weekendData) {
      day.isRedDay = weekendData[i].redDay;
      day.isWorkFree = weekendData[i].workFree;
    }

    if (googleData) {
      let gsDay = googleData.find((d: any) => d.date === day.date)

      if (gsDay) {
        day.isVacation = gsDay.type === 'vacation';
      }
    }

    if (togglData) {
      day.timeReport = null;

      let tgDay = togglData.find((d: any) => d.date === day.date);

      if (tgDay) {
        const { hours, projects } = tgDay;
  
        day.timeReport = {
          hours,
          projects,
        };
      }
    }
  });
};

export const summerizeHours = (days: any, startDate: string, endDate: string) => {
  let template = {
    sick: 0,
    billable: 0,
    regular: 0,
    available: 0
  };

  let weekHours: any = {};
  let monthHours = { ...template };

  days.forEach((day: any) => {
    if (day.date < startDate || day.date > endDate) return;

    weekHours[day.week] = weekHours[day.week] || { ...template };

    if (!day.isWorkFree) {
      weekHours[day.week].available += 8;
    }

    if (day.timeReport) {
      weekHours[day.week].sick += day.timeReport.hours.sick;
      weekHours[day.week].billable += day.timeReport.hours.billable;
      weekHours[day.week].regular += day.timeReport.hours.regular;
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