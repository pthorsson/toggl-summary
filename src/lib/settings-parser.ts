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
 * Format: <short-key><value> [..., <short-key><value>]
 * 
 * Example: tt123456789,tw987654321
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
      const key = part.substr(0, 2);
      const val = part.substr(2);

      if (availableKeys[key])  {
        settings[availableKeys[key]] = val;
      } 
    });

  return {
    ...settingsModel,
    ...settings
  };
};

/**
 * Converts settings object to string.
 * 
 * @param {ISettings} settings Settings object.
 * 
 * @return {string} Stringified settings object.
 */
export const stringifySettings = (settings: any): string => {
  let settingsStrs: Array<string> = [];

  Object
    .keys(settings)
    .forEach((key: string) => {
      Object
        .keys(availableKeys)
        .forEach((shortKey: string) => {
          if (availableKeys[shortKey] === key) {
            settingsStrs.push(`${shortKey}${settings[key]}`);
          }
        });
    });

  return settingsStrs.join(',');
};
