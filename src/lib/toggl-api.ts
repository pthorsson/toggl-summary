const baseUrl =  'https://toggl.com/reports/api/v2/details';

import { buildUrl, roundWith } from 'lib/utils';

interface ITogglTimeReports {
  type: string;
  duration: string;
  project: string;
}

interface ITogglDay {
  date: string;
  type: string;
  label: string;
  timeReport: Array<ITogglTimeReports>;
}

class TogglApi {
  private _token: string;
  private _workspace: string;
  private _email: string;

  constructor() {

  }

  set token(token: string) {
    this._token = token;
  }

  set workspace(workspace: string) {
    this._workspace = workspace;
  }

  set email(email: string) {
    this._email = email;
  }

  private sanitizeData(entries: any): any {
    let days: any = {};

    // Parse toggl data
    entries.forEach((entry: any) => {
      if (entry.project === null) return;

      let date = entry.start.match(/\d{4}-\d{2}-\d{2}/);
      let type = /(billable|sick)/.test(entry.tags[0]) ? entry.tags[0] : 'regular';

      if (!days[date]) {
        days[date] = {
          projects: []
        }
      }

      let project = days[date].projects.find((p: any) => p.label === entry.project);
      let hasProject = !!project;

      project = project || {
        label: entry.project,
        sick: 0,
        billable: 0,
        regular: 0,
      };

      project[type] += entry.dur / 1000 / 60 / 60;

      if (!hasProject) {
        days[date].projects.push(project);
      }
    });

    // Restructure array and round values
    let daysArr = Object.keys(days).map(date => {
      let day = days[date];
      let hours = {
        sick: 0,
        billable: 0,
        regular: 0,
      };

      day.projects.forEach((p: any) => {
        p.sick = hours.sick += roundWith(p.sick, .25);
        p.billable = hours.billable += roundWith(p.billable, .25);
        p.regular = hours.regular += roundWith(p.regular, .25);
      });

      return {
        date,
        ...hours,
        projects: day.projects
      }
    });

    return daysArr;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async loadDays(startDate: string, endDate: string): Promise<any> {
    let params = {
      user_agent: this._email,
      workspace_id: this._workspace,
      since: startDate,
      until: endDate
    };

    let settings = {
      method: 'GET',
      headers:{
        'Authorization': `Basic ${btoa(`${this._token}:api_token`)}`
      }
    };

    let page = 1;
    let totalPages = 1;
    let entries = [];

    while(page <= totalPages) {
      console.log(`Fetching Toggl page ${page}`);

      let res = await fetch(buildUrl(baseUrl, { ...params, page }), settings);
      let { data, total_count, per_page } = await res.json();

      await this.delay(500);

      entries.push(...data);

      if (page === 1) {
        totalPages = Math.ceil(total_count / per_page);
      }

      page++;
    }

    let days = this.sanitizeData(entries);

    return days;
  }

}

export default new TogglApi();
