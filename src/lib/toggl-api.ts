const baseUrl = 'https://toggl.com/reports/api/v2/details';

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
  private _token: string = null;
  private _workspace: string = null;
  private _email: string = null;

  constructor() {}

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
      let type = /(billable|sick)/.test(entry.tags[0])
        ? entry.tags[0]
        : 'regular';

      if (!days[date]) {
        days[date] = {
          projects: [],
        };
      }

      let project = days[date].projects.find(
        (p: any) => p.label === entry.project
      );
      let hasProject = !!project;

      project = project || {
        label: entry.project,
        hours: {
          sick: 0,
          billable: 0,
          regular: 0,
        },
      };

      project.hours[type] += entry.dur / 1000 / 60 / 60;

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
        hours.sick += p.hours.sick = roundWith(p.hours.sick, 0.25);
        hours.billable += p.hours.billable = roundWith(p.hours.billable, 0.25);
        hours.regular += p.hours.regular = roundWith(p.hours.regular, 0.25);
      });

      return {
        date,
        hours,
        projects: day.projects,
      };
    });

    return daysArr;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async authenticate({ togglEmail, togglToken, togglWorkspace }: any) {
    const date = new Date().toISOString().split('T')[0];

    let params = {
      user_agent: togglEmail,
      workspace_id: togglWorkspace,
      since: date,
      until: date,
      page: 1,
    };

    let settings = {
      method: 'GET',
      headers: {
        Authorization: `Basic ${btoa(`${togglToken}:api_token`)}`,
      },
    };

    const res = await fetch(buildUrl(baseUrl, params), settings);

    return res.status === 200;
  }

  public async loadDays(startDate: string, endDate: string): Promise<any> {
    let params = {
      user_agent: this._email,
      workspace_id: this._workspace,
      since: startDate,
      until: endDate,
    };

    let settings = {
      method: 'GET',
      headers: {
        Authorization: `Basic ${btoa(`${this._token}:api_token`)}`,
      },
    };

    let page = 1;
    let totalPages = 1;
    let entries = [];

    while (page <= totalPages) {
      const res = await fetch(buildUrl(baseUrl, { ...params, page }), settings);
      const { data, total_count, per_page } = await res.json();

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
