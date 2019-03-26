interface ISettings {
  togglToken: string;
  togglWorkspace: string;
  googleSpreatsheet: string;
}

// Settings object schema
const settingsModel: ISettings = {
  togglToken: null,
  togglWorkspace: null,
  googleSpreatsheet: null,
};

// Available settings keys
const availableKeys: any = {
  tt: 'togglToken',
  tw: 'togglWorkspace',
  gs: 'googleSpreatsheet',
};

/**
 * Takes a string and converts it to a settings object.
 * 
 * Format: <short-key>:<value> [..., <short-key>:<value>]
 * 
 * Example: tt:123456789,tw:987654321
 * 
 * Available short keys:
 *  - tt = togglToken
 *  - tw = togglWorkspace
 *  - gs = googleSpreatsheet
 * 
 * @param {string} settingsStr Settings object in string format.
 * 
 * @return {ISettings} Parsed settings object.
 */
export const parseSettings = (settingsStr: string): ISettings => {
  const settings: any = {};

  settingsStr
    .split(',')
    .forEach(part => {
      const [key, val] = part.split(':');

      if (availableKeys[key])  {
        settings[availableKeys[key]] = val;
      } 
    });

  return {
    ...settingsModel,
    ...settings
  };
};
