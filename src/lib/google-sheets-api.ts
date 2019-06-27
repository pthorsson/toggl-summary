const baseURL = (id: string): string =>
  `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`;

interface IGSDay {
  date: string;
  type: string;
  label: string;
}

/**
 * Fetches data from a public Google Sheet.
 */
class GoogleSheetsApi {
  private days: Array<IGSDay> = null;
  private id: string = null;

  constructor() {}

  set sheetId(id: string) {
    this.id = id;
  }

  private sanitizeData(data: any): Array<IGSDay> {
    return data.map((d: any) => ({
      date: d.gsx$date.$t,
      type: d.gsx$type.$t,
      label: d.gsx$label.$t,
    }));
  }

  public async loadDays(startDate: string, endDate: string): Promise<any> {
    if (this.days === null) {
      let res = await fetch(baseURL(this.id));
      let data = await res.json();

      data = data.feed.entry;

      this.days = this.sanitizeData(data);

      this.days.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      });
    }

    return this.days.filter(d => d.date >= startDate && d.date <= endDate);
  }

  public async checkIfAvailable(id: string) {
    let res = await fetch(baseURL(id));
    let data = await res.json();

    return data;
  }
}

export default new GoogleSheetsApi();
