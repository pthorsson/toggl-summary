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
 * Summerizes all data given from the APIs.
 */
export const summarizeData = (month: any, { togglData, weekendData, googleData }: any) => {
  month.days.forEach((day: any, i: number) => {
    day.isRedDay = weekendData[i].redDay;
    day.isWorkFree = weekendData[i].workFree;
    day.timeReport = null;

    let gsDay = googleData.find((d: any) => d.date === day.dateStr)

    if (gsDay) {
      day.isVacation = gsDay.type === 'vacation';
    }

    let tgDay = togglData.find((d: any) => d.date === day.dateStr);

    if (tgDay) {
      const { billable, sick, regular, projects } = tgDay;

      day.timeReport = {
        billable,
        sick,
        regular,
        projects,
      };
    }
  });
};