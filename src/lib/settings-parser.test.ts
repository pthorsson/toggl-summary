import 'mocha';
import { expect } from 'chai';

import { parseSettings, stringifySettings } from '../lib/settings-parser';

describe('Parse settings module, parse settings string', () => {
  it('should have correct keys', () => {
    const settings = parseSettings('tt123,tw456');

    expect(settings.togglToken).to.equal('123');
    expect(settings.togglWorkspace).to.equal('456');
    expect(settings.googleSpreatsheet).to.equal(null);
    expect(Object.keys(settings).length).to.equal(3);
  });
});

describe('Parse settings module, stringify settings object', () => {
  it('should have correct keys', () => {
    const settings = stringifySettings({
      togglToken: '123',
      togglWorkspace: '456',
    });

    expect(settings).to.equal('tt123,tw456');
  });
});