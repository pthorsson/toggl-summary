import range from 'lodash/range';

const BASE_URL = 'https://api.dryg.net/dagar/v2.1/';

interface IDay {
  date: string;
  workFree: boolean;
  redDay: boolean;
  occasion: string;
  flagDay: string;
  namesOfTheDay: Array<string>;
}

interface IWeekendData {
  year: number;
  startDate: string;
  endDate: string;
  days: Array<IDay>;
}

class WeekendsApi {
  private years: Array<IWeekendData> = [];
  private yearsLoaded: Array<number> = [];
  private days: Array<IDay> = [];

  constructor() {

  }

  private sanitizeData(data: any): Array<IDay> {
    let days: Array<IDay> = [];

    data.dagar.forEach((day: any) => {
      days.push(Object.freeze({
        date: day['datum'],
        workFree: day['arbetsfri dag'] === 'Ja',
        redDay: day['röd dag'] === 'Ja',
        occasion: day['helgdag'] || null,
        flagDay: day['flaggdag'].length ? day['flaggdag'] : null,
        namesOfTheDay: day['namnsdag']
      }));
    });

    return days;
  }

  public async loadDays(startDate: string, endDate: string): Promise<any> {
    let yearRange = range(parseInt(startDate.split('-')[0]), parseInt(endDate.split('-')[0]) + 1);

    yearRange = yearRange.filter(y => this.yearsLoaded.indexOf(y) === -1);

    let i = 0;
    while(i < yearRange.length) {
      let res = await fetch(BASE_URL + yearRange[i]);
      let data = await res.json();

      data = this.sanitizeData(data);

      this.days.push(...data);
      this.yearsLoaded.push(yearRange[i]);

      i++;
    }

    this.days.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });

    let startDateIndex = this.days.map(d => d.date).indexOf(startDate);

    return this.days.slice(startDateIndex,  startDateIndex + 42);
  }
}

export default new WeekendsApi();
